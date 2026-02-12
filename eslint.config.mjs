import {defineConfig, globalIgnores} from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import checkFile from "eslint-plugin-check-file";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

const eslintConfig = defineConfig([
    ...nextVitals,
    ...nextTs,
    {
        plugins: {
            "check-file": checkFile,
            "@typescript-eslint": tsPlugin,
        },
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module",
            },
        },
        rules: {
            // 1. File naming conventions (kebab-case)
            "check-file/filename-naming-convention": [
                "error",
                {
                    "**/*.{js,ts,tsx,css}": "KEBAB_CASE",
                },
                {
                    "ignoreMiddleExtensions": true,
                },
            ],
            "check-file/folder-naming-convention": [
                "error",
                {
                    "src/**/": "NEXT_JS_APP_ROUTER_CASE",
                },
            ],

            // 2. JS/TS Variable, Function, and Constant naming
            "@typescript-eslint/naming-convention": [
                "error",
                {
                    "selector": "variable",
                    "format": ["camelCase", "UPPER_CASE", "PascalCase"],
                },
                {
                    "selector": "function",
                    "format": ["camelCase", "PascalCase"],
                },
                {
                    "selector": "typeLike",
                    "format": ["PascalCase"],
                },
                {
                    "selector": "interface",
                    "format": ["PascalCase"],
                },
                {
                    "selector": "variable",
                    "modifiers": ["const"],
                    "format": ["camelCase", "UPPER_CASE", "PascalCase"],
                },
            ],
        },
    },
    // Override default ignores of eslint-config-next.
    globalIgnores([
        // Default ignores of eslint-config-next:
        ".next/**",
        "out/**",
        "build/**",
        "next-env.d.ts",
        "node_modules/**",
    ]),
]);

export default eslintConfig;
