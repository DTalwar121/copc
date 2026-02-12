import "server-only";
import type {BmiV1Input, BmiV1Output} from "./schema";

export function executeBMIv1(input: BmiV1Input): BmiV1Output {
    const bmi = input.weight / (input.height * input.height);

    let category = "Normal";
    if (bmi < 18.5) category = "Underweight";
    else if (bmi >= 30) category = "Obese";
    else if (bmi >= 25) category = "Overweight";
    else category = "Normal";

    return {
        bmi: parseFloat(bmi.toFixed(2)),
        category,
    };
}
