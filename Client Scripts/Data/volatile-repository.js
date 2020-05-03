const Page = require('./Page.js');

class VolatileRepository
{
    constructor()
    {
        this.docIds = [0, 1, 2];
        this.titles = ['Overview', 'Terminology', 'Exercises'];
        this.sections = ['Calculus', 'Differential Equations', 'Linear Algebra'];
        const docs = [];
        let idCounter = 0;
        for (let i = 0; i < 3; i++)
        {

            for (let j = 0; j < this.sections.length; j++)
            {
                const p1 = {type:'p', id: 0, content: "Hello from " + this.titles[j]};
                const p2 = {type:'p', id: 1, content: "This is line " + 2 + " of " + this.titles[j]};
                let contentElements = [p1, p2];
                let doc = new Page(idCounter, this.sections[i], this.titles[j], contentElements);
                docs.push(doc);
                idCounter++;
            }
        }

        this.docs = docs;
    }

    getSections()
    {
        return this.sections.map(section => {
            const sectionDocuments = this.docs.filter(doc => doc.section == section);
            return {sectionName: section, documents: sectionDocuments}
        });
    }

    getDocument(docId)
    {
        return this.docs[docId];
    }

    updateDocument(docId, document)
    {
        this.docs[docId] = document;
    }
}


module.exports = new VolatileRepository();