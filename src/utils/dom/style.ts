export function isHidden(el: HTMLElement) {
    const style = window.getComputedStyle(el);
    const hidden = style.display === 'none';

    const parentHidden = el.offsetParent === null && style.position !== 'fixed';
    return hidden || parentHidden;
}
