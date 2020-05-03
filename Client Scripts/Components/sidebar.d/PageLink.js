class PageLink extends React.Component {
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
        let page = this.props.page;
        if(this.props.onPageLinkClicked)
        {
            const event = {sectionClickedId: this.props.sectionId, pageClicked: {id: page.id, title: page.title}}
            this.props.onPageLinkClicked(event);
        }
    }

    render()
    {
        let page = this.props.page;
        return (
            <a onClick={this.onClick} href="#"
               style={this.props.active ? this.activeStyle : {}} className={'nav-item nav-link rounded text-dark'}>
                {page.title}
            </a>
        )
    }
}

module.exports = PageLink;