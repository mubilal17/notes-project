class EditElementButton extends React.Component {
    constructor(props)
    {
        super(props);
        this.onEditElementClicked = this.onEditElementClicked.bind(this);
    }

    componentDidMount()
    {
        console.log();
        $('#' + this.props.id).popover({
            title: 'title',
            content: 'testing body does it work',
            container: 'body',
            placement: 'top',
            trigger: 'focus'
        });
    }

    onEditElementClicked(event)
    {
    }

    render()
    {
        return (
            <button id={this.props.id} type="button" className="btn invisible p-0 mt-3 align-bottom"
                  onClick={this.onEditElementClicked}  >
                    <span className="material-icons">edit</span>
            </button>
        )
    }
}

module.exports = EditElementButton;