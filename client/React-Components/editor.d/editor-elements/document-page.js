const Element = require('./document-element');

class DocumentPage extends React.Component {
    constructor(props)
    {
        super(props);
    }

    render()
    {
        let children = this.props.documentChildren;
        let elements = null;
        if (children != null && children.length > 0)
        {
            elements = children.map((element, index) => {
                return <Element key={'docElem' + index} type={element.type} content={element.content} />;
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