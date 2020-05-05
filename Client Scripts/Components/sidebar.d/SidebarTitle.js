import * as React from "react";

class SidebarTitle extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <p className={this.props.className} style={ {fontSize: '1.5em'}}>
                    {this.props.children}
                    <button className="btn border-0 text-right" href="#">
                        <span className="material-icons">more_vert</span>
                    </button>
                </p>
                <hr />

            </div>
        );
    }
}

module.exports = SidebarTitle;