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
        this.contentElements[elementId] = {type: 'p', id: elementId, content: content}
    }

}

module.exports = DocumentData;