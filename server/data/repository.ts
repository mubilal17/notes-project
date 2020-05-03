import {Page} from './models/Page';
import {Section} from './models/Section'
import {PageElement} from "./models/PageElement";

class Repository {
    private sections: Array<Section>
    private sectionIdCounter: number;
    constructor()
    {
        this.sections = [];
        this.sectionIdCounter = 0;
        for (let i = 0; i < volatileData.sections.length; i++)
        {
            let section = new Section(this.sectionIdCounter++, volatileData.sections[i]);
            for (let j = 0; j < volatileData.pages.length; j++)
            {
                let page = new Page(j+1, volatileData.pages[j]);
                for (let k = 0; k < volatileData.elementContent.length; k++)
                {
                    const content = volatileData.elementContent[k];
                    page.addElement('p', content);
                }
                section.addPage(page);
            }
            this.sections.push(section);
        }
    }

    public appendNewPage(sectionId: number)
    {
        let section = this.sections.find(section => section.id = sectionId);
        section.appendNewPage();
    }

    public addPage(sectionId: number, page: Page)
    {
        let section = this.sections.find(section => section.id = sectionId);
        section.addPage(page);
    }

    public getSection(sectionId: number): Section
    {
        return this.sections.find(section => section.id = sectionId);
    }

    public getSections()
    {
        return this.sections;
    }
}

let volatileData = {
    sections: ['Calculus', 'Differential Equations', 'Abstract Algebra'],
    pages: ['Overview', 'Terminology', 'Exercises'],
    elementContent: ['Hello World!', 'This is line 2', 'This is line 3']
};
export {Repository};
