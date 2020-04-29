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

        let style = {};
        Object.assign(style, pStyle);



        if (this.type == 'h')
            Object.assign(style, hStyle);
        this.style = style;
    }

    onFocus()
    {

    }

    render()
    {
        let type = "text";
        let className = "form-control my-2 border-0";
        let style = this.style;
        let placeholder = "Content goes here...";

        if (this.props.content != null)
            return <input type={type} value={this.props.content} className={className} style={style} />
        else
            return <input type={type} placeholder={placeholder} className={className} style={style} />
    }
}



module.exports = Element;