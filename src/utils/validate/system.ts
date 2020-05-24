import { isServer } from '..';

export function isAndroid(): boolean {
    return isServer ? false : /android/.test(navigator.userAgent.toLowerCase());
}

export function isIOS(): boolean {
    return isServer ? false : /ios|iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase());
}
