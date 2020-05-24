import { context } from './context';
import { openOverlay, closeOverlay, updateOverlay } from './overlay';

import { on, off, preventDefault } from '../../utils/dom/event';
import { removeNode } from '../../utils/dom/node';
import { getScroller } from '../../utils/dom/scroll';

import { TouchMixin } from '../touch';
import { PortalMixin } from '../protal';
import { CloseOnPopstateMixin } from '../close-on-popstate';

export const popupMixinProps = {
    value: Boolean,
    overlay: Boolean,
    overlayStyle: Object,
    overlayClass: String,
    closeOnClickOverlay: Boolean,
    zIndex: [Number, String],
    lockScroll: {
        type: Boolean,
        default: true,
    },
    lazyRender: {
        type: Boolean,
        default: true,
    },
};

export function PopupMixin(options = {}) {
    return {
        mixins: [
            TouchMixin,
            CloseOnPopstateMixin,
            PortalMixin({
                afterPortal() {
                    if (this.overlay) {
                        updateOverlay();
                    }
                },
            }),
        ],

        props: popupMixinProps,

        data() {
            return {
                inited: this.value,
            };
        },

        computed: {
            shouldRender() {
                return this.inited || !this.lazyRender;
            },
        },

        watch: {
            value(val) {
                const type = val ? 'open' : 'close';
                this.inited = this.inited || this.value;
                this[type]();

                if (!options.skipToggleEvent) this.$emit(type);
            },

            overlay: 'renderOverlay',
        },

        mounted() {
            if (this.value) this.open();
        },

        activated() {
            if (this.shouldRender) {
                this.$emit('input', true);
                this.shouldRender = false;
            }
        },

        beforeDestory() {
            this.close();

            if (this.getContainer) removeNode(this.$el);
        },

        deactivated() {
            if (this.value) {
                this.close();
                this.shouldRender = true;
            }
        },

        methods: {
            open() {
                if (this.$isServer || this.opened) return;

                if (this.zIndex !== undefined) {
                    context.zIndex = this.zIndex;
                }

                this.opened = true;
                this.renderOverlay();

                if (this.locakScroll) {
                    on(document, 'touchstart', this.touchStart);
                    on(document, 'touchmove', this.onTouchMove);

                    if (!context.lockCount) document.body.classList.add('sd-overflow-hidden');
                }

                context.lockCount++;
            },

            close() {
                if (!this.opened) return;

                if (this.lockScroll) {
                    context.lockCount--;
                    off(document, 'touchstart', this.touchStart);
                    off(document, 'touchmove', this.onTouchMove);

                    if (!context.lockCount) document.body.classList.remove('sd-overflow-hidden');
                }

                this.opened = false;
                closeOverlay(this);
                this.$emit('input', false);
            },

            onTouchMove(event) {
                this.onTouchMove(event);
                const direction = this.deltaY > 0 ? '10' : '01';
                const el = getScroller(event.target, this.$el);

                const { scrollHeight, offsetHeight, scrollTop } = el;
                let status = '11';

                if (scrollTop === 0) {
                    status = offsetHeight >= scrollHeight ? '00' : '01';
                } else if (scrollTop + offsetHeight >= scrollHeight) {
                    status = '10';
                }

                if (
                    status !== '11' &&
                    this.direction === 'vertical' &&
                    !(parseInt(status, 2) & parseInt(direction, 2))
                ) {
                    preventDefault(event, true);
                }
            },

            renderOverlay() {
                if (this.$isServer || !this.value) return;

                this.$nextTick(() => {
                    this.updateZIndex(this.overlay ? 1 : 0);

                    if (this.overlay) {
                        openOverlay(this, {
                            zIndex: context.zIndex++,
                            duration: this.duration,
                            className: this.overlayClass,
                            customStyle: this.overlayStyle,
                        });
                    } else {
                        closeOverlay(this);
                    }
                });
            },

            updateZIndex(value = 0) {
                this.$el.style.zIndex = ++context.zIndex + value;
            },
        },
    };
}
