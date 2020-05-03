class EditElementButton extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {active: false};
    }

    componentDidMount()
    {
        let element = $('#' + this.props.id);
        console.log(element);
        element.parent().on('mouseenter', () => {
            element.removeClass('invisible').addClass('visible');
        });

        element.parent().on('mouseleave',  () => {
            if (!this.state.active)
                element.removeClass('visible').addClass('invisible');
        });
        element.on('focus', () => this.setState({active: true}));
        element.on('blur', () => this.setState({active: false}));

        $('#' + this.props.id).popover({
            title: 'Edit Element',
            content: 'testing body does it work',
            container: 'body',
            placement: 'top',
            trigger: 'focus'
        });
    }


    render()
    {
        return (
            <button id={this.props.id} type="button" className="btn invisible p-0 mt-3 align-bottom" >
                    <span className="material-icons">edit</span>
            </button>
        )
    }
}

module.exports = EditElementButton;