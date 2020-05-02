const Title = require('./editor-elements/Title.js');
const Page = require('./editor-elements/Page.js');
const AddNewElement = require('./editor-elements/AddElementButton');

class Editor extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {document: this.props.document};
        this.updateContent = this.updateContent.bind(this);
        this.addNewElementToDocument = this.addNewElementToDocument.bind(this);
    }

    updateContent(event)
    {
        if (this.props.onDocumentChange)
        {
            const elementId = event.elementId;
            const documentEventUpdate = {type: 'element', elementId: elementId, value: event.content};
            this.props.onDocumentChange(documentEventUpdate);
        }

    }

    addNewElementToDocument(event)
    {
        const documentUpdateEvent = {type: 'elementCreated', element: {type: 'p', content: ''}}
        this.props.onDocumentChange(documentUpdateEvent);
    }
    render()
    {
        let document = this.props.document;
        return (
            <div id="editor" className="container bg-white shadow w-100 vh-100 px-3 pt-2 border rounded">
                <Title sectionTitle={document.section}> {document.title} </Title>
                <Page onElementModified={this.updateContent}>
                    {document}
                </Page>
                <AddNewElement onElementClicked={this.addNewElementToDocument}>Add New Element</AddNewElement>
            </div>
        )
    }
}

module.exports = Editor;