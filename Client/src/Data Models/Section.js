let Page = require('./Page');

class Section {

    constructor(id, title, pages)
    {
        this.id = id != undefined ? id : 0;
        this.title = title != undefined ? title : 'Untitled Page';
        this.pages = pages != undefined ? pages : [];

        this.pageIdCounter = 0;
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

module.exports = Section;