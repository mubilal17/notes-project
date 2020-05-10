
<template>
    <input class="form-control border-0 my-3" v-model="element.content"
           placeholder="Content goes here..."
           v-bind:class="{shadow: showShadow}"
           v-on:focusin="isFocused = true" v-on:focusout="isFocused = false"
           v-on:mouseenter="isHovered = true" v-on:mouseleave="isHovered = false" />
</template>

<script>
    export default {
        data: function() {
            return {isFocused: false, isHovered: false};
        },
        computed: {
            showShadow: function() {
                return this.isFocused || this.isHovered;
            }
        },
        props: ['element'],
    }
</script>

<style scoped>
    input {
        font-size: 1.25em;
    }

</style>