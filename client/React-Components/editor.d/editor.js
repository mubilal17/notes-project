const DocTitle = require('./editor-elements/title.js');
const DocumentPage = require('./editor-elements/document-page.js');


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
            <div id="editor" className="container-fluid px-0">
                <div className="offset-1 col-11 bg-white shadow w-100 vh-100 px-3 pt-2 border rounded" >
                    <div className="container">
                        <DocTitle sectionTitle={document.section}> {document.title} </DocTitle>
                        <DocumentPage documentId={document.id} documentChildren={document.contentElements} onDocumentChange={this.updateContent}/>
                        <button className="btn btn-sm btn-outline-light text-muted border-0" href="#" onClick={this.addNewElementToDocument}>
                            <span className="material-icons align-middle py-1">vertical_align_top</span>
                            Add New Item
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

module.exports = Editor;