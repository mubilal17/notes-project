<template>
    <div>
        <p> {{ section.title }}</p>
        <div v-for="page in section.pages">
            <PageLink v-bind:page="page" v-on:navpageclick="onNavPageClicked" v-bind:is-active="isActiveSection && activePage.id == page.id" />
        </div>

        <a class="btn w-50 text-muted text-right" style="font-size: 0.75em"
           v-on:click="addNewPage">
            Add New Page
        </a>
    </div>
</template>

<script>
    import PageLink from './PageLink.vue';
    export default {
        data: function() {
            return {x: 1};
        },
        props: ['section', 'is-active-section', 'active-page'],
        components: {
            PageLink: PageLink
        }, 
        methods: {
            onNavPageClicked: function(event) {
                event.sectionId = this.section.id;
                this.$emit('navpageclick', event);
            }, 
            addNewPage: function (event)
            {
                this.section.appendNewPage();
            }
        }
    }
</script>