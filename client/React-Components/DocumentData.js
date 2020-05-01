class DocumentData {
    constructor(documentId, parentWorkspace, title, contentElements)
    {
        this.documentId = documentId != null ? documentId : 0;
        this.workspace = parentWorkspace;
        this.title = title;
        this.contentElements = contentElements  != null ? contentElements : [];
    }

    updateElement(elementId, content)
    {
        let index = this.contentElements.findIndex(element => element.elementId == elementId);
        this.contentElements[index] = content;
    }

}

module.exports = DocumentData;