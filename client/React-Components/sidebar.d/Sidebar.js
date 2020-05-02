
const SectionNav = require('./SectionNav');

let workspaceTitle = "Mathematics";

let dashboardBtnId = "dashboard-btn";
let settingsBtnId = "settings-btn";

class Sidebar extends React.Component {

    constructor(props)
    {
        super(props);
        this.onPageLinkClicked = this.onPageLinkClicked.bind(this);
    }

    componentDidMount()
    {
        const hoverClasses = 'shadow-sm bg-white rounded'
        var dashboardBtn = $('#' + dashboardBtnId);
        dashboardBtn.hover(() => dashboardBtn.addClass(hoverClasses), () => dashboardBtn.removeClass(hoverClasses));
    }

    onPageLinkClicked(event)
    {
        if (this.props.onPageLinkClicked)
            this.props.onPageLinkClicked(event);
    }

    getSectionNavs(section)
    {
        const sectionName = section.sectionName;
        return <SectionNav key={sectionName}
                           sectionName={sectionName} documents={section.documents} onPageLinkClicked={this.onPageLinkClicked}
                           documentActiveId={this.props.documentActiveId}/>
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
                    {this.props.sections.map( section => this.getSectionNavs(section))}
                </div>
            </div>
        )
    }
}

module.exports = Sidebar;