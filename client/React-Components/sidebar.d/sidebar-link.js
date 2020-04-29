class SidebarLink extends React.Component {
    constructor(props)
    {
        super(props);
        this.activeStyle = {
            backgroundColor: '#DFE0E1'
        }
    }

    render()
    {
        if (this.props.active)
            return <a style={this.activeStyle} className={'nav-item nav-link rounded text-dark'} href="#"> {this.props.children} </a>
        else
            return <a className="nav-item nav-link text-dark" href="#" > {this.props.children}</a>

    }
}

module.exports = SidebarLink;