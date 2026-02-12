import { executeCalculator as executeCoreCalculator } from "@/core/calculators/engine";
import { ExecuteCalculatorInput, ExecuteCalculatorResult } from "./types";

export function executeCalculator(
  command: ExecuteCalculatorInput,
): ExecuteCalculatorResult {
  const { slug, input, version } = command;

  const execution = executeCoreCalculator({
    slug,
    input,
    version,
  });

  return {
    result: execution.result ?? execution,
    meta: {
      slug: execution.meta?.slug ?? slug,
      version: execution.meta?.version ?? version ?? "unknown",
    },
  };
}
