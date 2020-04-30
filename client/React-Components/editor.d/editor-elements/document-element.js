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
        this.type = this.props.type;
        this.state = {content: this.props.content}

        let style = {};
        Object.assign(style, pStyle);



        if (this.type == 'h')
            Object.assign(style, hStyle);
        this.style = style;
        this.onInputChange = this.onInputChange.bind(this);
    }

    onInputChange(event)
    {
        console.log('typing...');
        this.setState({content: event.target.value})
    }

    render()
    {
        let type = "text";
        let className = "form-control my-2 border-0";
        let style = this.style;
        let placeholder = "Content goes here...";

        return <input type={type} value={this.state.content} placeholder={placeholder}
                      onChange={this.onInputChange} className={className} style={style} />
    }
}



module.exports = Element;