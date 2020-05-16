<template>
    <a class="nav-item nav-link text-dark" href="#" v-bind:style="active ? {backgroundColor: activeColor} : {}"
       v-on:click="$emit('pagelink-click', {pageclicked: pageId, pagesectionId: pageSectionId, active: active})">
        <slot />
    </a>
</template>

<script>
    export default {
        data: function(){
            return {activeColor: '#DFE0E1'};
        },
        props: ['page-title', 'page-id', 'page-section-id', 'active']
    }
</script>