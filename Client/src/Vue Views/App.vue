

<template>
    <div class="row h-100 w-100 m-0">
        <Sidebar >
            <WorkspaceNav v-bind:workspace="workspace" v-on:navpageclick="onPageClicked" v-bind:active-section="focusedSection" v-bind:active-page="focusedPage"/>
        </Sidebar>
        <Editor v-bind:page="focusedPage" v-bind:section-title="focusedSection.title"
            v-on:pageTitleChange="onFocusedPageTitleChanged"
            v-on:pageElementModified="onFocusedPageElementUpdated"
            v-on:newElementToPage="onNewElementToFocusedPage" />
    </div>
</template>

<script>
    import Editor from './Editor.vue'
    import Sidebar from './Sidebar.vue'
    import WorkspaceNav from "./Navigation/WorkspaceNav.vue";




    export default {
        created: function ()
        {
            let workspace = this.workspace;
            workspace.title = "Programming Languages";
            this.sections = workspace.sections;
            this.focusedSection = workspace.sections[0];
            this.focusedPage = workspace.sections[0].pages[0];
        },
        data: function() {
            return {
                sections: null,
                focusedSection: null,
                focusedPage: null
            };
        },
        components: {
            Sidebar: Sidebar,
            WorkspaceNav: WorkspaceNav,
            Editor: Editor
        },
        methods: {
            onPageClicked: function (event)
            {
                console.log('clicked');
                console.log(event);
                let focusedSection = this.sections.find( section => section.id == event.sectionId);
                let page = focusedSection.pages.find(page => page.id == event.pageId);
                this.focusedSection = focusedSection;
                this.focusedPage = page;
            }
        },
        props: ['workspace']
    }
</script>