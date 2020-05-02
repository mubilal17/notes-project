const Editor = require('./editor.d/editor.js');
const Sidebar = require('./sidebar.d/sidebar');
const volatileRepository = require('./volatile-repository');
console.log(volatileRepository);
class Page extends React.Component
{
    constructor(props)
    {
        super(props);

        const focusedDocument = volatileRepository.docs[0];
        const sections = volatileRepository.getSections();

        this.state = {focusedDocument: focusedDocument, sections: sections}

        this.onNavLinkClicked = this.onNavLinkClicked.bind(this);
        this.updateDocument = this.updateDocument.bind(this);

    }

    onNavLinkClicked(event)
    {
        const documentClickedId = event.documentClicked.id;
        console.log(volatileRepository.docs[documentClickedId]);
        this.setState({focusedDocument: volatileRepository.docs[documentClickedId]});
    }

    updateDocument(documentUpdateEvent)
    {
        if(documentUpdateEvent.type == 'element')
        {
            let doc = volatileRepository.docs[documentUpdateEvent.elementId];
            doc.updateElement(documentUpdateEvent.elementId, documentUpdateEvent.value);
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
                                 onNavLinkClicked={this.onNavLinkClicked}/>
                    </div>
                    <div className="col-10 p-0 m-0 h-100 w-100">
                        <div id="navbar-wrapper"></div>

                        <div id="editor-wrapper" className=" border-top-0 m-0 p-0 h-100 w-100">
                            <Editor document={this.state.focusedDocument} onDocumentChange={this.updateDocument} />
                        </div>

                    </div>

                </div>
            </div>
        )
    }
}

ReactDOM.render(<Page />, document.getElementById('main-page'))