// 是否数字
export function isNumeric(val: string): boolean {
    return /^\d+(\.\d+)?$/.test(val);
}

// 是否 NaN
export function isNaN(val: number): val is typeof NaN {
    if (Number.isNaN) {
        return Number.isNaN(val);
    }

    // eslint-disable-next-line no-self-compare
    return val !== val;
}
