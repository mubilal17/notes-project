
class DataHandler
{
    constructor(repository)
    {
        this.repository = repository;
    }

    getDocumentById(id)
    {
        return repository.find( document => document.documentId == id);
    }
}

module.exports = DataHandler;