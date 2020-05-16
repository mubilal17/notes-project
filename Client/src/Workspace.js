import { Section } from './Data Models/Section.js';
import Page from './Data Models/Page.js';
import PageElement from './Data Models/PageElement.js';

class Workspace
{
    constructor(workspaceJSON)
    {
        this.id = workspaceJSON.id;
        this.title = workspaceJSON.title;
        this.sections = [];
        for (let i = 0; i < workspaceJSON.sections.length; i++)
        {
            let sectionData = workspaceJSON.sections[i];
            let section = new Section(sectionData.id, sectionData.title, sectionData.pages);
            this.sections.push(section);
        }
    }

    getSection(sectionId)
    {
        return this.sections.find(section => section.id == sectionId);
    }
}
export { Workspace };