const Element = require('./document-element');


class DocumentPage extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {documentChildren: this.props.documentChildren};
        this.updateContent = this.updateContent.bind(this);
    }

    updateContent(event)
    {
        const elementId = event.elementId;
        this.state.documentChildren[elementId] = event.content;
        if (this.props.onDocumentChange)
        {
            const documentEventUpdate = {type: 'element', elementId: elementId, value: event.value};
            this.props.onDocumentChange(documentEventUpdate);
        }
    }

    render()
    {
        let children = this.props.documentChildren;
        let elements = null;
        if (children != null && children.length > 0)
        {
            elements = children.map((element, index) => {
                return <Element key={'docElem' + index} elementId={index} type={element.type}
                                content={element.content} onContentChange={this.updateContent} />;
            });
        }
        return (
            <div className="mt-5">
                {elements}
            </div>
        )
    }
}

module.exports = DocumentPage;