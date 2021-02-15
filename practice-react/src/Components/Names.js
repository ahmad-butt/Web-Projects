import React, { Component } from 'react';
export class Name extends Component {
    constructor(props) {
        super(props);
        this.state = {
            names: [
                "Ahmad Butt",
                "Ali Butt",
                "Abdullah Butt",
                "Akram Butt",
            ],
            ids: [
                1, 2, 3, 4,
            ], index: props.initIndex,
            visible: true,
        }
    }
    nextName = () => {
        if (this.state.index < (this.state.names.length - 1)) {
            this.setState({
                index: this.state.index + 1,
            })
        }
        else {
            this.setState({
                index: 0,
            })
        }
    }
    previousName = () => {
        if (this.state.index > 0) {
            this.setState({
                index: this.state.index - 1,
            })
        }
        else {
            this.setState({
                index: this.state.names.length - 1,
            })
        }
    }
    display = () => {
        this.setState({
            state: this.state.visible = !this.state.visible,
        })
    }
    render() {
        let buttonText = this.state.visible ? 'Hide' : 'Show';
        return (
            <div>
                {this.state.visible ? <><h1>{this.state.names[this.state.index]}</h1>
                    <h1>{this.state.ids[this.state.index]}</h1> </> : null}
                <button onClick={this.nextName}>Next Name</button>
                <button onClick={this.previousName}>Previous Name</button>
                <button onClick={this.display}>{buttonText}</button>
            </div>
        )
    }
}