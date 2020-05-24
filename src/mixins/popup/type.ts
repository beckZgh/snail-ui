export type GetContainer = () => Element;

export type PopupMixinProps = {
    value: boolean;
    zIndex: string | number;
    overlay?: boolean;
    locakScroll: boolean;
    lazyRender: boolean;
    overlayClass?: any;
    overlayStyle?: object | object[];
    getContainer?: string | GetContainer;
    closeOnClickOverlay?: boolean;
};
