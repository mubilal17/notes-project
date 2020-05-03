class PageElement
{
    id: number;
    type: string;
    content: string;

    constructor(elementId: number = 0, type: string = 'p', content: string = '')
    {
        this.id = elementId ?? -1;
        this.type = type ?? 'p';
        this.content = content ?? '';
    }
}

export {PageElement};