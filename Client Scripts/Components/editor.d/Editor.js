const Title = require('./editor-elements/Title.js');
const Page = require('./editor-elements/PageView.js');
const AddNewElement = require('./editor-elements/AddElementButton');

class Editor extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {document: this.props.page};
        this.updateContent = this.updateContent.bind(this);
        this.addNewElementToPage = this.addNewElementToPage.bind(this);
    }

    updateContent(event)
    {
        if (this.props.onPageChange)
        {
            const elementId = event.elementId;
            const pageUpdateEvent = {type: 'element', elementId: elementId, value: event.content};
            this.props.onPageChange(pageUpdateEvent);
        }
    }

    addNewElementToPage(event)
    {
        const pageUpdateEvent = {type: 'elementCreated', element: {type: 'p', content: ''}}
        this.props.onPageChange(pageUpdateEvent);
    }
    render()
    {
        let page = this.props.page;
        return (
            <div id="editor" className="container bg-white shadow w-100 vh-100 px-3 pt-2 border rounded">
                {this.props.children}
                <AddNewElement onElementClicked={this.addNewElementToPage}>Add New Element</AddNewElement>
            </div>
        )
    }
}

module.exports = Editor;