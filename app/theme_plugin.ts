import plugin from "tailwindcss/plugin";
import { themeTokenBlocks } from "./lib/themes";

export default plugin(({ addBase }) => {
	for (const block of themeTokenBlocks()) {
		addBase({ [block.selector]: block.declarations });
	}
});
