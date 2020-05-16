

<template>
    <div class="row h-100 w-100">
        <Sidebar v-bind:workspace-title="workspaceTitle">
            <div v-for="section in sections">
                <SidebarSection v-bind:section="section" v-on:add-new-page-to-section="onNewPageToSection">
                    <div v-for="page in section.pages">
                        <SidebarPage v-on:pagelink-click="onPageClicked"
                                    v-bind:page-id="page.id"  v-bind:page-section-id="section.id"
                                    v-bind:active="page.id == focusedPage.id && section.id == focusedSection.id ? true : false">
                            {{page.title}}
                        </SidebarPage>
                    </div>
                </SidebarSection>
            </div>
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
    import SidebarSection from './SidebarViews/SidebarSection.vue'
    import SidebarPage from "./SidebarViews/SidebarPage.vue";

    import Section from '../Data Models/Section.js';
    import Page from '../Data Models/Page.js';
    import PageElement from '../Data Models/PageElement.js';

    const sectionTitles = ['Calculus', 'Differential Equations', 'Linear Algebra'];
    const pageTitles = ['Overview', 'Terminology', 'Exercises']

    function getTemporarySectionData()
    {
        const sections = [];
        for (let i = 0; i < sectionTitles.length; i++)
        {
            let section = new Section(i, sectionTitles[i]);
            for (let j = 0; j < pageTitles.length; j++)
            {
                let element1 = new PageElement(1, 'p', 'Hello, this is the first element of this page');
                let element2 = new PageElement(1, 'p', 'Hello, this is the second element of this page');
                let page = new Page(0, pageTitles[j], [element1, element2]);
                section.addPage(page);
            }
            sections.push(section);
        }
        return sections;
    }

    const sections = getTemporarySectionData();
    const focusedSection = sections[0];
    const focusedPage = sections[0].pages[0];
    export default {
        data: function() {
            return {
                workspaceTitle: "Mathematics",
                sections: sections,
                focusedSection: focusedSection,
                focusedPage: focusedPage
            };
        },
        components: {
            Sidebar: Sidebar,
            SidebarSection: SidebarSection,
            SidebarPage: SidebarPage,
            Editor: Editor
        },
        methods: {
            onPageClicked: function(event) {
                let focusedSection = this.sections.find( section => section.id == event.pagesectionId);
                let page = focusedSection.pages.find(page => page.id == event.pageclicked);
                this.focusedSection = focusedSection;
                this.focusedPage = page;
            },

            onFocusedPageTitleChanged: function(event) {
                console.log(this.focusedPage.title);
            },
            onFocusedPageElementUpdated: function(event) {
                console.log('element updated');
            },

            onNewElementToFocusedPage: function(event) {
                console.log('new element added');
            },

            onNewPageToSection: function(event) {
                console.log('new page added');
            },

        },
    }
</script>