// src/application/calculators/types.ts

export type ExecuteCalculatorInput = {
  slug: string;
  input: unknown;
  version?: string;
};

export type ExecuteCalculatorResult = {
  result: unknown;
  meta: {
    slug: string;
    version: string;
  };
};
