const Element = require('./Element');


class Page extends React.Component {
    constructor(props)
    {
        super(props);
        this.documentId = this.props.children.id;
    }

    getElementView(element)
    {
        const key = `doc${this.documentId}elem${element.id}`;

        return <Element key={key} elementId={element.id} type={element.type}
                        content={element.content} onContentChange={this.props.onElementModified} />;
    }

    render()
    {
        let document = this.props.children;
        let elementMarkup = document.contentElements.map(element => this.getElementView(element));
        return (
            <div className="mt-5">
                {elementMarkup}
            </div>
        )
    }
}

module.exports = Page;