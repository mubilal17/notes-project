const PageLink = require('./PageLink.js');

class SectionNav extends React.Component {
    constructor(props)
    {
        super(props);
        this.title =
            <a className={"lead text-decoration-none " + (this.props.activeSection ? "text-dark" : "text-black-50")} href="#">
                {this.props.sectionTitle}
                { this.props.activeSection ? <span className="material-icons text-success float-right" style={{fontSize: '1em'}}>sync_alt</span> : "" }
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
        return this.props.pages.map(page => {
            let active = false;
            if (this.props.activeSection && page.id == this.props.activePageId)
                active = true;
            return <PageLink key={page.title}
                                onPageLinkClicked={this.onPageLinkClicked} sectionId={this.props.sectionId} page={page}
                                active={active}/>
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