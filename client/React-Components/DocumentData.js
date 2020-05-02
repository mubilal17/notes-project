class DocumentData {
    constructor(id, section, title, contentElements)
    {
        this.id = id != null ? id : 0;
        this.section = section;
        this.title = title;
        this.contentElements = contentElements  != null ? contentElements : [];
    }

    updateElement(elementId, content)
    {
        let index = this.contentElements.findIndex(element => element.id == elementId);
        this.contentElements[index] = content;
    }

}

module.exports = DocumentData;