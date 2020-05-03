const Element = require('./Element');


class Page extends React.Component {
    constructor(props)
    {
        super(props);
        this.pageId = this.props.children.id;
    }

    getElementView(element)
    {
        const key = `doc${this.pageId}elem${element.id}`;

        return <Element id={key} key={key} elementId={element.id} type={element.type}
                        content={element.content} onContentChange={this.props.onElementModified} />;
    }

    render()
    {
        let page = this.props.children;
        let elementMarkup = page.elements.map(element => this.getElementView(element));
        return (
            <div className="mt-5">
                {elementMarkup}
            </div>
        )
    }
}

module.exports = Page;