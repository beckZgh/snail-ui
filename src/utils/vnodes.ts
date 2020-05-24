import { VNode } from 'vue';

function flattenVNodes(vnodes: VNode[]) {
    const result: VNode[] = [];

    function traverse(vnodes: VNode[]) {
        vnodes.forEach(vnode => {
            result.push(vnode);

            if (vnode.componentInstance) {
                traverse(vnode.componentInstance.$children.map(item => item.$vnode));
            }
            if (vnode.children) {
                traverse(vnode.children);
            }
        });
    }

    traverse(vnodes);

    return result;
}

export function sortChildren(children: Vue[], parent: Vue) {
    const { componentOptions } = parent.$vnode;
    if (!componentOptions || !componentOptions.children) return;

    const vnodes = flattenVNodes(componentOptions.children);
    children.sort((a, b) => vnodes.indexOf(a.$vnode) - vnodes.indexOf(b.$vnode));
}
