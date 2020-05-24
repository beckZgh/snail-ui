<template>
    <button class="sd-button">
        <slot />
    </button>
</template>

<script>
export default {
    name: 'sd-button',

    props: {
        color: String,
        type: {
            type: String,
            default: 'primary',
        },
    },
};
</script>

<style lang="scss">
.sd-button {
    min-width: 120px;
    color: #fff;
    font-size: 16px;
    line-height: 36px;
    background-color: #f44;
    border: none;
    border-radius: 30px;
}
</style>
