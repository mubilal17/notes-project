const PageLink = require('./PageLink.js');

class SectionNav extends React.Component {
    constructor(props)
    {
        super(props);
        this.onPageLinkClicked = this.onPageLinkClicked.bind(this);
    }

    onPageLinkClicked(event)
    {
        if (this.props.onPageLinkClicked)
        {
            event.sectionClicked = this.props.section;
            this.props.onPageLinkClicked(event);
        }
    }

    getPageLink(page)
    {
        const section = this.props.section;
        const activeLink = this.props.active && this.props.activePageId == page.id;
        return <PageLink key={page.id + page.title}
                         onPageLinkClicked={this.onPageLinkClicked} sectionId={section.id} page={page}
                         active={activeLink}>{page.title}</PageLink>
    }

    render()
    {
        return (
            <div className="mt-5" style={ {'lineHeight': '0.5em'}}>
                <a className={"lead text-decoration-none " + (this.props.active ? "text-dark" : "text-black-50")} href="#">
                    {this.props.section.title}
                </a>
                <nav className="nav  flex-column px-1 mt-3" style={ {'lineHeight': '1em'}}>
                    {this.props.section.pages.map(page => this.getPageLink(page))}
                </nav>
            </div>
        )
    }
}

module.exports = SectionNav;