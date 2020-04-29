const Editor = require('./editor.d/editor.js');
const Sidebar = require('./sidebar.d/sidebar');


ReactDOM.render(<Sidebar />, document.getElementById('sidebar-wrapper'));
ReactDOM.render(<Editor />, document.getElementById('editor-wrapper'));