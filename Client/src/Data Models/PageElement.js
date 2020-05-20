import { RepositoryNode } from './RepositoryNode';
class PageElement extends RepositoryNode
{

    constructor(elementId, type, content)
    {
        super();
        this.id = elementId != undefined ? elementId : 0;
        this.type = type != undefined ? type : 'p';
        this.content = content;
        this.index = null;
    }

}

export { PageElement };