class AddElementButton extends React.Component {

    render()
    {
        return (
            <button className="btn btn-sm btn-outline-light text-muted border-0 ml-5" href="#" onClick={this.props.onElementClicked}>
                <span className="material-icons align-middle py-1">vertical_align_top</span>
                {this.props.children}
            </button>
        );
    }
}

module.exports = AddElementButton;