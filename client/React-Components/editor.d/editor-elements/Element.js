const EditElementButton = require('./EditElementButton');

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
        this.hoverSpanId = this.props.id + 'hoverdragspan'
        this.editElementId = this.props.id + 'editElement';
        let style = {};
        Object.assign(style, pStyle);

        if (this.props.type == 'h')
            Object.assign(style, hStyle);
        this.style = style;
        this.onInputChange = this.onInputChange.bind(this);
        this.onElementHover = this.onElementHover.bind(this);
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

    dragElement(event)
    {
        console.log('dragging');
    }

    dropElement(event)
    {
        console.log('dropping');
    }

    onElementHover(event)
    {
        const dragElem = $('#' + this.hoverSpanId);
        if (event.type == 'mouseenter')
        {
            dragElem.removeClass('invisible')
                .addClass('visible');
        }
        else
        {
            dragElem.removeClass('visible')
                .addClass('invisible');
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
                <span id={this.hoverSpanId} className="btn  btn-outline-light p-0 mt-3 align-bottom material-icons invisible" style={ {cursor: 'move'}}
                      draggable onDrag={this.dragElement} onDrop={this.dropElement}>
                    drag_handle
                </span>
                <EditElementButton id={this.editElementId}/>

                <input type={type} value={this.props.content} placeholder={placeholder}
                       onChange={this.onInputChange} className={className} style={style} />
            </div>
        )
    }
}



module.exports = Element;