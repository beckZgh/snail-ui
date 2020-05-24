import { VNode, CreateElement, RenderContext } from 'vue';
import { InjectOptions, PropsDefinition } from 'vue/types/options';

// 声明事件别名
export type EventHandler = (event: Event) => void;

// 声明默认插槽别名
export type DefaultSlots = {
    default?: ScopedSlot;
};

// 声明单个作用域插槽别名
export type ScopedSlot<Props = any> = (props?: Props) => VNode[] | VNode | undefined;

// 声明多个作用域插槽别名
export type ScopedSlots = DefaultSlots & {
    [key: string]: ScopedSlot | undefined;
};

// 定义 model 选项类型别名
export type ModelOptions = {
    prop?: string;
    event?: string;
};

export type ObjectIndex = Record<string, any>;

// 声明 Props 别名
export type DefaultProps = ObjectIndex;

// 声明函数式组件别名
export type FunctionComponent<Props = DefaultProps, PropDefs = PropsDefinition<Props>> = {
    (h: CreateElement, props: Props, slots: ScopedSlots, context: RenderContext<Props>):
        | VNode
        | undefined;
    props?: PropDefs;
    model?: ModelOptions;
    inject?: InjectOptions;
};
