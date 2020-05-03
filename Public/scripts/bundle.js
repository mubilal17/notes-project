(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const Editor = require('./Components/editor.d/Editor.js');

const Sidebar = require('./Components/sidebar.d/Sidebar');

const WorkspaceAPI = require('./Data/WorkspaceAPI');

const repository = new WorkspaceAPI();

class App extends React.Component {
  constructor(props) {
    super(props);
    /*
    const focusedPage = repository.docs[0];
    const sections = repository.getSections();
    this.state = {focusedPage: focusedPage, sections: sections}
     */

    this.state = {
      focusedSection: null,
      focusedPage: null,
      sections: null,
      loaded: false
    };
    repository.getSections().then(sections => {
      this.setState({
        focusedSection: sections[0],
        focusedPage: sections[0].pages[0],
        sections: sections,
        loaded: true
      });
    });
    this.onPageLinkClicked = this.onPageLinkClicked.bind(this);
    this.updatePage = this.updatePage.bind(this);
  }

  onPageLinkClicked(event) {
    const pageClickedId = event.pageClicked.id;
    const sectionClicked = event.sectionClicked;
    this.setState({
      focusedSection: sectionClicked,
      focusedPage: repository.getPage(sectionClicked.id, pageClickedId)
    });
  }

  updatePage(pageUpdateEvent) {
    if (pageUpdateEvent.type == 'element') {
      let page = repository.getPage(this.state.focusedSection.id, this.state.focusedPage.id);
      page.updateElement(pageUpdateEvent.elementId, pageUpdateEvent.value);
      this.setState({
        focusedPage: page
      });
    }

    if (pageUpdateEvent.type == 'elementCreated') {
      let page = repository.getPage(this.state.focusedSection.id, this.state.focusedPage.id);
      page.addElement(pageUpdateEvent.element);
      this.setState({
        focusedPage: page
      });
    }
  }

  render() {
    if (this.state.loaded == false) return /*#__PURE__*/React.createElement("div", null);
    return /*#__PURE__*/React.createElement("div", {
      id: "main",
      className: "container-fluid p-0 m-0 h-100 w-100"
    }, /*#__PURE__*/React.createElement("div", {
      className: "row p-0 m-0 h-100 w-100"
    }, /*#__PURE__*/React.createElement("div", {
      id: "sidebar-wrapper",
      className: "col-2 p-0 m-0 h-100 w-100"
    }, /*#__PURE__*/React.createElement(Sidebar, {
      sections: this.state.sections,
      activeSectionId: this.state.focusedSection.id,
      activePageId: this.state.focusedPage.id,
      onPageLinkClicked: this.onPageLinkClicked
    })), /*#__PURE__*/React.createElement("div", {
      className: "offset-col-1 col-10 p-0 m-0 h-100 w-100"
    }, /*#__PURE__*/React.createElement("div", {
      id: "editor-wrapper",
      className: "container-fluid border-top-0 m-0 p-0 h-100 w-100"
    }, /*#__PURE__*/React.createElement(Editor, {
      sectionTitle: this.state.focusedSection.title,
      page: this.state.focusedPage,
      onPageChange: this.updatePage
    })))));
  }

}

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById('main-page'));

},{"./Components/editor.d/Editor.js":2,"./Components/sidebar.d/Sidebar":11,"./Data/WorkspaceAPI":13}],2:[function(require,module,exports){
const Title = require('./editor-elements/Title.js');

const Page = require('./editor-elements/Page.js');

const AddNewElement = require('./editor-elements/AddElementButton');

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      document: this.props.page
    };
    this.updateContent = this.updateContent.bind(this);
    this.addNewElementToPage = this.addNewElementToPage.bind(this);
  }

  updateContent(event) {
    if (this.props.onPageChange) {
      const elementId = event.elementId;
      const pageUpdateEvent = {
        type: 'element',
        elementId: elementId,
        value: event.content
      };
      this.props.onPageChange(pageUpdateEvent);
    }
  }

  addNewElementToPage(event) {
    const pageUpdateEvent = {
      type: 'elementCreated',
      element: {
        type: 'p',
        content: ''
      }
    };
    this.props.onPageChange(pageUpdateEvent);
  }

  render() {
    let page = this.props.page;
    return /*#__PURE__*/React.createElement("div", {
      id: "editor",
      className: "container bg-white shadow w-100 vh-100 px-3 pt-2 border rounded"
    }, /*#__PURE__*/React.createElement(Title, {
      sectionTitle: this.props.sectionTitle
    }, " ", page.title, " "), /*#__PURE__*/React.createElement(Page, {
      onElementModified: this.updateContent
    }, page), /*#__PURE__*/React.createElement(AddNewElement, {
      onElementClicked: this.addNewElementToPage
    }, "Add New Element"));
  }

}

module.exports = Editor;

},{"./editor-elements/AddElementButton":3,"./editor-elements/Page.js":7,"./editor-elements/Title.js":8}],3:[function(require,module,exports){
class AddElementButton extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("button", {
      className: "btn btn-sm btn-outline-light text-muted border-0 ml-5",
      href: "#",
      onClick: this.props.onElementClicked
    }, /*#__PURE__*/React.createElement("span", {
      className: "material-icons align-middle py-1"
    }, "vertical_align_top"), this.props.children);
  }

}

module.exports = AddElementButton;

},{}],4:[function(require,module,exports){
class DragButton extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let element = $('#' + this.props.id);
    element.parent().on('mouseenter', () => {
      element.removeClass('invisible').addClass('visible');
    });
    element.parent().on('mouseleave', () => {
      element.removeClass('visible').addClass('invisible');
    });
  }

  render() {
    return /*#__PURE__*/React.createElement("button", {
      id: this.props.id,
      type: "button",
      style: {
        cursor: 'move'
      },
      draggable: true,
      className: "btn invisible p-0 mt-3 align-bottom"
    }, /*#__PURE__*/React.createElement("span", {
      className: "material-icons"
    }, "drag_handle"));
  }

}

module.exports = DragButton;

},{}],5:[function(require,module,exports){
class EditElementButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
  }

  componentDidMount() {
    let element = $('#' + this.props.id);
    console.log(element);
    element.parent().on('mouseenter', () => {
      element.removeClass('invisible').addClass('visible');
    });
    element.parent().on('mouseleave', () => {
      if (!this.state.active) element.removeClass('visible').addClass('invisible');
    });
    element.on('focus', () => this.setState({
      active: true
    }));
    element.on('blur', () => this.setState({
      active: false
    }));
    $('#' + this.props.id).popover({
      title: 'Edit Element',
      content: 'testing body does it work',
      container: 'body',
      placement: 'top',
      trigger: 'focus'
    });
  }

  render() {
    return /*#__PURE__*/React.createElement("button", {
      id: this.props.id,
      type: "button",
      className: "btn invisible p-0 mt-3 align-bottom"
    }, /*#__PURE__*/React.createElement("span", {
      className: "material-icons"
    }, "edit"));
  }

}

