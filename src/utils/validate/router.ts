/**
 * Vue Router support
 */

import { RenderContext } from 'vue/types';
import VueRouter, { RawLocation } from 'vue-router/types';

export type RouteConfig = {
    url?: string;
    to?: RawLocation;
    replace?: boolean;
};

export function route(router: VueRouter, config: RouteConfig) {
    const { to, url, replace } = config;

    if (to && router) {
        const promise = router[replace ? 'replace' : 'push'](to);

        if (promise && promise.catch) {
            promise.catch(err => {
                if (err && err.name !== 'NavigationDuplicated') throw err;
            });
        } else if (url) {
            replace ? location.replace(url) : (location.href = url);
        }
    }
}

export function functionalRoute(context: RenderContext) {
    route(context.parent && context.parent.$router, context.props);
}

export type RouteProps = {
    url?: string;
    replace?: boolean;
    to?: RawLocation;
};
