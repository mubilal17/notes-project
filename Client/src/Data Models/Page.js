
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
        this.elements.forEach(element => {
            if (element.id > maxNumber)
                maxNumber = element.id;
        });
        this.elementIdCounter = maxNumber + 1;
    }

    appendNewElement()
    {
        let id = this.getNextElementId();
        let element = new PageElement(id);
        this.elements.push(element);
    }

    addElement(type, content)
    {
        const id = this.getNextElementId();
	if (type == undefined)
		type = 'p';
        let element = new PageElement(id, type, content);
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

export { Page };