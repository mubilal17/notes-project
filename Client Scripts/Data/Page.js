class Page {
    constructor(id, title, elements)
    {
        this.id = id != null ? id : 0;
        this.title = title;
        this.elements = elements  != null ? elements : [];
        let maxId = 0;
        this.elements.forEach(element => {
            if (element.id > maxId)
                maxId = element.id;
        });
        this.idCounter = maxId + 1; // arbitrarily chosen, for simple element id usage.
    }

    updateElement(elementId, content)
    {
        this.elements.find(element => element.id == elementId).content = content;
    }

    addElement(element)
    {
        const newId = this.idCounter++;
        const newElement = {type: 'p', id: newId, content: ''};
        this.elements.push(newElement);
    }

}

module.exports = Page;