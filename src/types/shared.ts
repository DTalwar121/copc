export interface ResultObject {
    result: {
        "totalIssues": number,
        "humanContactVolume": number,
        "selfServiceSuccess": number,
        "fcrIssues": number
    },
    meta: {
        "slug": string,
        "version": string
    }
}

export type Input = number | string