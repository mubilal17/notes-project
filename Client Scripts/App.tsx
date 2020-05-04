import * as React from 'react';
import * as ReactDOM from 'react-dom';
const Editor = require('./Components/editor.d/Editor.js');
const Sidebar = require('./Components/sidebar.d/Sidebar');
const PageLink = require('./Components/sidebar.d/PageLink');
const SectionNav = require('./Components/sidebar.d/SectionNav');
import {WorkspaceAPI} from "./Data/WorkspaceAPI";

const Title = require('./Components/editor.d/editor-elements/Title');
const PageView = require('./Components/editor.d/editor-elements/PageView');

const repository = new WorkspaceAPI();

type AppState = {focusedSection, focusedPage, sections, loaded: boolean};

class App extends React.Component<{}, AppState>
{
    constructor(props)
    {
        super(props);
        this.state = {focusedSection: null, focusedPage: null, sections: null, loaded: false};
        repository.getSections().then( sections => {
            this.setState({focusedSection: sections[0], focusedPage: sections[0].pages[0], sections: sections, loaded: true});
        });
        this.onPageLinkClicked = this.onPageLinkClicked.bind(this);
        this.updatePage = this.updatePage.bind(this);

    }

    onPageLinkClicked(event)
    {
        const pageClickedId = event.pageClicked.id;
        const sectionClicked = event.sectionClicked;
        this.setState({focusedSection: sectionClicked, focusedPage: repository.getPage(sectionClicked.id, pageClickedId)});
    }

    updatePage(pageUpdateEvent)
    {
        if(pageUpdateEvent.type == 'elementContentModified')
        {
            let page = repository.getPage(this.state.focusedSection.id, this.state.focusedPage.id);
            page.updateElement(pageUpdateEvent.elementId, pageUpdateEvent.content);
            this.setState({focusedPage: page});
            console.log(this.state.focusedPage);
        }
        if(pageUpdateEvent.type == 'elementCreated')
        {
            let page = repository.getPage(this.state.focusedSection.id, this.state.focusedPage.id);
            page.addElement(pageUpdateEvent.element);
            this.setState({focusedPage: page});
        }
    }

    render()
    {
        if (this.state.loaded == false)
            return <div></div>;
        return (
            <div id="main" className="container-fluid p-0 m-0 h-100 w-100">
                <div className="row p-0 m-0 h-100 w-100">
                    <div id="sidebar-wrapper" className="col-2 p-0 m-0 h-100 w-100">
                        <Sidebar activeSectionId={this.state.focusedSection.id} activePageId={this.state.focusedPage.id}
                                 onPageLinkClicked={this.onPageLinkClicked}>
                            {this.state.sections}
                        </Sidebar>
                    </div>
                    <div className="offset-col-1 col-10 p-0 m-0 h-100 w-100">

                        <div id="editor-wrapper" className="container-fluid border-top-0 m-0 p-0 h-100 w-100">
                            <Editor>
                                <Title sectionTitle={this.state.focusedSection.title}>{this.state.focusedPage.title}</Title>
                                <PageView  onPageChange={this.updatePage}>
                                    {this.state.focusedPage}
                                </PageView>
                            </Editor>
                        </div>

                    </div>

                </div>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('main-page'));