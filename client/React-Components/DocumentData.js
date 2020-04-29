class DocumentData {
    constructor(documentId, title, contentElements)
    {
        this.documentId = documentId != null ? documentId : 0;
        this.title = title;
        this.contentElements = contentElements  != null ? contentElements : [];
    }

}

module.exports = DocumentData;