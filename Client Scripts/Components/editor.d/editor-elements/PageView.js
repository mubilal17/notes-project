const Element = require('./Element');
const AddNewElement = require('./AddElementButton');

class PageView extends React.Component {
    constructor(props)
    {
        super(props);
        this.pageId = this.props.children.id;
        this.addNewElementToPage = this.addNewElementToPage.bind(this);
    }

    addNewElementToPage(event)
    {
        const pageUpdateEvent = {type: 'elementCreated', element: {type: 'p', content: ''}}
        this.props.onPageChange(pageUpdateEvent);
    }

    getElementView(element)
    {
        const key = `doc${this.pageId}elem${element.id}`;

        return <Element id={key} key={key} elementId={element.id} type={element.type}
                        content={element.content} onContentChange={this.props.onPageChange} />;
    }

    render()
    {
        let page = this.props.children;
        let elementMarkup = page.elements.map(element => this.getElementView(element));
        return (
            <div className="mt-5">
                {elementMarkup}
                <AddNewElement onElementClicked={this.addNewElementToPage}>Add New Element</AddNewElement>
            </div>
        )
    }
}

module.exports = PageView;