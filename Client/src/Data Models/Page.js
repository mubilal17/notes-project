
import { PageElement } from './PageElement';
import { RepositoryNode } from './RepositoryNode';

class Page extends RepositoryNode {

    constructor(id, title, elements)
    {
        super();
        this.id = id;
        this.title = title != null ? title : 'Untitled Page';
        this.elements = elements != null ? elements : [];
        let maxNumber = 0;
        this.indexCounter = 0;
        this.elements.forEach(element =>
        {
            element.index = this.indexCounter++;
            if (element.id > maxNumber)
                maxNumber = element.id;
        });
        this.elementIdCounter = maxNumber + 1;
    }

    appendNewElement()
    {
        let id = this.getNextElementId();
        let element = new PageElement(id);
        element.indexCounter = this.indexCounter++;
        this.elements.push(element);
    }

    addElement(type, content)
    {
        const id = this.getNextElementId();
	    if (type == undefined)
		    type = 'p';
        let element = new PageElement(id, type, content);
        this.elements.push(element);
        element.indexCounter = this.indexCounter++;
    }

    getElement(elementId)
    {
        return this.elements.find( element => element.id == elementId);
    }

    getElementByIndex(index)
    {
        return this.elements.find(element => element.index == index);
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

    moveElementTo(elementId, index, beforeIndex = false)
    {
        let element = this.getElement(elementId);
        let element2 = this.getElementByIndex(index);
        let factor = beforeIndex ? 1 : -1;
        element.index = index + (0.01*factor);
        element2.index = index - (0.01*factor);
        this.elements.sort((a, b) => a.index - b.index);
    }

    getNextElementId()
    {
        return ++this.elementIdCounter;
    }


}

export { Page };