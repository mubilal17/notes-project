const SidebarLink = require('./PageLink.js');

class SectionNav extends React.Component {
    constructor(props)
    {
        super(props);
        this.title =
            <a className={"lead text-decoration-none " + (this.props.active ? "text-dark" : "text-black-50")} href="#">
                {this.props.sectionName}
                { this.props.active ? <span className="material-icons text-success float-right" style={{fontSize: '1em'}}>sync_alt</span> : "" }
            </a>
        this.onPageLinkClicked = this.onPageLinkClicked.bind(this);
    }

    onPageLinkClicked(event)
    {
        if (this.props.onPageLinkClicked)
        {
            this.props.onPageLinkClicked(event);
        }
    }

    getSidebarLinks()
    {
        return this.props.documents.map(document => {
            return <SidebarLink key={document.title}
                                onPageLinkClicked={this.onPageLinkClicked} document={document}
                                documentActiveId={this.props.documentActiveId }/>
        });
    }

    render()
    {
        return (
            <div className="mt-5" style={ {'lineHeight': '0.5em'}}>
                {this.title}
                <nav className="nav  flex-column px-1 mt-3" style={ {'lineHeight': '1em'}}>
                    {this.getSidebarLinks()}
                </nav>
            </div>
        )
    }
}

module.exports = SectionNav;