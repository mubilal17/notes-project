const ElementModel = require('./ElementModel');

class PageModel
{
    constructor(id, title, elements)
    {
        this.id = id;
        this.title = title;
        this.elementIdCounter = 0;
        if (elements != null)
        {
            elements.forEach(element => {
               if (element.id >= this.elementIdCounter)
               {
                   this.elementIdCounter = element.id + 1;
               }
            });
            this.elements = elements;
        }
        else
        {
            this.elements = [];
        }
    }

    appendNewElement()
    {
        let id = this.getNextElementId();
        let element = new ElementModel(id);
        this.elements.push(element);
    }

    addElement(type, content)
    {
        const id = this.getNextElementId();
        let element = new ElementModel(id, type, content);
        this.elements.push(element);
    }
    getElement(elementId)
    {
        return this.elements.find( element => element.id == elementId);
    }

    updateElement(elementId, content)
    {
        let element = this.elements.find( element => element.id == elementId);
        element.content = content;
    }

    deleteElement(elementId)
    {
        throw new Error('deleteElement not implemented yet');
    }

    getNextElementId()
    {
        return ++this.elementIdCounter;
    }
}

module.exports = PageModel;