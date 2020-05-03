

class Title extends React.Component {
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return (
            <header className="mt-5 px-3 py-3 pb-1  display-4" style={ {fontSize: '25px'}} >
                <span className="text-muted">{this.props.sectionTitle} / </span>
                <span className="" contentEditable suppressContentEditableWarning> {this.props.children} </span>
                <hr />
            </header>
        )
    }
}

module.exports = Title;