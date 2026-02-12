import {executeCalculator} from "@/application/calculators/execute-calculator";

export async function POST(
    req: Request,
    context: { params: Promise<{ slug: string }> },
) {
    const body = await req.json();
    const {slug} = await context.params;
    console.log(body, "body");
    const execution = executeCalculator({
        slug: slug,
        input: body.input ?? body,
        version: body.version,
    });

    return Response.json(execution);
}
