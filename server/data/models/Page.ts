import {PageElement} from './PageElement';

class Page {
    id: number;
    title: string;
    section: string;
    elements: Array<number>;
    constructor(id: number, title: string, section: string, elements?: Array<number>)
    {
        this.id = id;
        this.title = title;
        this.section = section;
        this.elements = elements ?? [];
    }

    addElement() {}
    getElement(elementId: number): Element
    {
        return null;
    }
    updateElement(elementId: number, content: string) {}
    deleteElement(elementId: number) {}


}

export {Page};