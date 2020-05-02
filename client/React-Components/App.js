const Editor = require('./editor.d/Editor.js');
const Sidebar = require('./sidebar.d/Sidebar');
const volatileRepository = require('./Data/volatile-repository');
console.log(volatileRepository);
class App extends React.Component
{
    constructor(props)
    {
        super(props);

        const focusedDocument = volatileRepository.docs[0];
        const sections = volatileRepository.getSections();

        this.state = {focusedDocument: focusedDocument, sections: sections}

        this.onPageLinkClicked = this.onPageLinkClicked.bind(this);
        this.updateDocument = this.updateDocument.bind(this);

    }

    onPageLinkClicked(event)
    {
        const documentClickedId = event.documentClicked.id;
        this.setState({focusedDocument: volatileRepository.docs[documentClickedId]});
    }

    updateDocument(documentUpdateEvent)
    {
        if(documentUpdateEvent.type == 'element')
        {
            let doc = volatileRepository.docs[documentUpdateEvent.documentId];
            doc.updateElement(documentUpdateEvent.elementId, documentUpdateEvent.value);
            this.setState({focusedDocument: doc});
        }
        if(documentUpdateEvent.type == 'elementCreated')
        {
            let doc = volatileRepository.docs[documentUpdateEvent.documentId];
            doc.addElement(documentUpdateEvent.element);
            this.setState({focusedDocument: doc});
        }
    }

    render()
    {
        return (
            <div id="main" className="container-fluid p-0 m-0 h-100 w-100">
                <div className="row p-0 m-0 h-100 w-100">
                    <div id="sidebar-wrapper" className="col-2 p-0 m-0 h-100 w-100">
                        <Sidebar sections={this.state.sections} documentActiveId={this.state.focusedDocument.id}
                                 onPageLinkClicked={this.onPageLinkClicked}/>
                    </div>
                    <div className="offset-col-1 col-10 p-0 m-0 h-100 w-100">

                        <div id="editor-wrapper" className="container-fluid border-top-0 m-0 p-0 h-100 w-100">
                            <Editor document={this.state.focusedDocument} onDocumentChange={this.updateDocument} />
                        </div>

                    </div>

                </div>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('main-page'))