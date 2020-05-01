class SidebarLink extends React.Component {
    constructor(props)
    {
        super(props);
        this.activeStyle = {
            backgroundColor: '#DFE0E1'
        }
        this.onClick = this.onClick.bind(this);
    }

    onClick()
    {
        if(this.props.onNavLinkClicked)
        {
            const event = {documentClicked: this.props.documentTitle}
            this.props.onNavLinkClicked(event);
        }
    }

    render()
    {
        return (
            <a onClick={this.onClick} href="#"
               style={this.props.active ? this.activeStyle : {}} className={'nav-item nav-link rounded text-dark'}>
                {this.props.documentTitle}
            </a>
        )
    }
}

module.exports = SidebarLink;