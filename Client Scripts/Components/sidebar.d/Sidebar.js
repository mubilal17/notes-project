import * as React from "react";
import {cssObjectToString} from "../utilities";

const SectionNav = require('./SectionNav');
const SidebarMenu = require('./SidebarMenu');
const SidebarTitle = require('./SidebarTitle');

let workspaceTitle = "Mathematics";

const SidebarCSS = {
    sidebar: {
        bgColor: 'bg-light',
        height: 'h-100',
        width: 'w-100',
        margins: 'm-0',
        shadow: 'shadow-sm',
        border: 'border-right'
    },
    title: {
        textAlignment: 'text-center',
        textDisplay: 'display-4',
        margins: 'mt-5',
    }
}


class Sidebar extends React.Component {

    constructor(props)
    {
        super(props);

        this.sidebarClasses = cssObjectToString(SidebarCSS.sidebar);
        this.sidebarTitleClasses = cssObjectToString(SidebarCSS.title);

    }


    getSectionNavs(section)
    {
        let active = this.props.activeSectionId == section.id;
        let activePageId = this.props.activePageId;
        return <SectionNav key={section.id + section.title} section={section} onPageLinkClicked={this.props.onPageLinkClicked}
                           onNewPageClicked={this.props.onNewPageClicked} active={active} activePageId={activePageId} />
    }

    render()
    {
        return (
            <div className={this.sidebarClasses}>
                <SidebarMenu />
                <SidebarTitle className={this.sidebarTitleClasses}>{workspaceTitle}</SidebarTitle>
                <div className="px-3">
                    {this.props.children.map(section => this.getSectionNavs(section))}
                </div>
            </div>
        )
    }
}

module.exports = Sidebar;