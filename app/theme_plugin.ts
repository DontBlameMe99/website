import plugin from "tailwindcss/plugin";
import { themeTokenBlocks } from "./lib/theme_catalog";

export default plugin(({ addBase }) => {
	for (const block of themeTokenBlocks()) {
		addBase({ [block.selector]: block.declarations });
	}
});