module.exports = EditElementButton;

},{}],6:[function(require,module,exports){
const EditElementButton = require('./EditElementButton');

const DragButton = require('./DragButton');

const pStyle = {
  fontSize: '1.25em'
};
const hStyle = {
  fontWeight: 'bold',
  fontSize: '1.75em'
};

class Element extends React.Component {
  constructor(props) {
    super(props);
    this.dragButtonId = this.props.id + 'dragButton';
    this.editElementId = this.props.id + 'editElement';
    let style = {};
    Object.assign(style, pStyle);
    if (this.props.type == 'h') Object.assign(style, hStyle);
    this.style = style;
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(event) {
    console.log(this.props);

    if (this.props.onContentChange) {
      const eventData = {
        elementId: this.props.elementId,
        content: event.target.value
      };
      this.props.onContentChange(eventData);
    }
  }

  render() {
    let type = "text";
    let className = "form-control ml-2 my-2 border-0";
    let style = this.style;
    let placeholder = "Content goes here...";
    return /*#__PURE__*/React.createElement("div", {
      className: "input-group flex-nowrap",
      onMouseEnter: this.onElementHover,
      onMouseLeave: this.onElementHover
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(DragButton, {
      id: this.dragButtonId
    }), /*#__PURE__*/React.createElement(EditElementButton, {
      id: this.editElementId
    })), /*#__PURE__*/React.createElement("input", {
      type: type,
      value: this.props.content,
      placeholder: placeholder,
      onChange: this.onInputChange,
      className: className,
      style: style
    }));
  }

}

module.exports = Element;

},{"./DragButton":4,"./EditElementButton":5}],7:[function(require,module,exports){
const Element = require('./Element');

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.pageId = this.props.children.id;
  }

  getElementView(element) {
    const key = `doc${this.pageId}elem${element.id}`;
    return /*#__PURE__*/React.createElement(Element, {
      id: key,
      key: key,
      elementId: element.id,
      type: element.type,
      content: element.content,
      onContentChange: this.props.onElementModified
    });
  }

  render() {
    let page = this.props.children;
    let elementMarkup = page.elements.map(element => this.getElementView(element));
    return /*#__PURE__*/React.createElement("div", {
      className: "mt-5"
    }, elementMarkup);
  }

}

module.exports = Page;

},{"./Element":6}],8:[function(require,module,exports){
class Title extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return /*#__PURE__*/React.createElement("header", {
      className: "mt-5 px-3 py-3 pb-1  display-4",
      style: {
        fontSize: '25px'
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-muted"
    }, this.props.sectionTitle, " / "), /*#__PURE__*/React.createElement("span", {
      className: "",
      contentEditable: true,
      suppressContentEditableWarning: true
    }, " ", this.props.children, " "), /*#__PURE__*/React.createElement("hr", null));
  }

}

module.exports = Title;

},{}],9:[function(require,module,exports){
class PageLink extends React.Component {
  constructor(props) {
    super(props);
    this.activeStyle = {
      backgroundColor: '#DFE0E1'
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    let page = this.props.page;

    if (this.props.onPageLinkClicked) {
      const event = {
        sectionClickedId: this.props.sectionId,
        pageClicked: {
          id: page.id,
          title: page.title
        }
      };
      this.props.onPageLinkClicked(event);
    }
  }

  render() {
    let page = this.props.page;
    return /*#__PURE__*/React.createElement("a", {
      onClick: this.onClick,
      href: "#",
      style: this.props.active ? this.activeStyle : {},
      className: 'nav-item nav-link rounded text-dark'
    }, page.title);
  }

}

module.exports = PageLink;

},{}],10:[function(require,module,exports){
const PageLink = require('./PageLink.js');

class SectionNav extends React.Component {
  constructor(props) {
    super(props);
    this.title = /*#__PURE__*/React.createElement("a", {
      className: "lead text-decoration-none " + (this.props.activeSection ? "text-dark" : "text-black-50"),
      href: "#"
    }, this.props.sectionTitle, this.props.activeSection ? /*#__PURE__*/React.createElement("span", {
      className: "material-icons text-success float-right",
      style: {
        fontSize: '1em'
      }
    }, "sync_alt") : "");
    this.onPageLinkClicked = this.onPageLinkClicked.bind(this);
  }

  onPageLinkClicked(event) {
    if (this.props.onPageLinkClicked) {
      this.props.onPageLinkClicked(event);
    }
  }

  getSidebarLinks() {
    return this.props.pages.map(page => {
      let active = false;
      if (this.props.activeSection && page.id == this.props.activePageId) active = true;
      return /*#__PURE__*/React.createElement(PageLink, {
        key: page.title,
        onPageLinkClicked: this.onPageLinkClicked,
        sectionId: this.props.sectionId,
        page: page,
        active: active
      });
    });
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "mt-5",
      style: {
        'lineHeight': '0.5em'
      }
    }, this.title, /*#__PURE__*/React.createElement("nav", {
      className: "nav  flex-column px-1 mt-3",
      style: {
        'lineHeight': '1em'
      }
    }, this.getSidebarLinks()));
  }

}

module.exports = SectionNav;

},{"./PageLink.js":9}],11:[function(require,module,exports){
const SectionNav = require('./SectionNav');

let workspaceTitle = "Mathematics";
let dashboardBtnId = "dashboard-btn";
let settingsBtnId = "settings-btn";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.onPageLinkClicked = this.onPageLinkClicked.bind(this);
  }

  componentDidMount() {
    const hoverClasses = 'shadow-sm bg-white rounded';
    var dashboardBtn = $('#' + dashboardBtnId);
    dashboardBtn.hover(() => dashboardBtn.addClass(hoverClasses), () => dashboardBtn.removeClass(hoverClasses));
  }

  onPageLinkClicked(event) {
    if (this.props.onPageLinkClicked) {
      let sectionClicked = this.props.sections.find(section => section.id == event.sectionClickedId);
      event.sectionClicked = sectionClicked;
      this.props.onPageLinkClicked(event);
    }
  }

  getSectionNavs(section) {
    const sectionTitle = section.title;
    let activeSection = false;
    if (section.id == this.props.activeSectionId) activeSection = true;
    return /*#__PURE__*/React.createElement(SectionNav, {
      key: sectionTitle,
      sectionTitle: sectionTitle,
      sectionId: section.id,
      activeSection: activeSection,
      pages: section.pages,
      onPageLinkClicked: this.onPageLinkClicked,
      activePageId: this.props.activePageId
    });
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "bg-light m-0  h-100 w-100 border-right  shadow-sm"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
      id: dashboardBtnId,
      className: "btn float-left p-auto mt-1"
    }, /*#__PURE__*/React.createElement("span", {
      className: "material-icons align-bottom"
    }, "apps"), "Dashboard"), /*#__PURE__*/React.createElement("button", {
      id: settingsBtnId,
      className: "btn btn-light border-0 rounded-circle float-right p-auto"
    }, /*#__PURE__*/React.createElement("span", {
      className: "material-icons align-middle py-1"
    }, "settings")), /*#__PURE__*/React.createElement("br", null)), /*#__PURE__*/React.createElement("p", {
      className: "text-center mt-5 display-4",
      style: {
        fontSize: '1.5em'
      }
    }, " ", workspaceTitle, " "), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("div", {
      className: "px-3"
    }, this.props.sections.map(section => this.getSectionNavs(section))));
  }

}

