const Title = require('./editor-elements/Title.js');
const Page = require('./editor-elements/PageView.js');

class Editor extends React.Component {
    constructor(props)
    {
        super(props);
    }


    render()
    {
        let page = this.props.page;
        return (
            <div id="editor" className="container bg-white shadow w-100 vh-100 px-3 pt-2 border rounded">
                {this.props.children}
            </div>
        )
    }
}

module.exports = Editor;