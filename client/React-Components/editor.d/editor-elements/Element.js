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
        this.hoverSpanId = 'elem' + this.props.elementId;
        this.hoverSpanSelector = 'elem' + this.props.elementId + ' span';
        let style = {};
        Object.assign(style, pStyle);

        if (this.props.type == 'h')
            Object.assign(style, hStyle);
        this.style = style;
        this.onInputChange = this.onInputChange.bind(this);
        this.toggleDragButtonVisibility = this.toggleDragButtonVisibility.bind(this);
    }

    onInputChange(event)
    {
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

    toggleDragButtonVisibility(event)
    {
        const elem = $('#' + this.hoverSpanSelector);
        if (event.type == 'mouseenter')
        {
            elem.removeClass('invisible')
                .addClass('visible');
        }
        else
        {
            elem.removeClass('visible')
                .addClass('invisible');
        }
    }

    render()
    {
        let type = "text";
        let className = "form-control my-2 border-0";
        let style = this.style;
        let placeholder = "Content goes here...";
        return (
            <div id={this.hoverSpanId} className="input-group flex-nowrap"
                 onMouseEnter={this.toggleDragButtonVisibility} onMouseLeave={this.toggleDragButtonVisibility}>
                <span className="btn p-0 mt-3 align-bottom material-icons invisible" style={ {cursor: 'move'}}
                      draggable onDrag={this.dragElement} onDrop={this.dropElement}>
                    drag_handle
                </span>
                <input type={type} value={this.props.content} placeholder={placeholder}
                       onChange={this.onInputChange} className={className} style={style} />
            </div>
        )
    }
}



module.exports = Element;