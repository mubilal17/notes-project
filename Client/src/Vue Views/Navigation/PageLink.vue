<template>
    <a class="nav-item nav-link text-dark" href="#" v-on:click="onPageClicked" v-bind:style="isActive ? {backgroundColor: '#DFE0E1'} : {}">
        {{page.title}}
    </a>
</template>

<script>
    export default {
        props: ['page', 'isActive'],
        methods: {
            onPageClicked: function ()
            {
                this.$emit('navpageclick', { pageId: this.page.id });
            }
        }
    }
</script>