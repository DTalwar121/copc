import "server-only";
import {evaluateFormulas} from "./formula-engine";
import {CalculatorVersionDefinition} from "./registry";

export function createJsonExecutor(definition: CalculatorVersionDefinition) {
    return (input: Record<string, number>) => {
        return evaluateFormulas(input, definition);
    };
}
