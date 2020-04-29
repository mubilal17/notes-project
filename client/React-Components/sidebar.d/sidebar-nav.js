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
    }

    render()
    {
        return (
            <div className="mt-5" style={ {'lineHeight': '0.5em'}}>
                {this.title}
                <nav className="nav  flex-column px-1 mt-3" style={ {'lineHeight': '1em'}}>
                    <SidebarLink> Overview </SidebarLink>
                    <SidebarLink active={this.props.active ? true : false}> Terminology </SidebarLink>
                    <SidebarLink> Exercises </SidebarLink>
                </nav>
            </div>
        )
    }
}

module.exports = SidebarNav;