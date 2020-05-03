import {Page} from './Page'

class Section {
    id: number;
    title: string;
    pages: Array<Page>

    private pageIdCounter: number;

    constructor(id, title='Untitled Section')
    {
        this.id = id;
        this.title = title;
        this.pages = [];

        this.pageIdCounter = 0;
    }

    public appendNewPage()
    {
        let id = this.getNextPageId();
        let page = new Page(id)
        this.pages.push(page);
    }

    public addPage(page: Page)
    {
        page.id = this.getNextPageId();
        this.pages.push(page);
    }

    public updatePage(pageId: number, page: Page)
    {
        throw new Error('updatePage not implemented yet');
    }
    public removePage(pageId: number)
    {
        throw new Error('removePage not implemented yet');
    }

    private getNextPageId(): number
    {
        return ++this.pageIdCounter;
    }
}

export {Section}