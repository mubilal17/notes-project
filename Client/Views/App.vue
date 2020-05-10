

<template>
    <div class="row h-100 w-100">
        <Sidebar v-bind:workspace-title="workspaceTitle">
            <div v-for="section in sections">
                <SidebarSection v-bind:section="section">
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
        <Editor v-bind:page="focusedPage" v-bind:section-title="focusedSection.title" />
    </div>
</template>

<script>
    import Editor from './Editor.vue'
    import Sidebar from './Sidebar.vue'
    import SidebarSection from './SidebarViews/SidebarSection.vue'
    import SidebarPage from "./SidebarViews/SidebarPage.vue";
    const SectionModel = require('./ViewModels/SectionModel');
    const PageModel = require('./ViewModels/PageModel');
    const ElementModel = require('./ViewModels/ElementModel');

    const sectionTitles = ['Calculus', 'Differential Equations', 'Linear Algebra'];
    const pageTitles = ['Overview', 'Terminology', 'Exercises']

    function getTemporarySectionData()
    {
        const sections = [];
        for (let i = 0; i < sectionTitles.length; i++)
        {
            let section = new SectionModel(i, sectionTitles[i], []);
            for (let j = 0; j < pageTitles.length; j++)
            {
                let element1 = new ElementModel(1, 'p', 'Hello, this is the first element of this page');
                let element2 = new ElementModel(1, 'p', 'Hello, this is the second element of this page');
                let page = new PageModel(0, pageTitles[j], [element1, element2]);
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
            }
        }
    }
</script>