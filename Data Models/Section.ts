// @ts-ignore
import PageModule from './Page'
let Page = PageModule.Page;

class Section {
    id: number;
    title: string;

    //@ts-ignore
    pages: Array<Page>;

    private pageIdCounter: number;

    //@ts-ignore
    constructor(id, title='Untitled Section', pages?: Array<Page>)
    {
        this.id = id;
        this.title = title;
        this.pages = pages ?? [];

        this.pageIdCounter = 0;
    }

    //@ts-ignore
    public appendNewPage()
    {
        let id = this.getNextPageId();
        let page = new Page(id)
        this.pages.push(page);
    }

    //@ts-ignore
    public addPage(page: Page)
    {
        page.id = this.getNextPageId();
        this.pages.push(page);
    }

    //@ts-ignore
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

export default {Section};