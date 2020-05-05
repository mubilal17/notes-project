import {PageElement} from './PageElement';

class Page {
    id: number;
    title: string;
    section: string;
    elements: Array<PageElement>;

    private elementIdCounter: number;
    constructor(id: number = 0, title: string = 'Untitled Page', elements: Array<PageElement> = [])
    {
        this.id = id;
        this.title = title;
        this.elements = elements;
        let maxNumber = 0;
        elements.forEach(element => {
            if (element.id > maxNumber)
                maxNumber = element.id;
        });
        this.elementIdCounter = maxNumber + 1;
    }

    public appendNewElement()
    {
        let id = this.getNextElementId();
        let element = new PageElement(id);
        this.elements.push(element);
    }

    public addElement(type: string = 'p', content: string = '')
    {
        const id = this.getNextElementId();
        let element = new PageElement(id, type, content);
        this.elements.push(element);
    }
    public getElement(elementId: number): PageElement
    {
        return this.elements.find( element => element.id == elementId);
    }

    public updateElement(elementId: number, content: string)
    {
        let element = this.elements.find( element => element.id == elementId);
        element.content = content;
    }

    public deleteElement(elementId: number)
    {
        throw new Error('deleteElement not implemented yet');
    }

    private getNextElementId(): number
    {
        return ++this.elementIdCounter;
    }


}

export {Page};