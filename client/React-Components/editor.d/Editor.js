const Title = require('./editor-elements/Title.js');
const Page = require('./editor-elements/Page.js');
const AddNewElement = require('./editor-elements/AddElementButton');

class Editor extends React.Component {
    constructor(props)
    {
        super(props);
        let document = this.props.document;
        this.state = {document: this.props.document};
        this.updateContent = this.updateContent.bind(this);
        this.addNewElementToDocument = this.addNewElementToDocument.bind(this);
    }

    updateContent(documentUpdateEvent)
    {
        if (this.props.onDocumentChange)
        {
            documentUpdateEvent.documentId = this.state.document.id;
            this.props.onDocumentChange(documentUpdateEvent);
        }
    }

    addNewElementToDocument(event)
    {

        const documentUpdateEvent = {documentId: this.state.document.id, type: 'elementCreated', element: {type: 'p', content: ''}}
        this.updateContent(documentUpdateEvent);
        /*
        this.setState( (state, props) => {
            let documentElements = this.state.document.contentElements;
            elements.push({type: 'p'});
            return { documentElements: documentElements };
        });
         */
    }
    render()
    {
        let document = this.props.document;
        return (
            <div id="editor" className="container bg-white shadow w-100 vh-100 px-3 pt-2 border rounded">
                <Title sectionTitle={document.section}> {document.title} </Title>
                <Page documentId={document.id} documentChildren={document.contentElements} onDocumentChange={this.updateContent}/>
                <AddNewElement onClick={this.addNewElementToDocument}>Add New Element</AddNewElement>
            </div>
        )
    }
}

module.exports = Editor;