import React, { Component } from 'react';
export class MyForm extends Component {
    state = {
        name: '',
        text: '',
        checkbox: 'false',
        opt: '',
    };
    handleChange = (event, checkEvent) => {
        console.log(event.target.name);
        this.setState({ [event.target.name]: checkEvent ? event.target.checked : event.target.value })
    };
    handleCheck = (event) => {
        this.setState({ checkbox: event.target.checked })
    }
    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state);
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit} >
                <div>
                    <input
                        name='name'
                        value={this.state.name}
                        onChange={this.handleChange}
                        placeholder="Enter Name" />
                </div>
                <div>
                    <textarea
                        name='text'
                        value={this.state.text}
                        onChange={this.handleChange}
                        placeholder="Enter Text" />
                </div>
                <div>
                    <input
                        name='checkbox'
                        type="checkbox"
                        onChange={this.handleChange} />
                </div>
                <div>
                    <select
                        name='opt'
                        value={this.state.opt}
                        onChange={this.handleChange}>
                        <option>Ahmad</option>
                        <option>Ali</option>
                        <option>Abdullah</option>
                    </select>
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        )
    }
} 