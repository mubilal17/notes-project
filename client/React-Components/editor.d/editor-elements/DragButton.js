class DragButton extends React.Component {
    constructor(props)
    {
        super(props);
    }

    componentDidMount()
    {
        let element = $('#' + this.props.id);
        element.parent().on('mouseenter', () => {
            element.removeClass('invisible').addClass('visible');
        });

        element.parent().on('mouseleave',  () => {
            element.removeClass('visible').addClass('invisible');
        });
    }

    render()
    {
        return (
            <button id={this.props.id} type="button" style={ {cursor: 'move'}} draggable
                    className="btn invisible p-0 mt-3 align-bottom" >
                <span className="material-icons">drag_handle</span>
            </button>
        )
    }
}


module.exports = DragButton;