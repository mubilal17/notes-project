class PageElement
{

    constructor(elementId, type, content)
    {
        this.id = elementId != undefined ? elementId : 0;
        this.type = type != undefined ? type : 'p';
        this.content = content;
    }

}

module.exports = PageElement;