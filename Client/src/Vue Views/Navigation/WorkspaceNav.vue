<template>
    <div>

        <p class="text-center mt-5 display-4" style="font-size: 1.5em"> {{workspace.title}} </p>
        <hr />
        <div v-for="section in workspace.sections" >
            <SectionNav v-bind:section="section" v-on:navpageclick="$emit('navpageclick', $event)" 
                        v-bind:is-active-section="activeSection.id == section.id"
                        v-bind:active-page="activePage" />
        </div>
    </div>
</template>

<script>
    import SectionNav from './SectionNav.vue';
    import PageLink from './PageLink.vue';

    export default {
        data: function() {
            return {x: 1};
        },
        props: ['workspace', 'active-page', 'active-section'],
        components: {
            SectionNav: SectionNav,
            PageLink: PageLink
        }
    }
</script>