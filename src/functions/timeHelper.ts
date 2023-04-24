export function subsTime(past: Date) {
    // @ts-ignore
    return Math.abs(Date.now() - past)
}