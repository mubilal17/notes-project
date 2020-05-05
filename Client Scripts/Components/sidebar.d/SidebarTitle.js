import * as React from "react";

class SidebarTitle extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <p className={this.props.className} style={ {fontSize: '1.5em'}}> {this.props.children} </p>
                <hr />
            </div>
        );
    }
}

module.exports = SidebarTitle;