
const SidebarNav = require('./sidebar-nav');

let workspaceTitle = "Mathematics";

let dashboardBtnId = "dashboard-btn";
let settingsBtnId = "settings-btn";

class Sidebar extends React.Component {

    constructor(props)
    {
        super(props);
        this.onNavLinkClicked = this.onNavLinkClicked.bind(this);
    }

    componentDidMount()
    {
        const hoverClasses = 'shadow-sm bg-white rounded'
        var dashboardBtn = $('#' + dashboardBtnId);
        dashboardBtn.hover(() => dashboardBtn.addClass(hoverClasses), () => dashboardBtn.removeClass(hoverClasses));
    }

    onNavLinkClicked(event)
    {

        console.log('clicked ' + event.documentSection + ' / ' + event.documentClicked);
        if (this.props.onNavLinkClicked)
            this.props.onNavLinkClicked(event);
    }

    render()
    {
        return (
            <div className="bg-light m-0  h-100 w-100 border-right  shadow-sm">
                <div>
                    <button id={dashboardBtnId} className="btn float-left p-auto mt-1">
                        <span className="material-icons align-bottom">apps</span>
                        Dashboard
                    </button>
                    <button id={settingsBtnId} className="btn btn-light border-0 rounded-circle float-right p-auto">
                        <span className="material-icons align-middle py-1">settings</span>
                    </button>
                    <br />
                </div>
                <p className="text-center mt-5 display-4" style={ {fontSize: '1.5em'}}> {workspaceTitle} </p>
                <hr />

                <div className="px-3">
                    <SidebarNav sectionTitle="Calculus"  active={true} onNavLinkClicked={this.onNavLinkClicked}/>
                    <SidebarNav sectionTitle="Differential Equations" onNavLinkClicked={this.onNavLinkClicked}/>
                    <SidebarNav sectionTitle="Linear Algebra" onNavLinkClicked={this.onNavLinkClicked}/>
                </div>
            </div>
        )
    }
}

module.exports = Sidebar;