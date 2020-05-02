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
        let document = this.props.document;
        if(this.props.onNavLinkClicked)
        {
            const event = {documentClicked: {id: document.id, title: document.title, section: document.section}}
            this.props.onNavLinkClicked(event);
        }
    }

    render()
    {
        let document = this.props.document;
        return (
            <a onClick={this.onClick} href="#"
               style={this.props.documentActiveId == document.id ? this.activeStyle : {}} className={'nav-item nav-link rounded text-dark'}>
                {document.title}
            </a>
        )
    }
}

module.exports = SidebarLink;