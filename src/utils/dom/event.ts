import { isServer } from '..';
import { EventHandler } from '../types';

// eslint-disable-next-line import/no-mutable-exports
export let supportsPassive = false;

if (!isServer) {
    try {
        const opts = {};
        Object.defineProperty(opts, 'passive', {
            get() {
                supportsPassive = true;
            },
        });
        window.addEventListener('test-passive', null as any, opts);
        // eslint-disable-next-line no-empty
    } catch (e) {}
}

// 添加事件监听
export function on(target: EventTarget, event: string, handler: EventHandler, passive = false) {
    if (!isServer) {
        target.addEventListener(
            event,
            handler,
            supportsPassive ? { capture: false, passive } : false,
        );
    }
}

// 移除事件监听
export function off(target: EventTarget, event: string, handler: EventHandler) {
    if (!isServer) target.removeEventListener(event, handler);
}

// 停止冒泡
export function stopPropagation(event: Event) {
    event.stopPropagation();
}

// 阻止触发默认事件
export function preventDefault(event: Event, isStopPropagation?: boolen) {
    if (typeof event.cancelable !== 'boolean' || event.cancelable) {
        event.preventDefault();
    }

    if (isStopPropagation) stopPropagation(event);
}
