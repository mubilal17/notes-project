const EditElementButton = require('./EditElementButton');
const DragButton = require('./DragButton');

const pStyle = {
    fontSize: '1.25em'
};

const hStyle = {
    fontWeight: 'bold',
    fontSize: '1.75em'
};


class Element extends React.Component{
    constructor(props)
    {
        super(props);
        this.dragButtonId = this.props.id + 'dragButton'
        this.editElementId = this.props.id + 'editElement';
        let style = {};
        Object.assign(style, pStyle);

        if (this.props.type == 'h')
            Object.assign(style, hStyle);
        this.style = style;
        this.onInputChange = this.onInputChange.bind(this);
    }

    onInputChange(event)
    {
        console.log(this.props);
        if (this.props.onContentChange)
        {
            const eventData = {elementId: this.props.elementId, content: event.target.value};
            this.props.onContentChange(eventData);
        }
    }

    render()
    {
        let type = "text";
        let className = "form-control ml-2 my-2 border-0";
        let style = this.style;
        let placeholder = "Content goes here...";
        return (
            <div className="input-group flex-nowrap"
                 onMouseEnter={this.onElementHover} onMouseLeave={this.onElementHover}>
                <div>
                    <DragButton id={this.dragButtonId} />
                    <EditElementButton id={this.editElementId} />
                </div>
                <input type={type} value={this.props.content} placeholder={placeholder}
                       onChange={this.onInputChange} className={className} style={style} />
            </div>
        )
    }
}



module.exports = Element;