const DocTitle = require('./editor-elements/title.js');
const DocumentPage = require('./editor-elements/document-page.js');

const DocumentData = require('../DocumentData');
const repository = require('../volatile-repository.js');
const DataHandler = require('../data-handler.js');

class Editor extends React.Component {
    constructor(props)
    {
        super(props);
        let document = this.props.document;
        this.state = {documentTitle: document.title, documentWorkspace: document.workspace,
            documentElements: document.contentElements};

        this.updateContent = this.updateContent.bind(this);
        this.addNewElementToDocument = this.addNewElementToDocument.bind(this);
    }

    updateContent(documentUpdateEvent)
    {
        if (this.props.onDocumentChange)
        {
            this.props.onDocumentChange(documentUpdateEvent);
        }
    }

    addNewElementToDocument(event)
    {
        this.setState( (state, props) => {
            let documentElements = this.state.documentElements;
            elements.push({type: 'p'});
            return { documentElements: documentElements };
        });
    }
    render()
    {
        return (
            <div id="editor" className="container-fluid px-0">
                <div className="offset-1 col-11 bg-white shadow w-100 vh-100 px-3 pt-2 border rounded" >
                    <div className="container">
                        <DocTitle sectionTitle={this.state.documentWorkspace}> {this.state.documentTitle} </DocTitle>
                        <DocumentPage documentChildren={this.state.documentElements} onDocumentChange={this.updateContent}/>
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