{
  description = "TypeScript development environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    nixpkgs-unstable.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    flake-utils.url = "github:numtide/flake-utils";

    git-hooks = {
      url = "github:cachix/git-hooks.nix";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = {
    nixpkgs,
    nixpkgs-unstable,
    flake-utils,
    git-hooks,
    ...
  }:
    flake-utils.lib.eachDefaultSystem (
      system: let
        pkgs = import nixpkgs {
          inherit system;
        };

        browserPkgs = import nixpkgs-unstable {
          inherit system;
        };

        nodejs = pkgs.nodejs;
        inherit (pkgs) bun;

        src = ./.;

        # The locked nixpkgs has no Bun dependency builder. Fetch an integrity-
        # checked cache once; checks below install from it with networking disabled.
        # Include every platform so the fixed-output hash is shared across systems.
        bunDeps = pkgs.stdenvNoCC.mkDerivation {
          name = "dbm-bun-deps";
          src = pkgs.lib.fileset.toSource {
            root = ./.;
            fileset = pkgs.lib.fileset.unions [./package.json ./bun.lock];
          };
          nativeBuildInputs = [bun pkgs.cacert];
          dontConfigure = true;
          buildPhase = ''
            export HOME=$TMPDIR
            bun install --frozen-lockfile --ignore-scripts --no-progress \
              --os '*' --cpu '*' --cache-dir "$out"
            # Bun's cache index uses absolute symlinks; make it relocatable and
            # remove store references before hashing the fixed-output cache.
            while IFS= read -r -d $'\0' link; do
              target=$(readlink "$link")
              case "$target" in
                "$out"/*) rm "$link"; ln -sr "$target" "$link" ;;
              esac
            done < <(find "$out" -type l -print0)
          '';
          dontInstall = true;
          dontFixup = true;
          outputHashMode = "recursive";
          outputHashAlgo = "sha256";
          outputHash = "sha256-nvSnPukJTDbXQhss0QUS57Q8RVtrbvucu55VqzNq3/c=";
        };

        installDeps = ''
          export HOME=$TMPDIR
          export BUN_INSTALL_CACHE_DIR=$TMPDIR/bun-cache
          cp -R ${bunDeps} "$BUN_INSTALL_CACHE_DIR"
          chmod -R u+w "$BUN_INSTALL_CACHE_DIR"
          bun install --offline --frozen-lockfile --ignore-scripts --no-progress
          patchShebangs node_modules
        '';

        # Never build in the immutable source store path or use ambient modules.
        mkJsCheck = name: command:
          pkgs.runCommand name {
            nativeBuildInputs = [nodejs bun];
          } ''
            cp -R ${src} source
            chmod -R u+w source
            cd source
            ${installDeps}
            ${command}
            touch $out
          '';

        mkHook = name: entry: {
          enable = true;
          inherit name entry;
          language = "system";
          pass_filenames = false;
        };

        hooks = git-hooks.lib.${system}.run {
          src = ./.;

          hooks = {
            alejandra.enable = true;

            biome-format =
              mkHook
              "biome format"
              "${pkgs.biome}/bin/biome format --write .";

            biome-lint =
              mkHook
              "biome lint"
              "${pkgs.biome}/bin/biome lint .";

            typecheck =
              mkHook
              "tsc"
              "${bun}/bin/bun run typecheck";

            test =
              mkHook
              "bun test"
              "${bun}/bin/bun test";
          };
        };
      in {
        formatter = pkgs.alejandra;

        checks = {
          # Provision the same locked dependencies for sandboxed hooks.
          pre-commit = hooks.overrideAttrs (old: {
            nativeBuildInputs = (old.nativeBuildInputs or []) ++ [nodejs bun];
            postPatch = (old.postPatch or "") + installDeps;
          });

          lint =
            pkgs.runCommand "biome-lint" {
              buildInputs = [pkgs.biome];
            } ''
              cd ${src}
              biome lint .
              touch $out
            '';

          fmt =
            pkgs.runCommand "biome-format" {
              buildInputs = [pkgs.biome];
            } ''
              cd ${src}
              biome format .
              touch $out
            '';

          typecheck = mkJsCheck "tsc-check" ''
            ./node_modules/.bin/react-router typegen
            ./node_modules/.bin/tsc --noEmit
          '';
          test = mkJsCheck "bun-test" ''
            bun test
          '';
        };

        devShells.default = pkgs.mkShell {
          packages = with pkgs;
            [
              nodejs
              bun
              wrangler
              typescript
              biome
              pkg-config
              chromium
              browserPkgs.agent-browser
            ]
            ++ hooks.enabledPackages;

          NODE_ENV = "development";

          shellHook = ''
            ${hooks.shellHook}

            if [ -f .env ]; then
              set -a
              source .env
              set +a
            fi
          '';
        };
      }
    );
}
