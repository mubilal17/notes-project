const DocTitle = require('./editor-elements/title.js');
const DocumentPage = require('./editor-elements/document-page.js');

const repository = require('../volatile-repository.js');
const DataHandler = require('../data-handler.js');

let workspaceSection = "Calculus";
let documentLoadedTitle = "Terminology";
class Editor extends React.Component {
    constructor(props)
    {
        super(props);
        let elements = [
            {'type': 'p', 'content': 'Hello World! This is a test paragraph.'},
            {'type': 'p', 'content': 'This is test paragraph 2.'}
        ];
        this.state = {elements: elements};

        this.addNewElementToDocument = this.addNewElementToDocument.bind(this);
    }

    addNewElementToDocument(event)
    {
        this.setState( (state, props) => {
            let elements = this.state.elements;
            elements.push({type: 'p'});
            return { elements: elements };
        })
    }
    render()
    {
        return (
            <div id="editor" className="container-fluid px-0">
                <div className="offset-1 col-11 bg-white shadow w-100 vh-100 px-3 pt-2 border rounded" >
                    <div className="container">
                        <DocTitle sectionTitle={workspaceSection}> {documentLoadedTitle} </DocTitle>
                        <DocumentPage documentChildren={this.state.elements}/>
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