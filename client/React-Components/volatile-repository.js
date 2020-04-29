const DocumentData = require('./DocumentData.js');


const volatileRepository = function ()
{
    const docIds = [1, 2, 3];
    const titles = ['Doc One', 'Doc Two', 'Doc Three'];
    const docs = [];
    for (let i = 0; i < 3; i++)
    {
        const p1 = "Hello from " + titles[i];
        const p2 = "This is line " + 2 + " of " + titles[i];
        contentElements = [p1, p2];
        const doc = new DocumentData(docIds[i], titles[i], contentElements);
        docs.push(doc);
    }

    return docs;
}


module.exports = volatileRepository();