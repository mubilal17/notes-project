const Page = require('./Page.js');

class VolatileRepository
{
    constructor()
    {
        this.titles = ['Overview', 'Terminology', 'Exercises'];
        this.sections = ['Calculus', 'Differential Equations', 'Linear Algebra'];
        const pages = [];
        let idCounter = 0;
        for (let i = 0; i < 3; i++)
        {

            for (let j = 0; j < this.sections.length; j++)
            {
                const p1 = {type:'p', id: 0, content: "Hello from " + this.titles[j]};
                const p2 = {type:'p', id: 1, content: "This is line " + 2 + " of " + this.titles[j]};
                let contentElements = [p1, p2];
                let doc = new Page(idCounter, this.sections[i], this.titles[j], contentElements);
                pages.push(doc);
                idCounter++;
            }
        }

        this.pages = pages;
    }

    getSections()
    {
        return this.sections.map(section => {
            const sectionPages = this.docs.filter(page => page.section == section);
            return {title: section, pages: sectionPages}
        });
    }

    getPage(pageId)
    {
        return this.pages[pageId];
    }

    updatePage(pageId, page)
    {
        this.pages[docId] = page;
    }
}


module.exports = new VolatileRepository();