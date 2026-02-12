import {evaluate} from 'mathjs';

export function evaluateFormulas(
    input: Record<string, number>,
    definition: {
        variables?: Record<string, string>;
        outputs: Record<string, string>;
    }
) {
    const context = {...input};

    // 1. Evaluate variables if present (allowing variables to depend on input and previous variables)
    if (definition.variables) {
        for (const [name, expression] of Object.entries(definition.variables)) {
            context[name] = evaluate(expression, context);
        }
    }

    // 2. Evaluate final outputs
    const result: Record<string, number> = {};
    for (const [name, expression] of Object.entries(definition.outputs)) {
        result[name] = evaluate(expression, context);
    }

    return result;
}
