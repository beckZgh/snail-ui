import { isNaN } from './number';

// 是否为日期
export function isDate(val: Date): val is Date {
    return Object.prototype.toString.call(val) === '[object Date]' && !isNaN(val.getTime());
}
