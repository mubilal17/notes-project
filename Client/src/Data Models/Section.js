import { Page } from './Page';
import { RepositoryNode } from './RepositoryNode';

class Section extends RepositoryNode {

    constructor(id, title, pages)
    {
        super();
        this.id = id != undefined ? id : 0;
        this.title = title != undefined ? title : 'Untitled Page';
        this.pages = pages != undefined ? pages : [];
        let maxNumber = 0;
        this.pages.forEach(page =>
        {
            if (page.id > maxNumber)
                maxNumber = page.id;
        });
        this.pageIdCounter = maxNumber + 1;
    }

    get Id()
    {
        return this.id;
    }

    set Id(value)
    {
        this.id = value;
    }

    get Title() {
        return this.title;
    }

    set Title(value)
    {
        this.title = value;
    }
  
    appendNewPage()
    {
        let id = this.getNextPageId();
        let page = new Page(id)
        console.log(this);
        this.pages.push(page);
    }

    addPage(page)
    {
        page.id = this.getNextPageId();
        this.pages.push(page);
    }
    removePage(pageId)
    {
        throw new Error('removePage not implemented yet');
    }

    getNextPageId()
    {
        return ++this.pageIdCounter;
    }
}

export { Section };