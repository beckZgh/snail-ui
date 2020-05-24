<template>
    <demo-section>
        <demo-block :title="ellipsis">
            <div class="sd-ellipsis">{{ text1 }}</div>
            <div class="sd-multi-ellipsis--l2">{{ text2 }}</div>
        </demo-block>

        <demo-block :title="hairline">
            <div class="sd-hairline--top" />
        </demo-block>

        <!-- <demo-block title="animation">
            <sd-cell is-link title="Fade" @click="animate('sd-fade')" />
            <sd-cell is-link title="Slide Up" @click="animate('sd-slide-up')" />
            <sd-cell is-link title="Slide Down" @click="animate('sd-slide-down')" />
            <sd-cell is-link title="Slide Left" @click="animate('sd-slide-left')" />
            <sd-cell is-link title="Slide Right" @click="animate('sd-slide-right')" />
        </demo-block> -->

        <transition :name="transitionName">
            <div v-show="show" class="demo-animate-block" />
        </transition>
    </demo-section>
</template>

<script>
export default {
    data() {
        return {
            show: false,
            transitionName: '',
            hairline: '1px 边框',
            ellipsis: '文字省略',
            animation: '动画',
            toggle: '切换动画',
            text1: '这是一段最多显示一行的文字，后面的内容会省略',
            text2:
                '这是一段最多显示两行的文字，后面的内容会省略。这是一段最多显示两行的文字，后面的内容会省略',
        };
    },

    methods: {
        animate(transitionName) {
            this.show = true;
            this.transitionName = transitionName;

            setTimeout(() => {
                this.show = false;
            }, 500);
        },
    },
};
</script>

<style lang="scss">
@import '../../style/var.scss';

.demo-style {
    .sd-ellipsis,
    .sd-multi-ellipsis--l2 {
        max-width: 300px;
        margin-left: $padding-md;
        font-size: 14px;
        line-height: 18px;
    }

    .sd-ellipsis {
        margin-bottom: $padding-md;
    }

    .sd-hairline--top {
        height: 30px;
        background-color: $white;

        &::after {
            top: 5px;
        }
    }

    .demo-animate-block {
        position: fixed;
        top: 50%;
        left: 50%;
        width: 100px;
        height: 100px;
        margin: -50px 0 0 -50px;
        background-color: $blue;
        border-radius: 3px;
    }
}
</style>
