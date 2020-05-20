import { Section } from './Data Models/Section.js';
import { Page } from './Data Models/Page.js';
import { PageElement } from './Data Models/PageElement.js';

class Workspace
{
    constructor(workspaceJSON)
    {
        this.id = workspaceJSON.id;
        this.title = workspaceJSON.title;
        this.onDataUpdate = this.onDataUpdate.bind(this);
        this.sections = [];
        for (let i = 0; i < workspaceJSON.sections.length; i++)
        {
            let sectionData = workspaceJSON.sections[i];
            let pagesData = sectionData.pages;
            let pages = [];
            for (let j = 0; j < pagesData.length; j++)
            {
                let pageData = pagesData[j];
                let elements = [];
                for (let k = 0; k < pageData.elements.length; k++)
                {
                    let elementData = pageData.elements[k];
                    let element = new PageElement(elementData.id, elementData.type, elementData.content);
                    element.addOnUpdatePropertyHandler(this.onDataUpdate);
                    elements.push(element);
                }
                let page = new Page(pageData.id, pageData.title, elements);
                page.addOnUpdatePropertyHandler(this.onDataUpdate);
                pages.push(page);
            }
            let section = new Section(sectionData.id, sectionData.title, pages);
            section.addOnUpdatePropertyHandler(this.onDataUpdate);
            this.sections.push(section);
        }
    }

    getSection(sectionId)
    {
        return this.sections.find(section => section.id == sectionId);
    }

    onDataUpdate(obj, property, value)
    {
        let type = obj.constructor.name;
        if (type == 'Section')
            this.updateSection(obj, property, value);
        else if (type == 'Page')
            this.updatePage(obj, property, value);
        else if (type == 'PageElement')
            this.updatePageElement(obj, property, value);
        else
            throw new Error('Could not find suitable element - Workspace.js');
    }

    updateSection(section, property, value)
    {
        //console.log('updating section');
        //console.log(value);
    }

    updatePage(page, property, value)
    {
        //console.log('updating page');
    }

    updatePageElement(element, property, value)
    {
        //console.log('updating element');
    }
}
export { Workspace };