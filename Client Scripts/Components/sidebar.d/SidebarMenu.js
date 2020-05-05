import * as React from "react";

class SidebarMenu extends React.Component
{
    constructor(props)
    {
        super(props);
        this.dashboardBtnId = 'dashboardBtn';
        this.settingsBtnId = 'settingsBtn';

    }


    componentDidMount()
    {
        const hoverClasses = 'shadow-sm bg-white rounded'
        var dashboardBtn = $('#' + this.dashboardBtnId);
        dashboardBtn.hover(() => dashboardBtn.addClass(hoverClasses), () => dashboardBtn.removeClass(hoverClasses));
    }

    render()
    {
        return (
            <div>
                <button id={this.dashboardBtnId} className="btn float-left p-auto mt-1">
                    <span className="material-icons align-bottom">apps</span>
                    Dashboard
                </button>
                <button id={this.settingsBtnId} className="btn btn-light border-0 rounded-circle float-right p-auto">
                    <span className="material-icons align-middle py-1">settings</span>
                </button>
                <br />
            </div>
        )
    }
}

module.exports = SidebarMenu;