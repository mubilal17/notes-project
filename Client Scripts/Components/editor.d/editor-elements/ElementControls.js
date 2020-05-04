
class ElementControls extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {active: false};
    }

    componentDidMount()
    {
        const container = $('#' + this.props.id);
        const dragButton = container.children(':first');
        const editButton = container.children(':last');

        editButton.popover({
            title: 'Edit Element',
            content: 'testing body does it work',
            container: 'body',
            placement: 'top',
        });

        container.parent().on('mouseenter', () => {
            this.toggleVisibility(dragButton, true);
            this.toggleVisibility(editButton, true);
        });

        container.parent().on('mouseleave',  () => {
            this.toggleVisibility(dragButton, false);
            if (this.state.active == false)
                this.toggleVisibility(editButton, false);
        });

        editButton.on('click', () => {
            let active = !this.state.active;
            this.togglePopoverState((active));
        });
        editButton.on('focusout', () => {
            this.toggleVisibility(editButton, false);
            this.togglePopoverState(false);

        });

    }

    toggleVisibility(jQueryElement, visible)
    {
        if (visible)
            jQueryElement.removeClass('invisible').addClass('visible');
        else
            jQueryElement.removeClass('visible').addClass('invisible');
    }
    togglePopoverState(active)
    {
        const button = $('#' + this.props.id + ' button');
        button.popover(active ? 'show' : 'hide');
        this.setState({active: active});
    }
    render()
    {
        return (
            <div id={this.props.id} >
                <button  type="button" style={ {cursor: 'move'}}
                        className="btn p-0 mt-3 align-bottom invisible" >
                    <span className="material-icons">drag_handle</span>
                </button>
                <button type="button" className="btn p-0 mt-3 align-bottom invisible" >
                    <span className="material-icons">edit</span>
                </button>
            </div>
        )
    }
}

module.exports = ElementControls;