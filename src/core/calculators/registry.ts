import "server-only";

// src/core/calculators/registry.ts
import {createJsonExecutor} from "./json-executor";
import bmiV1Def from "./bmi/versions/v1/definition.json";
import cxCostV1Def from "./cx-cost/versions/v1/definition.json"

export type CalculatorSlug = "bmi" | "cx-cost";

export type CalculatorVersionDefinition = {
    description?: string;
    formula?: string; // Standardized field for formula documentation or reference
    variables: Record<string, string>; // name -> expression
    outputs: Record<string, string>; // name -> expression
};

type CalculatorRegistryEntry = {
    slug: CalculatorSlug;
    versions: {
        [version: string]: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            executor: (input: any) => any;
            deprecated?: boolean;
        };
    };
    defaultVersion: string;
};

const REGISTRY: Record<CalculatorSlug, CalculatorRegistryEntry> = {
    "bmi": {
        slug: "bmi",
        defaultVersion: "v1",
        versions: {
            v1: {
                executor: createJsonExecutor(bmiV1Def as CalculatorVersionDefinition),
            },
        },
    },
    "cx-cost": {
        slug: "cx-cost",
        defaultVersion: "v1",
        versions: {
            v1: {
                executor: createJsonExecutor(cxCostV1Def as CalculatorVersionDefinition),
            },
        },
    },
};

export function getCalculator(slug: string) {
    return REGISTRY[slug as CalculatorSlug];
}

export function getDefaultVersion(slug: string) {
    const calc = getCalculator(slug);
    return calc?.defaultVersion;
}

export function getExecutor(slug: string, version: string) {
    const calc = getCalculator(slug);
    return calc?.versions[version]?.executor;
}
