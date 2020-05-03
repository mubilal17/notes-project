class PageElement
{
    id: number;
    type: string;
    content: string;

    constructor(elementId: number, type?: string, content?: string)
    {
        this.id = elementId;
        this.type = type ?? 'p';
        this.content = content ?? '';
    }
}

export {PageElement};