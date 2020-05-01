const Editor = require('./editor.d/editor.js');
const Sidebar = require('./sidebar.d/sidebar');
const DocumentData = require('./DocumentData');



let workspace = "Calculus";
let title = "Terminology";
let elements = [
    {'type': 'p', 'content': 'Hello World! This is a test paragraph.'},
    {'type': 'p', 'content': 'This is test paragraph 2.'}
];

let userDocument = new DocumentData(1, workspace, title, elements);

function updateDocument(documentUpdateEvent)
{
    if(documentUpdateEvent.type == 'element')
    {
        userDocument.updateElement(documentUpdateEvent.elementId, documentUpdateEvent.value);
    }
}

ReactDOM.render(<Sidebar />, document.getElementById('sidebar-wrapper'));
ReactDOM.render(<Editor document={userDocument} onDocumentChange={updateDocument} />, document.getElementById('editor-wrapper'));