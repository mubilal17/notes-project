const Element = require('./Element');


class Page extends React.Component {
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
            const documentEventUpdate = {type: 'element', elementId: elementId, value: event.content};
            this.props.onDocumentChange(documentEventUpdate);
        }
    }

    render()
    {
        return (
            <div className="mt-5">
                {this.props.documentChildren.map((element) => {
                    return <Element key={'doc' + this.props.documentId + 'elem' + element.id} elementId={element.id} type={element.type}
                                    content={element.content} onContentChange={this.updateContent} />;
                })}
            </div>
        )
    }
}

module.exports = Page;