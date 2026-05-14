export function mapBooleanArgs(args: any): any {
    const out = { ...args };
    Object.entries(args).forEach(
        (entry) => {
            const k = entry[0];
            let v = entry[1];
            if (v === true) {
                v = ''
            } else if (v === false) {
                v = undefined
            }
            out[k] = v
        })
    return out
}