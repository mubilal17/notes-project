const SidebarLink = require('./sidebar-link.js');

class SidebarNav extends React.Component {
    constructor(props)
    {
        super(props);
        this.title =
            <a className={"lead text-decoration-none " + (this.props.active ? "text-dark" : "text-black-50")} href="#">
                {this.props.sectionTitle}
                { this.props.active ? <span className="material-icons text-success float-right" style={{fontSize: '1em'}}>sync_alt</span> : "" }
            </a>
        this.onNavLinkClicked = this.onNavLinkClicked.bind(this);
    }

    onNavLinkClicked(event)
    {
        if (this.props.onNavLinkClicked)
        {
            event.documentSection = this.props.sectionTitle;
            this.props.onNavLinkClicked(event);
        }
    }

    render()
    {
        return (
            <div className="mt-5" style={ {'lineHeight': '0.5em'}}>
                {this.title}
                <nav className="nav  flex-column px-1 mt-3" style={ {'lineHeight': '1em'}}>
                    <SidebarLink onNavLinkClicked={this.onNavLinkClicked} documentTitle={'Overview'} />
                    <SidebarLink onNavLinkClicked={this.onNavLinkClicked} documentTitle={'Terminology'} active={this.props.active ? true : false} />
                    <SidebarLink onNavLinkClicked={this.onNavLinkClicked} documentTitle={'Exercises'} />
                </nav>
            </div>
        )
    }
}

module.exports = SidebarNav;