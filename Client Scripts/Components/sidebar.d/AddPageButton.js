class AddPageButton extends React.Component {
    constructor(props)
    {
        super(props);
        this.onNewPageClicked = this.onNewPageClicked.bind(this);
    }

    onNewPageClicked()
    {
        if (this.props.onNewPageClicked)
        {
            this.props.onNewPageClicked();
        }
    }

    render()
    {
        return (
            <a onClick={this.onNewPageClicked} className="btn w-50 text-muted text-right" style={{fontSize: '0.75em'}}>Add New Page</a>
        )
    }
}

module.exports = AddPageButton;