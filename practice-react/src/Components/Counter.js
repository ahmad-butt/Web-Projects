import React, { Component } from 'react';

export class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: props.initialValue,
        }
    }
    increment = () => {
        this.setState({
            count: this.state.count + 1,
        })
    }
    decrement = () => {
        // console.log(this);
        this.setState({
            count: this.state.count - 1,
        })
    }
    reset = ()=>{
        this.setState({
            count: this.state.count*0,
        })
    }
    render() {
        return (
            <div>
                <h1>Count: {this.state.count}</h1>
                <button onClick={this.increment}>Increment</button>
                <button onClick={this.decrement}>Decrement</button>
                <button onClick={this.reset}>Reset</button>
            </div>
        );
    }
}