(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const Editor = require('./Components/editor.d/Editor.js');

const Sidebar = require('./Components/sidebar.d/Sidebar');

const WorkspaceAPI = require('./Data/WorkspaceAPI');

const volatileRepository = require('./Data/volatile-repository');

let workspaceAPI = new WorkspaceAPI();
workspaceAPI.fetch();

class App extends React.Component {
  constructor(props) {
    super(props);
    const focusedDocument = volatileRepository.docs[0];
    const sections = volatileRepository.getSections();
    this.state = {
      focusedDocument: focusedDocument,
      sections: sections
    };
    this.onPageLinkClicked = this.onPageLinkClicked.bind(this);
    this.updateDocument = this.updateDocument.bind(this);
  }

  onPageLinkClicked(event) {
    const documentClickedId = event.documentClicked.id;
    this.setState({
      focusedDocument: volatileRepository.docs[documentClickedId]
    });
  }

  updateDocument(documentUpdateEvent) {
    if (documentUpdateEvent.type == 'element') {
      let doc = volatileRepository.getDocument(this.state.focusedDocument.id);
      doc.updateElement(documentUpdateEvent.elementId, documentUpdateEvent.value);
      this.setState({
        focusedDocument: doc
      });
    }

    if (documentUpdateEvent.type == 'elementCreated') {
      let doc = volatileRepository.getDocument(this.state.focusedDocument.id);
      doc.addElement(documentUpdateEvent.element);
      this.setState({
        focusedDocument: doc
      });
    }
  }

  render() {
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
      documentActiveId: this.state.focusedDocument.id,
      onPageLinkClicked: this.onPageLinkClicked
    })), /*#__PURE__*/React.createElement("div", {
      className: "offset-col-1 col-10 p-0 m-0 h-100 w-100"
    }, /*#__PURE__*/React.createElement("div", {
      id: "editor-wrapper",
      className: "container-fluid border-top-0 m-0 p-0 h-100 w-100"
    }, /*#__PURE__*/React.createElement(Editor, {
      document: this.state.focusedDocument,
      onDocumentChange: this.updateDocument
    })))));
  }

}

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById('main-page'));

},{"./Components/editor.d/Editor.js":2,"./Components/sidebar.d/Sidebar":11,"./Data/WorkspaceAPI":13,"./Data/volatile-repository":14}],2:[function(require,module,exports){
const Title = require('./editor-elements/Title.js');

const Page = require('./editor-elements/Page.js');

const AddNewElement = require('./editor-elements/AddElementButton');

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      document: this.props.document
    };
    this.updateContent = this.updateContent.bind(this);
    this.addNewElementToDocument = this.addNewElementToDocument.bind(this);
  }

  updateContent(event) {
    if (this.props.onDocumentChange) {
      const elementId = event.elementId;
      const documentEventUpdate = {
        type: 'element',
        elementId: elementId,
        value: event.content
      };
      this.props.onDocumentChange(documentEventUpdate);
    }
  }

  addNewElementToDocument(event) {
    const documentUpdateEvent = {
      type: 'elementCreated',
      element: {
        type: 'p',
        content: ''
      }
    };
    this.props.onDocumentChange(documentUpdateEvent);
  }

  render() {
    let document = this.props.document;
    return /*#__PURE__*/React.createElement("div", {
      id: "editor",
      className: "container bg-white shadow w-100 vh-100 px-3 pt-2 border rounded"
    }, /*#__PURE__*/React.createElement(Title, {
      sectionTitle: document.section
    }, " ", document.title, " "), /*#__PURE__*/React.createElement(Page, {
      onElementModified: this.updateContent
    }, document), /*#__PURE__*/React.createElement(AddNewElement, {
      onElementClicked: this.addNewElementToDocument
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
    this.documentId = this.props.children.id;
  }

  getElementView(element) {
    const key = `doc${this.documentId}elem${element.id}`;
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
    let document = this.props.children;
    let elementMarkup = document.contentElements.map(element => this.getElementView(element));
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
    let document = this.props.document;

    if (this.props.onPageLinkClicked) {
      const event = {
        documentClicked: {
          id: document.id,
          title: document.title,
          section: document.section
        }
      };
      this.props.onPageLinkClicked(event);
    }
  }

  render() {
    let document = this.props.document;
    return /*#__PURE__*/React.createElement("a", {
      onClick: this.onClick,
      href: "#",
      style: this.props.documentActiveId == document.id ? this.activeStyle : {},
      className: 'nav-item nav-link rounded text-dark'
    }, document.title);
  }

}

module.exports = PageLink;

},{}],10:[function(require,module,exports){
const SidebarLink = require('./PageLink.js');

class SectionNav extends React.Component {
  constructor(props) {
    super(props);
    this.title = /*#__PURE__*/React.createElement("a", {
      className: "lead text-decoration-none " + (this.props.active ? "text-dark" : "text-black-50"),
      href: "#"
    }, this.props.sectionName, this.props.active ? /*#__PURE__*/React.createElement("span", {
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
    return this.props.documents.map(document => {
      return /*#__PURE__*/React.createElement(SidebarLink, {
        key: document.title,
        onPageLinkClicked: this.onPageLinkClicked,
        document: document,
        documentActiveId: this.props.documentActiveId
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
    if (this.props.onPageLinkClicked) this.props.onPageLinkClicked(event);
  }

  getSectionNavs(section) {
    const sectionName = section.sectionName;
    return /*#__PURE__*/React.createElement(SectionNav, {
      key: sectionName,
      sectionName: sectionName,
      documents: section.documents,
      onPageLinkClicked: this.onPageLinkClicked,
      documentActiveId: this.props.documentActiveId
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
  constructor(id, section, title, contentElements) {
    this.id = id != null ? id : 0;
    this.section = section;
    this.title = title;
    this.contentElements = contentElements != null ? contentElements : [];
    this.idCounter = 2; // arbitrarily chosen, for simple element id usage.
  }

  updateElement(elementId, content) {
    this.contentElements[elementId] = {
      type: 'p',
      id: elementId,
      content: content
    };
  }

  addElement(element) {
    const newId = this.idCounter++;
    const newElement = {
      type: 'p',
      id: newId,
      content: ''
    };
    this.contentElements.push(newElement);
  }

}

module.exports = Page;

},{}],13:[function(require,module,exports){
class WorkspaceAPI {
  async fetch() {
    const data = await fetch('/workspace');
    console.log((await data.json()));
  }

}

module.exports = WorkspaceAPI;

},{}],14:[function(require,module,exports){
const Page = require('./Page.js');

class VolatileRepository {
  constructor() {
    this.docIds = [0, 1, 2];
    this.titles = ['Overview', 'Terminology', 'Exercises'];
    this.sections = ['Calculus', 'Differential Equations', 'Linear Algebra'];
    const docs = [];
    let idCounter = 0;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < this.sections.length; j++) {
        const p1 = {
          type: 'p',
          id: 0,
          content: "Hello from " + this.titles[j]
        };
        const p2 = {
          type: 'p',
          id: 1,
          content: "This is line " + 2 + " of " + this.titles[j]
        };
        let contentElements = [p1, p2];
        let doc = new Page(idCounter, this.sections[i], this.titles[j], contentElements);
        docs.push(doc);
        idCounter++;
      }
    }

    this.docs = docs;
  }

  getSections() {
    return this.sections.map(section => {
      const sectionDocuments = this.docs.filter(doc => doc.section == section);
      return {
        sectionName: section,
        documents: sectionDocuments
      };
    });
  }

  getDocument(docId) {
    return this.docs[docId];
  }

  updateDocument(docId, document) {
    this.docs[docId] = document;
  }

}

module.exports = new VolatileRepository();

},{"./Page.js":12}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJDbGllbnQgU2NyaXB0cy9BcHAuanMiLCJDbGllbnQgU2NyaXB0cy9Db21wb25lbnRzL2VkaXRvci5kL0VkaXRvci5qcyIsIkNsaWVudCBTY3JpcHRzL0NvbXBvbmVudHMvZWRpdG9yLmQvZWRpdG9yLWVsZW1lbnRzL0FkZEVsZW1lbnRCdXR0b24uanMiLCJDbGllbnQgU2NyaXB0cy9Db21wb25lbnRzL2VkaXRvci5kL2VkaXRvci1lbGVtZW50cy9EcmFnQnV0dG9uLmpzIiwiQ2xpZW50IFNjcmlwdHMvQ29tcG9uZW50cy9lZGl0b3IuZC9lZGl0b3ItZWxlbWVudHMvRWRpdEVsZW1lbnRCdXR0b24uanMiLCJDbGllbnQgU2NyaXB0cy9Db21wb25lbnRzL2VkaXRvci5kL2VkaXRvci1lbGVtZW50cy9FbGVtZW50LmpzIiwiQ2xpZW50IFNjcmlwdHMvQ29tcG9uZW50cy9lZGl0b3IuZC9lZGl0b3ItZWxlbWVudHMvUGFnZS5qcyIsIkNsaWVudCBTY3JpcHRzL0NvbXBvbmVudHMvZWRpdG9yLmQvZWRpdG9yLWVsZW1lbnRzL1RpdGxlLmpzIiwiQ2xpZW50IFNjcmlwdHMvQ29tcG9uZW50cy9zaWRlYmFyLmQvUGFnZUxpbmsuanMiLCJDbGllbnQgU2NyaXB0cy9Db21wb25lbnRzL3NpZGViYXIuZC9TZWN0aW9uTmF2LmpzIiwiQ2xpZW50IFNjcmlwdHMvQ29tcG9uZW50cy9zaWRlYmFyLmQvU2lkZWJhci5qcyIsIkNsaWVudCBTY3JpcHRzL0RhdGEvUGFnZS5qcyIsIkNsaWVudCBTY3JpcHRzL0RhdGEvV29ya3NwYWNlQVBJLmpzIiwiQ2xpZW50IFNjcmlwdHMvRGF0YS92b2xhdGlsZS1yZXBvc2l0b3J5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLGlDQUFELENBQXRCOztBQUNBLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FB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QUFPLElBQUk7QUFDaEMsWUFBTSxnQkFBZ0IsR0FBRyxLQUFLLElBQUwsQ0FBVSxNQUFWLENBQWlCLEdBQUcsSUFBSSxHQUFHLENBQUMsT0FBSixJQUFlLE9BQXZDLENBQXpCO0FBQ0EsYUFBTztBQUFDLFFBQUEsV0FBVyxFQUFFLE9BQWQ7QUFBdUIsUUFBQSxTQUFTLEVBQUU7QUFBbEMsT0FBUDtBQUNILEtBSE0sQ0FBUDtBQUlIOztBQUVELEVBQUEsV0FBVyxDQUFDLEtBQUQsRUFDWDtBQUNJLFdBQU8sS0FBSyxJQUFMLENBQVUsS0FBVixDQUFQO0FBQ0g7O0FBRUQsRUFBQSxjQUFjLENBQUMsS0FBRCxFQUFRLFFBQVIsRUFDZDtBQUNJLFNBQUssSUFBTCxDQUFVLEtBQVYsSUFBbUIsUUFBbkI7QUFDSDs7QUF6Q0w7O0FBNkNBLE1BQU0sQ0FBQyxPQUFQLEdBQWlCLElBQUksa0JBQUosRUFBakIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJjb25zdCBFZGl0b3IgPSByZXF1aXJlKCcuL0NvbXBvbmVudHMvZWRpdG9yLmQvRWRpdG9yLmpzJyk7XHJcbmNvbnN0IFNpZGViYXIgPSByZXF1aXJlKCcuL0NvbXBvbmVudHMvc2lkZWJhci5kL1NpZGViYXInKTtcclxuY29uc3QgV29ya3NwYWNlQVBJID0gcmVxdWlyZSgnLi9EYXRhL1dvcmtzcGFjZUFQSScpO1xyXG5jb25zdCB2b2xhdGlsZVJlcG9zaXRvcnkgPSByZXF1aXJlKCcuL0RhdGEvdm9sYXRpbGUtcmVwb3NpdG9yeScpO1xyXG5sZXQgd29ya3NwYWNlQVBJID0gbmV3IFdvcmtzcGFjZUFQSSgpO1xyXG53b3Jrc3BhY2VBUEkuZmV0Y2goKTtcclxuY2xhc3MgQXBwIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50XHJcbntcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICBjb25zdCBmb2N1c2VkRG9jdW1lbnQgPSB2b2xhdGlsZVJlcG9zaXRvcnkuZG9jc1swXTtcclxuICAgICAgICBjb25zdCBzZWN0aW9ucyA9IHZvbGF0aWxlUmVwb3NpdG9yeS5nZXRTZWN0aW9ucygpO1xyXG5cclxuICAgICAgICB0aGlzLnN0YXRlID0ge2ZvY3VzZWREb2N1bWVudDogZm9jdXNlZERvY3VtZW50LCBzZWN0aW9uczogc2VjdGlvbnN9XHJcblxyXG4gICAgICAgIHRoaXMub25QYWdlTGlua0NsaWNrZWQgPSB0aGlzLm9uUGFnZUxpbmtDbGlja2VkLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVEb2N1bWVudCA9IHRoaXMudXBkYXRlRG9jdW1lbnQuYmluZCh0aGlzKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgb25QYWdlTGlua0NsaWNrZWQoZXZlbnQpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3QgZG9jdW1lbnRDbGlja2VkSWQgPSBldmVudC5kb2N1bWVudENsaWNrZWQuaWQ7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Zm9jdXNlZERvY3VtZW50OiB2b2xhdGlsZVJlcG9zaXRvcnkuZG9jc1tkb2N1bWVudENsaWNrZWRJZF19KTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVEb2N1bWVudChkb2N1bWVudFVwZGF0ZUV2ZW50KVxyXG4gICAge1xyXG4gICAgICAgIGlmKGRvY3VtZW50VXBkYXRlRXZlbnQudHlwZSA9PSAnZWxlbWVudCcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgZG9jID0gdm9sYXRpbGVSZXBvc2l0b3J5LmdldERvY3VtZW50KHRoaXMuc3RhdGUuZm9jdXNlZERvY3VtZW50LmlkKTtcclxuICAgICAgICAgICAgZG9jLnVwZGF0ZUVsZW1lbnQoZG9jdW1lbnRVcGRhdGVFdmVudC5lbGVtZW50SWQsIGRvY3VtZW50VXBkYXRlRXZlbnQudmFsdWUpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtmb2N1c2VkRG9jdW1lbnQ6IGRvY30pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihkb2N1bWVudFVwZGF0ZUV2ZW50LnR5cGUgPT0gJ2VsZW1lbnRDcmVhdGVkJylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCBkb2MgPSB2b2xhdGlsZVJlcG9zaXRvcnkuZ2V0RG9jdW1lbnQodGhpcy5zdGF0ZS5mb2N1c2VkRG9jdW1lbnQuaWQpO1xyXG4gICAgICAgICAgICBkb2MuYWRkRWxlbWVudChkb2N1bWVudFVwZGF0ZUV2ZW50LmVsZW1lbnQpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtmb2N1c2VkRG9jdW1lbnQ6IGRvY30pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgaWQ9XCJtYWluXCIgY2xhc3NOYW1lPVwiY29udGFpbmVyLWZsdWlkIHAtMCBtLTAgaC0xMDAgdy0xMDBcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93IHAtMCBtLTAgaC0xMDAgdy0xMDBcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGlkPVwic2lkZWJhci13cmFwcGVyXCIgY2xhc3NOYW1lPVwiY29sLTIgcC0wIG0tMCBoLTEwMCB3LTEwMFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8U2lkZWJhciBzZWN0aW9ucz17dGhpcy5zdGF0ZS5zZWN0aW9uc30gZG9jdW1lbnRBY3RpdmVJZD17dGhpcy5zdGF0ZS5mb2N1c2VkRG9jdW1lbnQuaWR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uUGFnZUxpbmtDbGlja2VkPXt0aGlzLm9uUGFnZUxpbmtDbGlja2VkfS8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvZmZzZXQtY29sLTEgY29sLTEwIHAtMCBtLTAgaC0xMDAgdy0xMDBcIj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJlZGl0b3Itd3JhcHBlclwiIGNsYXNzTmFtZT1cImNvbnRhaW5lci1mbHVpZCBib3JkZXItdG9wLTAgbS0wIHAtMCBoLTEwMCB3LTEwMFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEVkaXRvciBkb2N1bWVudD17dGhpcy5zdGF0ZS5mb2N1c2VkRG9jdW1lbnR9IG9uRG9jdW1lbnRDaGFuZ2U9e3RoaXMudXBkYXRlRG9jdW1lbnR9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59XHJcblxyXG5SZWFjdERPTS5yZW5kZXIoPEFwcCAvPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21haW4tcGFnZScpKSIsImNvbnN0IFRpdGxlID0gcmVxdWlyZSgnLi9lZGl0b3ItZWxlbWVudHMvVGl0bGUuanMnKTtcclxuY29uc3QgUGFnZSA9IHJlcXVpcmUoJy4vZWRpdG9yLWVsZW1lbnRzL1BhZ2UuanMnKTtcclxuY29uc3QgQWRkTmV3RWxlbWVudCA9IHJlcXVpcmUoJy4vZWRpdG9yLWVsZW1lbnRzL0FkZEVsZW1lbnRCdXR0b24nKTtcclxuXHJcbmNsYXNzIEVkaXRvciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcylcclxuICAgIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtkb2N1bWVudDogdGhpcy5wcm9wcy5kb2N1bWVudH07XHJcbiAgICAgICAgdGhpcy51cGRhdGVDb250ZW50ID0gdGhpcy51cGRhdGVDb250ZW50LmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5hZGROZXdFbGVtZW50VG9Eb2N1bWVudCA9IHRoaXMuYWRkTmV3RWxlbWVudFRvRG9jdW1lbnQuYmluZCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVDb250ZW50KGV2ZW50KVxyXG4gICAge1xyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLm9uRG9jdW1lbnRDaGFuZ2UpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zdCBlbGVtZW50SWQgPSBldmVudC5lbGVtZW50SWQ7XHJcbiAgICAgICAgICAgIGNvbnN0IGRvY3VtZW50RXZlbnRVcGRhdGUgPSB7dHlwZTogJ2VsZW1lbnQnLCBlbGVtZW50SWQ6IGVsZW1lbnRJZCwgdmFsdWU6IGV2ZW50LmNvbnRlbnR9O1xyXG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uRG9jdW1lbnRDaGFuZ2UoZG9jdW1lbnRFdmVudFVwZGF0ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBhZGROZXdFbGVtZW50VG9Eb2N1bWVudChldmVudClcclxuICAgIHtcclxuICAgICAgICBjb25zdCBkb2N1bWVudFVwZGF0ZUV2ZW50ID0ge3R5cGU6ICdlbGVtZW50Q3JlYXRlZCcsIGVsZW1lbnQ6IHt0eXBlOiAncCcsIGNvbnRlbnQ6ICcnfX1cclxuICAgICAgICB0aGlzLnByb3BzLm9uRG9jdW1lbnRDaGFuZ2UoZG9jdW1lbnRVcGRhdGVFdmVudCk7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBkb2N1bWVudCA9IHRoaXMucHJvcHMuZG9jdW1lbnQ7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBpZD1cImVkaXRvclwiIGNsYXNzTmFtZT1cImNvbnRhaW5lciBiZy13aGl0ZSBzaGFkb3cgdy0xMDAgdmgtMTAwIHB4LTMgcHQtMiBib3JkZXIgcm91bmRlZFwiPlxyXG4gICAgICAgICAgICAgICAgPFRpdGxlIHNlY3Rpb25UaXRsZT17ZG9jdW1lbnQuc2VjdGlvbn0+IHtkb2N1bWVudC50aXRsZX0gPC9UaXRsZT5cclxuICAgICAgICAgICAgICAgIDxQYWdlIG9uRWxlbWVudE1vZGlmaWVkPXt0aGlzLnVwZGF0ZUNvbnRlbnR9PlxyXG4gICAgICAgICAgICAgICAgICAgIHtkb2N1bWVudH1cclxuICAgICAgICAgICAgICAgIDwvUGFnZT5cclxuICAgICAgICAgICAgICAgIDxBZGROZXdFbGVtZW50IG9uRWxlbWVudENsaWNrZWQ9e3RoaXMuYWRkTmV3RWxlbWVudFRvRG9jdW1lbnR9PkFkZCBOZXcgRWxlbWVudDwvQWRkTmV3RWxlbWVudD5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEVkaXRvcjsiLCJjbGFzcyBBZGRFbGVtZW50QnV0dG9uIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuXHJcbiAgICByZW5kZXIoKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1zbSBidG4tb3V0bGluZS1saWdodCB0ZXh0LW11dGVkIGJvcmRlci0wIG1sLTVcIiBocmVmPVwiI1wiIG9uQ2xpY2s9e3RoaXMucHJvcHMub25FbGVtZW50Q2xpY2tlZH0+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJtYXRlcmlhbC1pY29ucyBhbGlnbi1taWRkbGUgcHktMVwiPnZlcnRpY2FsX2FsaWduX3RvcDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxyXG4gICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEFkZEVsZW1lbnRCdXR0b247IiwiY2xhc3MgRHJhZ0J1dHRvbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcylcclxuICAgIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQoKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBlbGVtZW50ID0gJCgnIycgKyB0aGlzLnByb3BzLmlkKTtcclxuICAgICAgICBlbGVtZW50LnBhcmVudCgpLm9uKCdtb3VzZWVudGVyJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBlbGVtZW50LnJlbW92ZUNsYXNzKCdpbnZpc2libGUnKS5hZGRDbGFzcygndmlzaWJsZScpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBlbGVtZW50LnBhcmVudCgpLm9uKCdtb3VzZWxlYXZlJywgICgpID0+IHtcclxuICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVDbGFzcygndmlzaWJsZScpLmFkZENsYXNzKCdpbnZpc2libGUnKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxidXR0b24gaWQ9e3RoaXMucHJvcHMuaWR9IHR5cGU9XCJidXR0b25cIiBzdHlsZT17IHtjdXJzb3I6ICdtb3ZlJ319IGRyYWdnYWJsZVxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJ0biBpbnZpc2libGUgcC0wIG10LTMgYWxpZ24tYm90dG9tXCIgPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibWF0ZXJpYWwtaWNvbnNcIj5kcmFnX2hhbmRsZTwvc3Bhbj5cclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBEcmFnQnV0dG9uOyIsImNsYXNzIEVkaXRFbGVtZW50QnV0dG9uIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge2FjdGl2ZTogZmFsc2V9O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50KClcclxuICAgIHtcclxuICAgICAgICBsZXQgZWxlbWVudCA9ICQoJyMnICsgdGhpcy5wcm9wcy5pZCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coZWxlbWVudCk7XHJcbiAgICAgICAgZWxlbWVudC5wYXJlbnQoKS5vbignbW91c2VlbnRlcicsICgpID0+IHtcclxuICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVDbGFzcygnaW52aXNpYmxlJykuYWRkQ2xhc3MoJ3Zpc2libGUnKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZWxlbWVudC5wYXJlbnQoKS5vbignbW91c2VsZWF2ZScsICAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5zdGF0ZS5hY3RpdmUpXHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LnJlbW92ZUNsYXNzKCd2aXNpYmxlJykuYWRkQ2xhc3MoJ2ludmlzaWJsZScpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGVsZW1lbnQub24oJ2ZvY3VzJywgKCkgPT4gdGhpcy5zZXRTdGF0ZSh7YWN0aXZlOiB0cnVlfSkpO1xyXG4gICAgICAgIGVsZW1lbnQub24oJ2JsdXInLCAoKSA9PiB0aGlzLnNldFN0YXRlKHthY3RpdmU6IGZhbHNlfSkpO1xyXG5cclxuICAgICAgICAkKCcjJyArIHRoaXMucHJvcHMuaWQpLnBvcG92ZXIoe1xyXG4gICAgICAgICAgICB0aXRsZTogJ0VkaXQgRWxlbWVudCcsXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6ICd0ZXN0aW5nIGJvZHkgZG9lcyBpdCB3b3JrJyxcclxuICAgICAgICAgICAgY29udGFpbmVyOiAnYm9keScsXHJcbiAgICAgICAgICAgIHBsYWNlbWVudDogJ3RvcCcsXHJcbiAgICAgICAgICAgIHRyaWdnZXI6ICdmb2N1cydcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcmVuZGVyKClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8YnV0dG9uIGlkPXt0aGlzLnByb3BzLmlkfSB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGludmlzaWJsZSBwLTAgbXQtMyBhbGlnbi1ib3R0b21cIiA+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibWF0ZXJpYWwtaWNvbnNcIj5lZGl0PC9zcGFuPlxyXG4gICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRWRpdEVsZW1lbnRCdXR0b247IiwiY29uc3QgRWRpdEVsZW1lbnRCdXR0b24gPSByZXF1aXJlKCcuL0VkaXRFbGVtZW50QnV0dG9uJyk7XHJcbmNvbnN0IERyYWdCdXR0b24gPSByZXF1aXJlKCcuL0RyYWdCdXR0b24nKTtcclxuXHJcbmNvbnN0IHBTdHlsZSA9IHtcclxuICAgIGZvbnRTaXplOiAnMS4yNWVtJ1xyXG59O1xyXG5cclxuY29uc3QgaFN0eWxlID0ge1xyXG4gICAgZm9udFdlaWdodDogJ2JvbGQnLFxyXG4gICAgZm9udFNpemU6ICcxLjc1ZW0nXHJcbn07XHJcblxyXG5cclxuY2xhc3MgRWxlbWVudCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLmRyYWdCdXR0b25JZCA9IHRoaXMucHJvcHMuaWQgKyAnZHJhZ0J1dHRvbidcclxuICAgICAgICB0aGlzLmVkaXRFbGVtZW50SWQgPSB0aGlzLnByb3BzLmlkICsgJ2VkaXRFbGVtZW50JztcclxuICAgICAgICBsZXQgc3R5bGUgPSB7fTtcclxuICAgICAgICBPYmplY3QuYXNzaWduKHN0eWxlLCBwU3R5bGUpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5wcm9wcy50eXBlID09ICdoJylcclxuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihzdHlsZSwgaFN0eWxlKTtcclxuICAgICAgICB0aGlzLnN0eWxlID0gc3R5bGU7XHJcbiAgICAgICAgdGhpcy5vbklucHV0Q2hhbmdlID0gdGhpcy5vbklucHV0Q2hhbmdlLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgb25JbnB1dENoYW5nZShldmVudClcclxuICAgIHtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnByb3BzKTtcclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5vbkNvbnRlbnRDaGFuZ2UpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zdCBldmVudERhdGEgPSB7ZWxlbWVudElkOiB0aGlzLnByb3BzLmVsZW1lbnRJZCwgY29udGVudDogZXZlbnQudGFyZ2V0LnZhbHVlfTtcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkNvbnRlbnRDaGFuZ2UoZXZlbnREYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKClcclxuICAgIHtcclxuICAgICAgICBsZXQgdHlwZSA9IFwidGV4dFwiO1xyXG4gICAgICAgIGxldCBjbGFzc05hbWUgPSBcImZvcm0tY29udHJvbCBtbC0yIG15LTIgYm9yZGVyLTBcIjtcclxuICAgICAgICBsZXQgc3R5bGUgPSB0aGlzLnN0eWxlO1xyXG4gICAgICAgIGxldCBwbGFjZWhvbGRlciA9IFwiQ29udGVudCBnb2VzIGhlcmUuLi5cIjtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImlucHV0LWdyb3VwIGZsZXgtbm93cmFwXCJcclxuICAgICAgICAgICAgICAgICBvbk1vdXNlRW50ZXI9e3RoaXMub25FbGVtZW50SG92ZXJ9IG9uTW91c2VMZWF2ZT17dGhpcy5vbkVsZW1lbnRIb3Zlcn0+XHJcbiAgICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxEcmFnQnV0dG9uIGlkPXt0aGlzLmRyYWdCdXR0b25JZH0gLz5cclxuICAgICAgICAgICAgICAgICAgICA8RWRpdEVsZW1lbnRCdXR0b24gaWQ9e3RoaXMuZWRpdEVsZW1lbnRJZH0gLz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9e3R5cGV9IHZhbHVlPXt0aGlzLnByb3BzLmNvbnRlbnR9IHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cclxuICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbklucHV0Q2hhbmdlfSBjbGFzc05hbWU9e2NsYXNzTmFtZX0gc3R5bGU9e3N0eWxlfSAvPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBFbGVtZW50OyIsImNvbnN0IEVsZW1lbnQgPSByZXF1aXJlKCcuL0VsZW1lbnQnKTtcclxuXHJcblxyXG5jbGFzcyBQYWdlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLmRvY3VtZW50SWQgPSB0aGlzLnByb3BzLmNoaWxkcmVuLmlkO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEVsZW1lbnRWaWV3KGVsZW1lbnQpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3Qga2V5ID0gYGRvYyR7dGhpcy5kb2N1bWVudElkfWVsZW0ke2VsZW1lbnQuaWR9YDtcclxuXHJcbiAgICAgICAgcmV0dXJuIDxFbGVtZW50IGlkPXtrZXl9IGtleT17a2V5fSBlbGVtZW50SWQ9e2VsZW1lbnQuaWR9IHR5cGU9e2VsZW1lbnQudHlwZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudD17ZWxlbWVudC5jb250ZW50fSBvbkNvbnRlbnRDaGFuZ2U9e3RoaXMucHJvcHMub25FbGVtZW50TW9kaWZpZWR9IC8+O1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGRvY3VtZW50ID0gdGhpcy5wcm9wcy5jaGlsZHJlbjtcclxuICAgICAgICBsZXQgZWxlbWVudE1hcmt1cCA9IGRvY3VtZW50LmNvbnRlbnRFbGVtZW50cy5tYXAoZWxlbWVudCA9PiB0aGlzLmdldEVsZW1lbnRWaWV3KGVsZW1lbnQpKTtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTVcIj5cclxuICAgICAgICAgICAgICAgIHtlbGVtZW50TWFya3VwfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUGFnZTsiLCJcclxuXHJcbmNsYXNzIFRpdGxlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxoZWFkZXIgY2xhc3NOYW1lPVwibXQtNSBweC0zIHB5LTMgcGItMSAgZGlzcGxheS00XCIgc3R5bGU9eyB7Zm9udFNpemU6ICcyNXB4J319ID5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtbXV0ZWRcIj57dGhpcy5wcm9wcy5zZWN0aW9uVGl0bGV9IC8gPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiXCIgY29udGVudEVkaXRhYmxlIHN1cHByZXNzQ29udGVudEVkaXRhYmxlV2FybmluZz4ge3RoaXMucHJvcHMuY2hpbGRyZW59IDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDxociAvPlxyXG4gICAgICAgICAgICA8L2hlYWRlcj5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gVGl0bGU7IiwiY2xhc3MgUGFnZUxpbmsgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuYWN0aXZlU3R5bGUgPSB7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJyNERkUwRTEnXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMub25DbGljayA9IHRoaXMub25DbGljay5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ2xpY2soKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBkb2N1bWVudCA9IHRoaXMucHJvcHMuZG9jdW1lbnQ7XHJcbiAgICAgICAgaWYodGhpcy5wcm9wcy5vblBhZ2VMaW5rQ2xpY2tlZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnN0IGV2ZW50ID0ge2RvY3VtZW50Q2xpY2tlZDoge2lkOiBkb2N1bWVudC5pZCwgdGl0bGU6IGRvY3VtZW50LnRpdGxlLCBzZWN0aW9uOiBkb2N1bWVudC5zZWN0aW9ufX1cclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5vblBhZ2VMaW5rQ2xpY2tlZChldmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGRvY3VtZW50ID0gdGhpcy5wcm9wcy5kb2N1bWVudDtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8YSBvbkNsaWNrPXt0aGlzLm9uQ2xpY2t9IGhyZWY9XCIjXCJcclxuICAgICAgICAgICAgICAgc3R5bGU9e3RoaXMucHJvcHMuZG9jdW1lbnRBY3RpdmVJZCA9PSBkb2N1bWVudC5pZCA/IHRoaXMuYWN0aXZlU3R5bGUgOiB7fX0gY2xhc3NOYW1lPXsnbmF2LWl0ZW0gbmF2LWxpbmsgcm91bmRlZCB0ZXh0LWRhcmsnfT5cclxuICAgICAgICAgICAgICAgIHtkb2N1bWVudC50aXRsZX1cclxuICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgIClcclxuICAgIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBQYWdlTGluazsiLCJjb25zdCBTaWRlYmFyTGluayA9IHJlcXVpcmUoJy4vUGFnZUxpbmsuanMnKTtcclxuXHJcbmNsYXNzIFNlY3Rpb25OYXYgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMudGl0bGUgPVxyXG4gICAgICAgICAgICA8YSBjbGFzc05hbWU9e1wibGVhZCB0ZXh0LWRlY29yYXRpb24tbm9uZSBcIiArICh0aGlzLnByb3BzLmFjdGl2ZSA/IFwidGV4dC1kYXJrXCIgOiBcInRleHQtYmxhY2stNTBcIil9IGhyZWY9XCIjXCI+XHJcbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5zZWN0aW9uTmFtZX1cclxuICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5hY3RpdmUgPyA8c3BhbiBjbGFzc05hbWU9XCJtYXRlcmlhbC1pY29ucyB0ZXh0LXN1Y2Nlc3MgZmxvYXQtcmlnaHRcIiBzdHlsZT17e2ZvbnRTaXplOiAnMWVtJ319PnN5bmNfYWx0PC9zcGFuPiA6IFwiXCIgfVxyXG4gICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgdGhpcy5vblBhZ2VMaW5rQ2xpY2tlZCA9IHRoaXMub25QYWdlTGlua0NsaWNrZWQuYmluZCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBvblBhZ2VMaW5rQ2xpY2tlZChldmVudClcclxuICAgIHtcclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5vblBhZ2VMaW5rQ2xpY2tlZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25QYWdlTGlua0NsaWNrZWQoZXZlbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRTaWRlYmFyTGlua3MoKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLmRvY3VtZW50cy5tYXAoZG9jdW1lbnQgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gPFNpZGViYXJMaW5rIGtleT17ZG9jdW1lbnQudGl0bGV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25QYWdlTGlua0NsaWNrZWQ9e3RoaXMub25QYWdlTGlua0NsaWNrZWR9IGRvY3VtZW50PXtkb2N1bWVudH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudEFjdGl2ZUlkPXt0aGlzLnByb3BzLmRvY3VtZW50QWN0aXZlSWQgfS8+XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTVcIiBzdHlsZT17IHsnbGluZUhlaWdodCc6ICcwLjVlbSd9fT5cclxuICAgICAgICAgICAgICAgIHt0aGlzLnRpdGxlfVxyXG4gICAgICAgICAgICAgICAgPG5hdiBjbGFzc05hbWU9XCJuYXYgIGZsZXgtY29sdW1uIHB4LTEgbXQtM1wiIHN0eWxlPXsgeydsaW5lSGVpZ2h0JzogJzFlbSd9fT5cclxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5nZXRTaWRlYmFyTGlua3MoKX1cclxuICAgICAgICAgICAgICAgIDwvbmF2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gU2VjdGlvbk5hdjsiLCJcclxuY29uc3QgU2VjdGlvbk5hdiA9IHJlcXVpcmUoJy4vU2VjdGlvbk5hdicpO1xyXG5cclxubGV0IHdvcmtzcGFjZVRpdGxlID0gXCJNYXRoZW1hdGljc1wiO1xyXG5cclxubGV0IGRhc2hib2FyZEJ0bklkID0gXCJkYXNoYm9hcmQtYnRuXCI7XHJcbmxldCBzZXR0aW5nc0J0bklkID0gXCJzZXR0aW5ncy1idG5cIjtcclxuXHJcbmNsYXNzIFNpZGViYXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLm9uUGFnZUxpbmtDbGlja2VkID0gdGhpcy5vblBhZ2VMaW5rQ2xpY2tlZC5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50KClcclxuICAgIHtcclxuICAgICAgICBjb25zdCBob3ZlckNsYXNzZXMgPSAnc2hhZG93LXNtIGJnLXdoaXRlIHJvdW5kZWQnXHJcbiAgICAgICAgdmFyIGRhc2hib2FyZEJ0biA9ICQoJyMnICsgZGFzaGJvYXJkQnRuSWQpO1xyXG4gICAgICAgIGRhc2hib2FyZEJ0bi5ob3ZlcigoKSA9PiBkYXNoYm9hcmRCdG4uYWRkQ2xhc3MoaG92ZXJDbGFzc2VzKSwgKCkgPT4gZGFzaGJvYXJkQnRuLnJlbW92ZUNsYXNzKGhvdmVyQ2xhc3NlcykpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uUGFnZUxpbmtDbGlja2VkKGV2ZW50KVxyXG4gICAge1xyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLm9uUGFnZUxpbmtDbGlja2VkKVxyXG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uUGFnZUxpbmtDbGlja2VkKGV2ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRTZWN0aW9uTmF2cyhzZWN0aW9uKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IHNlY3Rpb25OYW1lID0gc2VjdGlvbi5zZWN0aW9uTmFtZTtcclxuICAgICAgICByZXR1cm4gPFNlY3Rpb25OYXYga2V5PXtzZWN0aW9uTmFtZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VjdGlvbk5hbWU9e3NlY3Rpb25OYW1lfSBkb2N1bWVudHM9e3NlY3Rpb24uZG9jdW1lbnRzfSBvblBhZ2VMaW5rQ2xpY2tlZD17dGhpcy5vblBhZ2VMaW5rQ2xpY2tlZH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnRBY3RpdmVJZD17dGhpcy5wcm9wcy5kb2N1bWVudEFjdGl2ZUlkfS8+XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLWxpZ2h0IG0tMCAgaC0xMDAgdy0xMDAgYm9yZGVyLXJpZ2h0ICBzaGFkb3ctc21cIj5cclxuICAgICAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBpZD17ZGFzaGJvYXJkQnRuSWR9IGNsYXNzTmFtZT1cImJ0biBmbG9hdC1sZWZ0IHAtYXV0byBtdC0xXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm1hdGVyaWFsLWljb25zIGFsaWduLWJvdHRvbVwiPmFwcHM8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIERhc2hib2FyZFxyXG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gaWQ9e3NldHRpbmdzQnRuSWR9IGNsYXNzTmFtZT1cImJ0biBidG4tbGlnaHQgYm9yZGVyLTAgcm91bmRlZC1jaXJjbGUgZmxvYXQtcmlnaHQgcC1hdXRvXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm1hdGVyaWFsLWljb25zIGFsaWduLW1pZGRsZSBweS0xXCI+c2V0dGluZ3M8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJyIC8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyIG10LTUgZGlzcGxheS00XCIgc3R5bGU9eyB7Zm9udFNpemU6ICcxLjVlbSd9fT4ge3dvcmtzcGFjZVRpdGxlfSA8L3A+XHJcbiAgICAgICAgICAgICAgICA8aHIgLz5cclxuXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB4LTNcIj5cclxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5zZWN0aW9ucy5tYXAoIHNlY3Rpb24gPT4gdGhpcy5nZXRTZWN0aW9uTmF2cyhzZWN0aW9uKSl9XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFNpZGViYXI7IiwiY2xhc3MgUGFnZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihpZCwgc2VjdGlvbiwgdGl0bGUsIGNvbnRlbnRFbGVtZW50cylcclxuICAgIHtcclxuICAgICAgICB0aGlzLmlkID0gaWQgIT0gbnVsbCA/IGlkIDogMDtcclxuICAgICAgICB0aGlzLnNlY3Rpb24gPSBzZWN0aW9uO1xyXG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcclxuICAgICAgICB0aGlzLmNvbnRlbnRFbGVtZW50cyA9IGNvbnRlbnRFbGVtZW50cyAgIT0gbnVsbCA/IGNvbnRlbnRFbGVtZW50cyA6IFtdO1xyXG4gICAgICAgIHRoaXMuaWRDb3VudGVyID0gMjsgLy8gYXJiaXRyYXJpbHkgY2hvc2VuLCBmb3Igc2ltcGxlIGVsZW1lbnQgaWQgdXNhZ2UuXHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlRWxlbWVudChlbGVtZW50SWQsIGNvbnRlbnQpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5jb250ZW50RWxlbWVudHNbZWxlbWVudElkXSA9IHt0eXBlOiAncCcsIGlkOiBlbGVtZW50SWQsIGNvbnRlbnQ6IGNvbnRlbnR9XHJcbiAgICB9XHJcblxyXG4gICAgYWRkRWxlbWVudChlbGVtZW50KVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IG5ld0lkID0gdGhpcy5pZENvdW50ZXIrKztcclxuICAgICAgICBjb25zdCBuZXdFbGVtZW50ID0ge3R5cGU6ICdwJywgaWQ6IG5ld0lkLCBjb250ZW50OiAnJ307XHJcbiAgICAgICAgdGhpcy5jb250ZW50RWxlbWVudHMucHVzaChuZXdFbGVtZW50KTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUGFnZTsiLCJjbGFzcyBXb3Jrc3BhY2VBUElcclxue1xyXG4gICAgYXN5bmMgZmV0Y2goKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBmZXRjaCgnL3dvcmtzcGFjZScpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGF3YWl0IGRhdGEuanNvbigpKTtcclxuICAgIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBXb3Jrc3BhY2VBUEk7IiwiY29uc3QgUGFnZSA9IHJlcXVpcmUoJy4vUGFnZS5qcycpO1xyXG5cclxuY2xhc3MgVm9sYXRpbGVSZXBvc2l0b3J5XHJcbntcclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLmRvY0lkcyA9IFswLCAxLCAyXTtcclxuICAgICAgICB0aGlzLnRpdGxlcyA9IFsnT3ZlcnZpZXcnLCAnVGVybWlub2xvZ3knLCAnRXhlcmNpc2VzJ107XHJcbiAgICAgICAgdGhpcy5zZWN0aW9ucyA9IFsnQ2FsY3VsdXMnLCAnRGlmZmVyZW50aWFsIEVxdWF0aW9ucycsICdMaW5lYXIgQWxnZWJyYSddO1xyXG4gICAgICAgIGNvbnN0IGRvY3MgPSBbXTtcclxuICAgICAgICBsZXQgaWRDb3VudGVyID0gMDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKylcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuc2VjdGlvbnMubGVuZ3RoOyBqKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHAxID0ge3R5cGU6J3AnLCBpZDogMCwgY29udGVudDogXCJIZWxsbyBmcm9tIFwiICsgdGhpcy50aXRsZXNbal19O1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcDIgPSB7dHlwZToncCcsIGlkOiAxLCBjb250ZW50OiBcIlRoaXMgaXMgbGluZSBcIiArIDIgKyBcIiBvZiBcIiArIHRoaXMudGl0bGVzW2pdfTtcclxuICAgICAgICAgICAgICAgIGxldCBjb250ZW50RWxlbWVudHMgPSBbcDEsIHAyXTtcclxuICAgICAgICAgICAgICAgIGxldCBkb2MgPSBuZXcgUGFnZShpZENvdW50ZXIsIHRoaXMuc2VjdGlvbnNbaV0sIHRoaXMudGl0bGVzW2pdLCBjb250ZW50RWxlbWVudHMpO1xyXG4gICAgICAgICAgICAgICAgZG9jcy5wdXNoKGRvYyk7XHJcbiAgICAgICAgICAgICAgICBpZENvdW50ZXIrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5kb2NzID0gZG9jcztcclxuICAgIH1cclxuXHJcbiAgICBnZXRTZWN0aW9ucygpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VjdGlvbnMubWFwKHNlY3Rpb24gPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBzZWN0aW9uRG9jdW1lbnRzID0gdGhpcy5kb2NzLmZpbHRlcihkb2MgPT4gZG9jLnNlY3Rpb24gPT0gc2VjdGlvbik7XHJcbiAgICAgICAgICAgIHJldHVybiB7c2VjdGlvbk5hbWU6IHNlY3Rpb24sIGRvY3VtZW50czogc2VjdGlvbkRvY3VtZW50c31cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXREb2N1bWVudChkb2NJZClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kb2NzW2RvY0lkXTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVEb2N1bWVudChkb2NJZCwgZG9jdW1lbnQpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5kb2NzW2RvY0lkXSA9IGRvY3VtZW50O1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBuZXcgVm9sYXRpbGVSZXBvc2l0b3J5KCk7Il19