module.exports = Sidebar;

},{"./SectionNav":10}],12:[function(require,module,exports){
class Page {
  constructor(id, title, elements) {
    this.id = id != null ? id : 0;
    this.title = title;
    this.elements = elements != null ? elements : [];
    let maxId = 0;
    this.elements.forEach(element => {
      if (element.id > maxId) maxId = element.id;
    });
    this.idCounter = maxId + 1; // arbitrarily chosen, for simple element id usage.
  }

  updateElement(elementId, content) {
    this.elements.find(element => element.id == elementId).content = content;
  }

  addElement(element) {
    const newId = this.idCounter++;
    const newElement = {
      type: 'p',
      id: newId,
      content: ''
    };
    this.elements.push(newElement);
  }

}

module.exports = Page;

},{}],13:[function(require,module,exports){
const Page = require('./Page');

class WorkspaceAPI {
  async getSections() {
    const data = await fetch('/workspace');
    let sections = await data.json();
    this.sections = sections;
    return sections;
  }

  getPage(sectionId, pageId) {
    let section = this.sections.find(section => section.id == sectionId);
    let page = section.pages.find(page => {
      if (page.id == pageId) return true;else return false;
    });
    return new Page(page.id, page.title, page.elements);
    ;
  }

  updatePage(sectionId, pageId, page) {
    let section = this.sections.find(section => section.id == sectionId);
    let pageIndex = section.pages.findIndex(page => page.id == pageId);
    section.pages[pageIndex] = page;
  }

}

module.exports = WorkspaceAPI;

},{"./Page":12}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJDbGllbnQgU2NyaXB0cy9BcHAuanMiLCJDbGllbnQgU2NyaXB0cy9Db21wb25lbnRzL2VkaXRvci5kL0VkaXRvci5qcyIsIkNsaWVudCBTY3JpcHRzL0NvbXBvbmVudHMvZWRpdG9yLmQvZWRpdG9yLWVsZW1lbnRzL0FkZEVsZW1lbnRCdXR0b24uanMiLCJDbGllbnQgU2NyaXB0cy9Db21wb25lbnRzL2VkaXRvci5kL2VkaXRvci1lbGVtZW50cy9EcmFnQnV0dG9uLmpzIiwiQ2xpZW50IFNjcmlwdHMvQ29tcG9uZW50cy9lZGl0b3IuZC9lZGl0b3ItZWxlbWVudHMvRWRpdEVsZW1lbnRCdXR0b24uanMiLCJDbGllbnQgU2NyaXB0cy9Db21wb25lbnRzL2VkaXRvci5kL2VkaXRvci1lbGVtZW50cy9FbGVtZW50LmpzIiwiQ2xpZW50IFNjcmlwdHMvQ29tcG9uZW50cy9lZGl0b3IuZC9lZGl0b3ItZWxlbWVudHMvUGFnZS5qcyIsIkNsaWVudCBTY3JpcHRzL0NvbXBvbmVudHMvZWRpdG9yLmQvZWRpdG9yLWVsZW1lbnRzL1RpdGxlLmpzIiwiQ2xpZW50IFNjcmlwdHMvQ29tcG9uZW50cy9zaWRlYmFyLmQvUGFnZUxpbmsuanMiLCJDbGllbnQgU2NyaXB0cy9Db21wb25lbnRzL3NpZGViYXIuZC9TZWN0aW9uTmF2LmpzIiwiQ2xpZW50IFNjcmlwdHMvQ29tcG9uZW50cy9zaWRlYmFyLmQvU2lkZWJhci5qcyIsIkNsaWVudCBTY3JpcHRzL0RhdGEvUGFnZS5qcyIsIkNsaWVudCBTY3JpcHRzL0RhdGEvV29ya3NwYWNlQVBJLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLGlDQUFELENBQXRCOztBQUNBLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxnQ0FBRCxDQUF2Qjs7QUFDQSxNQUFNLFlBQVksR0FBRyxPQUFPLENBQUMs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QUFDLEVBQVIsSUFBYyxTQUE1QyxDQUFkO0FBQ0EsUUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLEtBQVIsQ0FBYyxJQUFkLENBQW1CLElBQUksSUFBSTtBQUNsQyxVQUFJLElBQUksQ0FBQyxFQUFMLElBQVcsTUFBZixFQUNJLE9BQU8sSUFBUCxDQURKLEtBR0ksT0FBTyxLQUFQO0FBQ1AsS0FMVSxDQUFYO0FBTUEsV0FBTyxJQUFJLElBQUosQ0FBUyxJQUFJLENBQUMsRUFBZCxFQUFrQixJQUFJLENBQUMsS0FBdkIsRUFBOEIsSUFBSSxDQUFDLFFBQW5DLENBQVA7QUFBb0Q7QUFDdkQ7O0FBRUQsRUFBQSxVQUFVLENBQUMsU0FBRCxFQUFZLE1BQVosRUFBb0IsSUFBcEIsRUFDVjtBQUNJLFFBQUksT0FBTyxHQUFHLEtBQUssUUFBTCxDQUFjLElBQWQsQ0FBbUIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxFQUFSLElBQWMsU0FBNUMsQ0FBZDtBQUNBLFFBQUksU0FBUyxHQUFHLE9BQU8sQ0FBQyxLQUFSLENBQWMsU0FBZCxDQUF5QixJQUFJLElBQUksSUFBSSxDQUFDLEVBQUwsSUFBVyxNQUE1QyxDQUFoQjtBQUNBLElBQUEsT0FBTyxDQUFDLEtBQVIsQ0FBYyxTQUFkLElBQTJCLElBQTNCO0FBQ0g7O0FBekJMOztBQTRCQSxNQUFNLENBQUMsT0FBUCxHQUFpQixZQUFqQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImNvbnN0IEVkaXRvciA9IHJlcXVpcmUoJy4vQ29tcG9uZW50cy9lZGl0b3IuZC9FZGl0b3IuanMnKTtcclxuY29uc3QgU2lkZWJhciA9IHJlcXVpcmUoJy4vQ29tcG9uZW50cy9zaWRlYmFyLmQvU2lkZWJhcicpO1xyXG5jb25zdCBXb3Jrc3BhY2VBUEkgPSByZXF1aXJlKCcuL0RhdGEvV29ya3NwYWNlQVBJJyk7XHJcblxyXG5jb25zdCByZXBvc2l0b3J5ID0gbmV3IFdvcmtzcGFjZUFQSSgpO1xyXG5cclxuY2xhc3MgQXBwIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50XHJcbntcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICAvKlxyXG4gICAgICAgIGNvbnN0IGZvY3VzZWRQYWdlID0gcmVwb3NpdG9yeS5kb2NzWzBdO1xyXG4gICAgICAgIGNvbnN0IHNlY3Rpb25zID0gcmVwb3NpdG9yeS5nZXRTZWN0aW9ucygpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7Zm9jdXNlZFBhZ2U6IGZvY3VzZWRQYWdlLCBzZWN0aW9uczogc2VjdGlvbnN9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtmb2N1c2VkU2VjdGlvbjogbnVsbCwgZm9jdXNlZFBhZ2U6IG51bGwsIHNlY3Rpb25zOiBudWxsLCBsb2FkZWQ6IGZhbHNlfVxyXG4gICAgICAgIHJlcG9zaXRvcnkuZ2V0U2VjdGlvbnMoKS50aGVuKCBzZWN0aW9ucyA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2ZvY3VzZWRTZWN0aW9uOiBzZWN0aW9uc1swXSwgZm9jdXNlZFBhZ2U6IHNlY3Rpb25zWzBdLnBhZ2VzWzBdLCBzZWN0aW9uczogc2VjdGlvbnMsIGxvYWRlZDogdHJ1ZX0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMub25QYWdlTGlua0NsaWNrZWQgPSB0aGlzLm9uUGFnZUxpbmtDbGlja2VkLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVQYWdlID0gdGhpcy51cGRhdGVQYWdlLmJpbmQodGhpcyk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG9uUGFnZUxpbmtDbGlja2VkKGV2ZW50KVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IHBhZ2VDbGlja2VkSWQgPSBldmVudC5wYWdlQ2xpY2tlZC5pZDtcclxuICAgICAgICBjb25zdCBzZWN0aW9uQ2xpY2tlZCA9IGV2ZW50LnNlY3Rpb25DbGlja2VkO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2ZvY3VzZWRTZWN0aW9uOiBzZWN0aW9uQ2xpY2tlZCwgZm9jdXNlZFBhZ2U6IHJlcG9zaXRvcnkuZ2V0UGFnZShzZWN0aW9uQ2xpY2tlZC5pZCwgcGFnZUNsaWNrZWRJZCl9KTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVQYWdlKHBhZ2VVcGRhdGVFdmVudClcclxuICAgIHtcclxuICAgICAgICBpZihwYWdlVXBkYXRlRXZlbnQudHlwZSA9PSAnZWxlbWVudCcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgcGFnZSA9IHJlcG9zaXRvcnkuZ2V0UGFnZSh0aGlzLnN0YXRlLmZvY3VzZWRTZWN0aW9uLmlkLCB0aGlzLnN0YXRlLmZvY3VzZWRQYWdlLmlkKTtcclxuICAgICAgICAgICAgcGFnZS51cGRhdGVFbGVtZW50KHBhZ2VVcGRhdGVFdmVudC5lbGVtZW50SWQsIHBhZ2VVcGRhdGVFdmVudC52YWx1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2ZvY3VzZWRQYWdlOiBwYWdlfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHBhZ2VVcGRhdGVFdmVudC50eXBlID09ICdlbGVtZW50Q3JlYXRlZCcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgcGFnZSA9IHJlcG9zaXRvcnkuZ2V0UGFnZSh0aGlzLnN0YXRlLmZvY3VzZWRTZWN0aW9uLmlkLCB0aGlzLnN0YXRlLmZvY3VzZWRQYWdlLmlkKTtcclxuICAgICAgICAgICAgcGFnZS5hZGRFbGVtZW50KHBhZ2VVcGRhdGVFdmVudC5lbGVtZW50KTtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Zm9jdXNlZFBhZ2U6IHBhZ2V9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKClcclxuICAgIHtcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5sb2FkZWQgPT0gZmFsc2UpXHJcbiAgICAgICAgICAgIHJldHVybiA8ZGl2PjwvZGl2PjtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGlkPVwibWFpblwiIGNsYXNzTmFtZT1cImNvbnRhaW5lci1mbHVpZCBwLTAgbS0wIGgtMTAwIHctMTAwXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvdyBwLTAgbS0wIGgtMTAwIHctMTAwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBpZD1cInNpZGViYXItd3JhcHBlclwiIGNsYXNzTmFtZT1cImNvbC0yIHAtMCBtLTAgaC0xMDAgdy0xMDBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPFNpZGViYXIgc2VjdGlvbnM9e3RoaXMuc3RhdGUuc2VjdGlvbnN9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZVNlY3Rpb25JZD17dGhpcy5zdGF0ZS5mb2N1c2VkU2VjdGlvbi5pZH0gYWN0aXZlUGFnZUlkPXt0aGlzLnN0YXRlLmZvY3VzZWRQYWdlLmlkfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblBhZ2VMaW5rQ2xpY2tlZD17dGhpcy5vblBhZ2VMaW5rQ2xpY2tlZH0vPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2Zmc2V0LWNvbC0xIGNvbC0xMCBwLTAgbS0wIGgtMTAwIHctMTAwXCI+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGlkPVwiZWRpdG9yLXdyYXBwZXJcIiBjbGFzc05hbWU9XCJjb250YWluZXItZmx1aWQgYm9yZGVyLXRvcC0wIG0tMCBwLTAgaC0xMDAgdy0xMDBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxFZGl0b3Igc2VjdGlvblRpdGxlPXt0aGlzLnN0YXRlLmZvY3VzZWRTZWN0aW9uLnRpdGxlfSBwYWdlPXt0aGlzLnN0YXRlLmZvY3VzZWRQYWdlfSBvblBhZ2VDaGFuZ2U9e3RoaXMudXBkYXRlUGFnZX0gLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn1cclxuXHJcblJlYWN0RE9NLnJlbmRlcig8QXBwIC8+LCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFpbi1wYWdlJykpIiwiY29uc3QgVGl0bGUgPSByZXF1aXJlKCcuL2VkaXRvci1lbGVtZW50cy9UaXRsZS5qcycpO1xyXG5jb25zdCBQYWdlID0gcmVxdWlyZSgnLi9lZGl0b3ItZWxlbWVudHMvUGFnZS5qcycpO1xyXG5jb25zdCBBZGROZXdFbGVtZW50ID0gcmVxdWlyZSgnLi9lZGl0b3ItZWxlbWVudHMvQWRkRWxlbWVudEJ1dHRvbicpO1xyXG5cclxuY2xhc3MgRWRpdG9yIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge2RvY3VtZW50OiB0aGlzLnByb3BzLnBhZ2V9O1xyXG4gICAgICAgIHRoaXMudXBkYXRlQ29udGVudCA9IHRoaXMudXBkYXRlQ29udGVudC5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuYWRkTmV3RWxlbWVudFRvUGFnZSA9IHRoaXMuYWRkTmV3RWxlbWVudFRvUGFnZS5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUNvbnRlbnQoZXZlbnQpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMub25QYWdlQ2hhbmdlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc3QgZWxlbWVudElkID0gZXZlbnQuZWxlbWVudElkO1xyXG4gICAgICAgICAgICBjb25zdCBwYWdlVXBkYXRlRXZlbnQgPSB7dHlwZTogJ2VsZW1lbnQnLCBlbGVtZW50SWQ6IGVsZW1lbnRJZCwgdmFsdWU6IGV2ZW50LmNvbnRlbnR9O1xyXG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uUGFnZUNoYW5nZShwYWdlVXBkYXRlRXZlbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhZGROZXdFbGVtZW50VG9QYWdlKGV2ZW50KVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IHBhZ2VVcGRhdGVFdmVudCA9IHt0eXBlOiAnZWxlbWVudENyZWF0ZWQnLCBlbGVtZW50OiB7dHlwZTogJ3AnLCBjb250ZW50OiAnJ319XHJcbiAgICAgICAgdGhpcy5wcm9wcy5vblBhZ2VDaGFuZ2UocGFnZVVwZGF0ZUV2ZW50KTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IHBhZ2UgPSB0aGlzLnByb3BzLnBhZ2U7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBpZD1cImVkaXRvclwiIGNsYXNzTmFtZT1cImNvbnRhaW5lciBiZy13aGl0ZSBzaGFkb3cgdy0xMDAgdmgtMTAwIHB4LTMgcHQtMiBib3JkZXIgcm91bmRlZFwiPlxyXG4gICAgICAgICAgICAgICAgPFRpdGxlIHNlY3Rpb25UaXRsZT17dGhpcy5wcm9wcy5zZWN0aW9uVGl0bGV9PiB7cGFnZS50aXRsZX0gPC9UaXRsZT5cclxuICAgICAgICAgICAgICAgIDxQYWdlIG9uRWxlbWVudE1vZGlmaWVkPXt0aGlzLnVwZGF0ZUNvbnRlbnR9PlxyXG4gICAgICAgICAgICAgICAgICAgIHtwYWdlfVxyXG4gICAgICAgICAgICAgICAgPC9QYWdlPlxyXG4gICAgICAgICAgICAgICAgPEFkZE5ld0VsZW1lbnQgb25FbGVtZW50Q2xpY2tlZD17dGhpcy5hZGROZXdFbGVtZW50VG9QYWdlfT5BZGQgTmV3IEVsZW1lbnQ8L0FkZE5ld0VsZW1lbnQ+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIClcclxuICAgIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBFZGl0b3I7IiwiY2xhc3MgQWRkRWxlbWVudEJ1dHRvbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcblxyXG4gICAgcmVuZGVyKClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tc20gYnRuLW91dGxpbmUtbGlnaHQgdGV4dC1tdXRlZCBib3JkZXItMCBtbC01XCIgaHJlZj1cIiNcIiBvbkNsaWNrPXt0aGlzLnByb3BzLm9uRWxlbWVudENsaWNrZWR9PlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibWF0ZXJpYWwtaWNvbnMgYWxpZ24tbWlkZGxlIHB5LTFcIj52ZXJ0aWNhbF9hbGlnbl90b3A8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBBZGRFbGVtZW50QnV0dG9uOyIsImNsYXNzIERyYWdCdXR0b24gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50KClcclxuICAgIHtcclxuICAgICAgICBsZXQgZWxlbWVudCA9ICQoJyMnICsgdGhpcy5wcm9wcy5pZCk7XHJcbiAgICAgICAgZWxlbWVudC5wYXJlbnQoKS5vbignbW91c2VlbnRlcicsICgpID0+IHtcclxuICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVDbGFzcygnaW52aXNpYmxlJykuYWRkQ2xhc3MoJ3Zpc2libGUnKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZWxlbWVudC5wYXJlbnQoKS5vbignbW91c2VsZWF2ZScsICAoKSA9PiB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlQ2xhc3MoJ3Zpc2libGUnKS5hZGRDbGFzcygnaW52aXNpYmxlJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8YnV0dG9uIGlkPXt0aGlzLnByb3BzLmlkfSB0eXBlPVwiYnV0dG9uXCIgc3R5bGU9eyB7Y3Vyc29yOiAnbW92ZSd9fSBkcmFnZ2FibGVcclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJidG4gaW52aXNpYmxlIHAtMCBtdC0zIGFsaWduLWJvdHRvbVwiID5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm1hdGVyaWFsLWljb25zXCI+ZHJhZ19oYW5kbGU8L3NwYW4+XHJcbiAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIClcclxuICAgIH1cclxufVxyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRHJhZ0J1dHRvbjsiLCJjbGFzcyBFZGl0RWxlbWVudEJ1dHRvbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcylcclxuICAgIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHthY3RpdmU6IGZhbHNlfTtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGVsZW1lbnQgPSAkKCcjJyArIHRoaXMucHJvcHMuaWQpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVsZW1lbnQpO1xyXG4gICAgICAgIGVsZW1lbnQucGFyZW50KCkub24oJ21vdXNlZW50ZXInLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlQ2xhc3MoJ2ludmlzaWJsZScpLmFkZENsYXNzKCd2aXNpYmxlJyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGVsZW1lbnQucGFyZW50KCkub24oJ21vdXNlbGVhdmUnLCAgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuc3RhdGUuYWN0aXZlKVxyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVDbGFzcygndmlzaWJsZScpLmFkZENsYXNzKCdpbnZpc2libGUnKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBlbGVtZW50Lm9uKCdmb2N1cycsICgpID0+IHRoaXMuc2V0U3RhdGUoe2FjdGl2ZTogdHJ1ZX0pKTtcclxuICAgICAgICBlbGVtZW50Lm9uKCdibHVyJywgKCkgPT4gdGhpcy5zZXRTdGF0ZSh7YWN0aXZlOiBmYWxzZX0pKTtcclxuXHJcbiAgICAgICAgJCgnIycgKyB0aGlzLnByb3BzLmlkKS5wb3BvdmVyKHtcclxuICAgICAgICAgICAgdGl0bGU6ICdFZGl0IEVsZW1lbnQnLFxyXG4gICAgICAgICAgICBjb250ZW50OiAndGVzdGluZyBib2R5IGRvZXMgaXQgd29yaycsXHJcbiAgICAgICAgICAgIGNvbnRhaW5lcjogJ2JvZHknLFxyXG4gICAgICAgICAgICBwbGFjZW1lbnQ6ICd0b3AnLFxyXG4gICAgICAgICAgICB0cmlnZ2VyOiAnZm9jdXMnXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHJlbmRlcigpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGJ1dHRvbiBpZD17dGhpcy5wcm9wcy5pZH0gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImJ0biBpbnZpc2libGUgcC0wIG10LTMgYWxpZ24tYm90dG9tXCIgPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm1hdGVyaWFsLWljb25zXCI+ZWRpdDwvc3Bhbj5cclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEVkaXRFbGVtZW50QnV0dG9uOyIsImNvbnN0IEVkaXRFbGVtZW50QnV0dG9uID0gcmVxdWlyZSgnLi9FZGl0RWxlbWVudEJ1dHRvbicpO1xyXG5jb25zdCBEcmFnQnV0dG9uID0gcmVxdWlyZSgnLi9EcmFnQnV0dG9uJyk7XHJcblxyXG5jb25zdCBwU3R5bGUgPSB7XHJcbiAgICBmb250U2l6ZTogJzEuMjVlbSdcclxufTtcclxuXHJcbmNvbnN0IGhTdHlsZSA9IHtcclxuICAgIGZvbnRXZWlnaHQ6ICdib2xkJyxcclxuICAgIGZvbnRTaXplOiAnMS43NWVtJ1xyXG59O1xyXG5cclxuXHJcbmNsYXNzIEVsZW1lbnQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcylcclxuICAgIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5kcmFnQnV0dG9uSWQgPSB0aGlzLnByb3BzLmlkICsgJ2RyYWdCdXR0b24nXHJcbiAgICAgICAgdGhpcy5lZGl0RWxlbWVudElkID0gdGhpcy5wcm9wcy5pZCArICdlZGl0RWxlbWVudCc7XHJcbiAgICAgICAgbGV0IHN0eWxlID0ge307XHJcbiAgICAgICAgT2JqZWN0LmFzc2lnbihzdHlsZSwgcFN0eWxlKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMudHlwZSA9PSAnaCcpXHJcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oc3R5bGUsIGhTdHlsZSk7XHJcbiAgICAgICAgdGhpcy5zdHlsZSA9IHN0eWxlO1xyXG4gICAgICAgIHRoaXMub25JbnB1dENoYW5nZSA9IHRoaXMub25JbnB1dENoYW5nZS5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uSW5wdXRDaGFuZ2UoZXZlbnQpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5wcm9wcyk7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMub25Db250ZW50Q2hhbmdlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc3QgZXZlbnREYXRhID0ge2VsZW1lbnRJZDogdGhpcy5wcm9wcy5lbGVtZW50SWQsIGNvbnRlbnQ6IGV2ZW50LnRhcmdldC52YWx1ZX07XHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25Db250ZW50Q2hhbmdlKGV2ZW50RGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IHR5cGUgPSBcInRleHRcIjtcclxuICAgICAgICBsZXQgY2xhc3NOYW1lID0gXCJmb3JtLWNvbnRyb2wgbWwtMiBteS0yIGJvcmRlci0wXCI7XHJcbiAgICAgICAgbGV0IHN0eWxlID0gdGhpcy5zdHlsZTtcclxuICAgICAgICBsZXQgcGxhY2Vob2xkZXIgPSBcIkNvbnRlbnQgZ29lcyBoZXJlLi4uXCI7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbnB1dC1ncm91cCBmbGV4LW5vd3JhcFwiXHJcbiAgICAgICAgICAgICAgICAgb25Nb3VzZUVudGVyPXt0aGlzLm9uRWxlbWVudEhvdmVyfSBvbk1vdXNlTGVhdmU9e3RoaXMub25FbGVtZW50SG92ZXJ9PlxyXG4gICAgICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICA8RHJhZ0J1dHRvbiBpZD17dGhpcy5kcmFnQnV0dG9uSWR9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPEVkaXRFbGVtZW50QnV0dG9uIGlkPXt0aGlzLmVkaXRFbGVtZW50SWR9IC8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPXt0eXBlfSB2YWx1ZT17dGhpcy5wcm9wcy5jb250ZW50fSBwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25JbnB1dENoYW5nZX0gY2xhc3NOYW1lPXtjbGFzc05hbWV9IHN0eWxlPXtzdHlsZX0gLz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRWxlbWVudDsiLCJjb25zdCBFbGVtZW50ID0gcmVxdWlyZSgnLi9FbGVtZW50Jyk7XHJcblxyXG5cclxuY2xhc3MgUGFnZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcylcclxuICAgIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5wYWdlSWQgPSB0aGlzLnByb3BzLmNoaWxkcmVuLmlkO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEVsZW1lbnRWaWV3KGVsZW1lbnQpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3Qga2V5ID0gYGRvYyR7dGhpcy5wYWdlSWR9ZWxlbSR7ZWxlbWVudC5pZH1gO1xyXG5cclxuICAgICAgICByZXR1cm4gPEVsZW1lbnQgaWQ9e2tleX0ga2V5PXtrZXl9IGVsZW1lbnRJZD17ZWxlbWVudC5pZH0gdHlwZT17ZWxlbWVudC50eXBlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50PXtlbGVtZW50LmNvbnRlbnR9IG9uQ29udGVudENoYW5nZT17dGhpcy5wcm9wcy5vbkVsZW1lbnRNb2RpZmllZH0gLz47XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKClcclxuICAgIHtcclxuICAgICAgICBsZXQgcGFnZSA9IHRoaXMucHJvcHMuY2hpbGRyZW47XHJcbiAgICAgICAgbGV0IGVsZW1lbnRNYXJrdXAgPSBwYWdlLmVsZW1lbnRzLm1hcChlbGVtZW50ID0+IHRoaXMuZ2V0RWxlbWVudFZpZXcoZWxlbWVudCkpO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtNVwiPlxyXG4gICAgICAgICAgICAgICAge2VsZW1lbnRNYXJrdXB9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIClcclxuICAgIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBQYWdlOyIsIlxyXG5cclxuY2xhc3MgVGl0bGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGhlYWRlciBjbGFzc05hbWU9XCJtdC01IHB4LTMgcHktMyBwYi0xICBkaXNwbGF5LTRcIiBzdHlsZT17IHtmb250U2l6ZTogJzI1cHgnfX0gPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1tdXRlZFwiPnt0aGlzLnByb3BzLnNlY3Rpb25UaXRsZX0gLyA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJcIiBjb250ZW50RWRpdGFibGUgc3VwcHJlc3NDb250ZW50RWRpdGFibGVXYXJuaW5nPiB7dGhpcy5wcm9wcy5jaGlsZHJlbn0gPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPGhyIC8+XHJcbiAgICAgICAgICAgIDwvaGVhZGVyPlxyXG4gICAgICAgIClcclxuICAgIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBUaXRsZTsiLCJjbGFzcyBQYWdlTGluayBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcylcclxuICAgIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5hY3RpdmVTdHlsZSA9IHtcclxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnI0RGRTBFMSdcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5vbkNsaWNrID0gdGhpcy5vbkNsaWNrLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgb25DbGljaygpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IHBhZ2UgPSB0aGlzLnByb3BzLnBhZ2U7XHJcbiAgICAgICAgaWYodGhpcy5wcm9wcy5vblBhZ2VMaW5rQ2xpY2tlZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnN0IGV2ZW50ID0ge3NlY3Rpb25DbGlja2VkSWQ6IHRoaXMucHJvcHMuc2VjdGlvbklkLCBwYWdlQ2xpY2tlZDoge2lkOiBwYWdlLmlkLCB0aXRsZTogcGFnZS50aXRsZX19XHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25QYWdlTGlua0NsaWNrZWQoZXZlbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBwYWdlID0gdGhpcy5wcm9wcy5wYWdlO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxhIG9uQ2xpY2s9e3RoaXMub25DbGlja30gaHJlZj1cIiNcIlxyXG4gICAgICAgICAgICAgICBzdHlsZT17dGhpcy5wcm9wcy5hY3RpdmUgPyB0aGlzLmFjdGl2ZVN0eWxlIDoge319IGNsYXNzTmFtZT17J25hdi1pdGVtIG5hdi1saW5rIHJvdW5kZWQgdGV4dC1kYXJrJ30+XHJcbiAgICAgICAgICAgICAgICB7cGFnZS50aXRsZX1cclxuICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgIClcclxuICAgIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBQYWdlTGluazsiLCJjb25zdCBQYWdlTGluayA9IHJlcXVpcmUoJy4vUGFnZUxpbmsuanMnKTtcclxuXHJcbmNsYXNzIFNlY3Rpb25OYXYgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMudGl0bGUgPVxyXG4gICAgICAgICAgICA8YSBjbGFzc05hbWU9e1wibGVhZCB0ZXh0LWRlY29yYXRpb24tbm9uZSBcIiArICh0aGlzLnByb3BzLmFjdGl2ZVNlY3Rpb24gPyBcInRleHQtZGFya1wiIDogXCJ0ZXh0LWJsYWNrLTUwXCIpfSBocmVmPVwiI1wiPlxyXG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMuc2VjdGlvblRpdGxlfVxyXG4gICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLmFjdGl2ZVNlY3Rpb24gPyA8c3BhbiBjbGFzc05hbWU9XCJtYXRlcmlhbC1pY29ucyB0ZXh0LXN1Y2Nlc3MgZmxvYXQtcmlnaHRcIiBzdHlsZT17e2ZvbnRTaXplOiAnMWVtJ319PnN5bmNfYWx0PC9zcGFuPiA6IFwiXCIgfVxyXG4gICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgdGhpcy5vblBhZ2VMaW5rQ2xpY2tlZCA9IHRoaXMub25QYWdlTGlua0NsaWNrZWQuYmluZCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBvblBhZ2VMaW5rQ2xpY2tlZChldmVudClcclxuICAgIHtcclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5vblBhZ2VMaW5rQ2xpY2tlZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25QYWdlTGlua0NsaWNrZWQoZXZlbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRTaWRlYmFyTGlua3MoKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLnBhZ2VzLm1hcChwYWdlID0+IHtcclxuICAgICAgICAgICAgbGV0IGFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5hY3RpdmVTZWN0aW9uICYmIHBhZ2UuaWQgPT0gdGhpcy5wcm9wcy5hY3RpdmVQYWdlSWQpXHJcbiAgICAgICAgICAgICAgICBhY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICByZXR1cm4gPFBhZ2VMaW5rIGtleT17cGFnZS50aXRsZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblBhZ2VMaW5rQ2xpY2tlZD17dGhpcy5vblBhZ2VMaW5rQ2xpY2tlZH0gc2VjdGlvbklkPXt0aGlzLnByb3BzLnNlY3Rpb25JZH0gcGFnZT17cGFnZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmU9e2FjdGl2ZX0vPlxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC01XCIgc3R5bGU9eyB7J2xpbmVIZWlnaHQnOiAnMC41ZW0nfX0+XHJcbiAgICAgICAgICAgICAgICB7dGhpcy50aXRsZX1cclxuICAgICAgICAgICAgICAgIDxuYXYgY2xhc3NOYW1lPVwibmF2ICBmbGV4LWNvbHVtbiBweC0xIG10LTNcIiBzdHlsZT17IHsnbGluZUhlaWdodCc6ICcxZW0nfX0+XHJcbiAgICAgICAgICAgICAgICAgICAge3RoaXMuZ2V0U2lkZWJhckxpbmtzKCl9XHJcbiAgICAgICAgICAgICAgICA8L25hdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFNlY3Rpb25OYXY7IiwiXHJcbmNvbnN0IFNlY3Rpb25OYXYgPSByZXF1aXJlKCcuL1NlY3Rpb25OYXYnKTtcclxuXHJcbmxldCB3b3Jrc3BhY2VUaXRsZSA9IFwiTWF0aGVtYXRpY3NcIjtcclxuXHJcbmxldCBkYXNoYm9hcmRCdG5JZCA9IFwiZGFzaGJvYXJkLWJ0blwiO1xyXG5sZXQgc2V0dGluZ3NCdG5JZCA9IFwic2V0dGluZ3MtYnRuXCI7XHJcblxyXG5jbGFzcyBTaWRlYmFyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcylcclxuICAgIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5vblBhZ2VMaW5rQ2xpY2tlZCA9IHRoaXMub25QYWdlTGlua0NsaWNrZWQuYmluZCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3QgaG92ZXJDbGFzc2VzID0gJ3NoYWRvdy1zbSBiZy13aGl0ZSByb3VuZGVkJ1xyXG4gICAgICAgIHZhciBkYXNoYm9hcmRCdG4gPSAkKCcjJyArIGRhc2hib2FyZEJ0bklkKTtcclxuICAgICAgICBkYXNoYm9hcmRCdG4uaG92ZXIoKCkgPT4gZGFzaGJvYXJkQnRuLmFkZENsYXNzKGhvdmVyQ2xhc3NlcyksICgpID0+IGRhc2hib2FyZEJ0bi5yZW1vdmVDbGFzcyhob3ZlckNsYXNzZXMpKTtcclxuICAgIH1cclxuXHJcbiAgICBvblBhZ2VMaW5rQ2xpY2tlZChldmVudClcclxuICAgIHtcclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5vblBhZ2VMaW5rQ2xpY2tlZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCBzZWN0aW9uQ2xpY2tlZCA9IHRoaXMucHJvcHMuc2VjdGlvbnMuZmluZChzZWN0aW9uID0+IHNlY3Rpb24uaWQgPT0gZXZlbnQuc2VjdGlvbkNsaWNrZWRJZCk7XHJcbiAgICAgICAgICAgIGV2ZW50LnNlY3Rpb25DbGlja2VkID0gc2VjdGlvbkNsaWNrZWQ7XHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25QYWdlTGlua0NsaWNrZWQoZXZlbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRTZWN0aW9uTmF2cyhzZWN0aW9uKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IHNlY3Rpb25UaXRsZSA9IHNlY3Rpb24udGl0bGU7XHJcbiAgICAgICAgbGV0IGFjdGl2ZVNlY3Rpb24gPSBmYWxzZTtcclxuICAgICAgICBpZiAoc2VjdGlvbi5pZCA9PSB0aGlzLnByb3BzLmFjdGl2ZVNlY3Rpb25JZClcclxuICAgICAgICAgICAgYWN0aXZlU2VjdGlvbiA9IHRydWU7XHJcbiAgICAgICAgcmV0dXJuIDxTZWN0aW9uTmF2IGtleT17c2VjdGlvblRpdGxlfSBzZWN0aW9uVGl0bGU9e3NlY3Rpb25UaXRsZX0gc2VjdGlvbklkPXtzZWN0aW9uLmlkfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVTZWN0aW9uPXthY3RpdmVTZWN0aW9ufSBwYWdlcz17c2VjdGlvbi5wYWdlc30gb25QYWdlTGlua0NsaWNrZWQ9e3RoaXMub25QYWdlTGlua0NsaWNrZWR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZVBhZ2VJZD17dGhpcy5wcm9wcy5hY3RpdmVQYWdlSWR9Lz5cclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctbGlnaHQgbS0wICBoLTEwMCB3LTEwMCBib3JkZXItcmlnaHQgIHNoYWRvdy1zbVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGlkPXtkYXNoYm9hcmRCdG5JZH0gY2xhc3NOYW1lPVwiYnRuIGZsb2F0LWxlZnQgcC1hdXRvIG10LTFcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibWF0ZXJpYWwtaWNvbnMgYWxpZ24tYm90dG9tXCI+YXBwczwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgRGFzaGJvYXJkXHJcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBpZD17c2V0dGluZ3NCdG5JZH0gY2xhc3NOYW1lPVwiYnRuIGJ0bi1saWdodCBib3JkZXItMCByb3VuZGVkLWNpcmNsZSBmbG9hdC1yaWdodCBwLWF1dG9cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibWF0ZXJpYWwtaWNvbnMgYWxpZ24tbWlkZGxlIHB5LTFcIj5zZXR0aW5nczwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8YnIgLz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXIgbXQtNSBkaXNwbGF5LTRcIiBzdHlsZT17IHtmb250U2l6ZTogJzEuNWVtJ319PiB7d29ya3NwYWNlVGl0bGV9IDwvcD5cclxuICAgICAgICAgICAgICAgIDxociAvPlxyXG5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHgtM1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLnNlY3Rpb25zLm1hcCggc2VjdGlvbiA9PiB0aGlzLmdldFNlY3Rpb25OYXZzKHNlY3Rpb24pKX1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gU2lkZWJhcjsiLCJjbGFzcyBQYWdlIHtcclxuICAgIGNvbnN0cnVjdG9yKGlkLCB0aXRsZSwgZWxlbWVudHMpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5pZCA9IGlkICE9IG51bGwgPyBpZCA6IDA7XHJcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlO1xyXG4gICAgICAgIHRoaXMuZWxlbWVudHMgPSBlbGVtZW50cyAgIT0gbnVsbCA/IGVsZW1lbnRzIDogW107XHJcbiAgICAgICAgbGV0IG1heElkID0gMDtcclxuICAgICAgICB0aGlzLmVsZW1lbnRzLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50LmlkID4gbWF4SWQpXHJcbiAgICAgICAgICAgICAgICBtYXhJZCA9IGVsZW1lbnQuaWQ7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5pZENvdW50ZXIgPSBtYXhJZCArIDE7IC8vIGFyYml0cmFyaWx5IGNob3NlbiwgZm9yIHNpbXBsZSBlbGVtZW50IGlkIHVzYWdlLlxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUVsZW1lbnQoZWxlbWVudElkLCBjb250ZW50KVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuZWxlbWVudHMuZmluZChlbGVtZW50ID0+IGVsZW1lbnQuaWQgPT0gZWxlbWVudElkKS5jb250ZW50ID0gY29udGVudDtcclxuICAgIH1cclxuXHJcbiAgICBhZGRFbGVtZW50KGVsZW1lbnQpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3QgbmV3SWQgPSB0aGlzLmlkQ291bnRlcisrO1xyXG4gICAgICAgIGNvbnN0IG5ld0VsZW1lbnQgPSB7dHlwZTogJ3AnLCBpZDogbmV3SWQsIGNvbnRlbnQ6ICcnfTtcclxuICAgICAgICB0aGlzLmVsZW1lbnRzLnB1c2gobmV3RWxlbWVudCk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFBhZ2U7IiwiY29uc3QgUGFnZSA9IHJlcXVpcmUoJy4vUGFnZScpO1xyXG5cclxuY2xhc3MgV29ya3NwYWNlQVBJXHJcbntcclxuICAgIGFzeW5jIGdldFNlY3Rpb25zKClcclxuICAgIHtcclxuICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgZmV0Y2goJy93b3Jrc3BhY2UnKTtcclxuICAgICAgICBsZXQgc2VjdGlvbnMgPSBhd2FpdCBkYXRhLmpzb24oKTtcclxuICAgICAgICB0aGlzLnNlY3Rpb25zID0gc2VjdGlvbnM7XHJcbiAgICAgICAgcmV0dXJuIHNlY3Rpb25zO1xyXG4gICAgfVxyXG4gICAgZ2V0UGFnZShzZWN0aW9uSWQsIHBhZ2VJZClcclxuICAgIHtcclxuICAgICAgICBsZXQgc2VjdGlvbiA9IHRoaXMuc2VjdGlvbnMuZmluZChzZWN0aW9uID0+IHNlY3Rpb24uaWQgPT0gc2VjdGlvbklkKTtcclxuICAgICAgICBsZXQgcGFnZSA9IHNlY3Rpb24ucGFnZXMuZmluZChwYWdlID0+IHtcclxuICAgICAgICAgICAgaWYgKHBhZ2UuaWQgPT0gcGFnZUlkKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiBuZXcgUGFnZShwYWdlLmlkLCBwYWdlLnRpdGxlLCBwYWdlLmVsZW1lbnRzKTs7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlUGFnZShzZWN0aW9uSWQsIHBhZ2VJZCwgcGFnZSlcclxuICAgIHtcclxuICAgICAgICBsZXQgc2VjdGlvbiA9IHRoaXMuc2VjdGlvbnMuZmluZChzZWN0aW9uID0+IHNlY3Rpb24uaWQgPT0gc2VjdGlvbklkKTtcclxuICAgICAgICBsZXQgcGFnZUluZGV4ID0gc2VjdGlvbi5wYWdlcy5maW5kSW5kZXggKHBhZ2UgPT4gcGFnZS5pZCA9PSBwYWdlSWQpO1xyXG4gICAgICAgIHNlY3Rpb24ucGFnZXNbcGFnZUluZGV4XSA9IHBhZ2U7XHJcbiAgICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gV29ya3NwYWNlQVBJOyJdfQ==
