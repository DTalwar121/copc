import "server-only";

// src/core/calculators/engine.ts
import {getCalculator, getDefaultVersion, getExecutor} from "./registry";

type ExecuteParams = {
    slug: string;
    input: unknown;
    version?: string;
};

export function executeCalculator({slug, input, version}: ExecuteParams) {
    const calculator = getCalculator(slug);

    if (!calculator) {
        throw new Error(`Calculator not found: ${slug}`);
    }

    const resolvedVersion = version ?? getDefaultVersion(slug);
    const executor = getExecutor(slug, resolvedVersion);

    if (!executor) {
        throw new Error(
            `Version ${resolvedVersion} not found for calculator ${slug}`,
        );
    }

    return {
        result: executor(input),
        meta: {
            slug,
            version: resolvedVersion,
        },
    };
}
