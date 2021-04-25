import commonjs from "@rollup/plugin-commonjs"
import json from "@rollup/plugin-json"
import progress from "rollup-plugin-progress"
import resolve from "@rollup/plugin-node-resolve"
import {terser} from "rollup-plugin-terser"
import typescript from "@rollup/plugin-typescript"

/**
 * @type {import("rollup").RollupOptions}
 */
const config = {
    input: "src/index.ts",
    output: {
        file: "./dist/index.js",
        format: "cjs",
        inlineDynamicImports: true,
        sourcemap: process.env.NODE_ENV === "dev" ? "inline" : true,
    },
    plugins: [
        resolve(),
        typescript(),
        commonjs(),
        progress(),
        json({
            indent: "  ",
            namedExports: false,
        }),
        process.env.NODE_ENV === "dev"
            ? undefined
            : terser({
                  format: {
                      comments: /copyright|license/giu,
                  },
              }),
    ],
}

export default config
