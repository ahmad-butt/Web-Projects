import React, { Component } from 'react';
export class Header extends Component {
    render() {
        return (
            <>
                <h1>
                    {this.props.title}
                </h1>
                <h1>
                    {this.props.myFunc(10, 12)}
                </h1>
            </>
        );
    }
}