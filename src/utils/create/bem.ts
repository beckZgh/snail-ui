/**
 * bem helper
 * b() // 'button'
 * b('text') // 'button__text'
 * b({ disabled }) // 'button button--disabled'
 * b('text', { disabled }) // 'button__text button__text--disabled'
 * b(['disabled', 'primary']) // 'button button--disabled button--primary'
 */

/**
 * type 用于创建类型别名
 * type 值如果为字面量类型，则会约束取值只能是其中的某项
 */

/** 声明模块类型 */
export type Mod = string | { [key: string]: any };
export type Mods = Mod | Mod[];

function gen(name: string, mods?: Mods): string {
    if (!mods) return '';

    if (typeof mods === 'string') return ` ${name}--${mods}`;

    if (Array.isArray(mods)) {
        return mods.reduce<string>((ret, item) => ret + gen(name, item), '');
    }

    return Object.keys(mods).reduce((ret, key) => ret + (mods[key] ? gen(name, key) : ''), '');
}

export function createBEM(name: string) {
    return function(el?: Mods, mods?: Mods): Mods {
        if (el && typeof el !== 'string') {
            mods = el;
            el = '';
        }

        el = el ? `${name}__${el}` : name;

        return `${el}${gen(el, mods)}`;
    };
}

export type BEM = ReturnType<typeof createBEM>;
