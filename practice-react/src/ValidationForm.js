import React, { Component } from 'react';
import { Input, Button } from '@material-ui/core';
const initialState = {
    name: '',
    email: '',
    password: '',
    nameError: '',
    emailError: '',
    passwordError: '',
};
export class ValidationForm extends Component {
    state = initialState;
    handleChange = (event, checkEvent) => {
        console.log(event.target.name);
        this.setState({ [event.target.name]: checkEvent ? event.target.checked : event.target.value })
    };
    handleCheck = (event) => {
        this.setState({ checkbox: event.target.checked })
    }
    validate = () => {

        //===========Approach-1==============

        // if(this.state.name===''){
        //     this.setState({
        //         nameError: 'Name field cannot be Empty'
        //     })
        // } else {
        //     this.setState({
        //         nameError: '',
        //     })
        // }
        // if(!this.state.email.includes('@')){
        //     this.setState({
        //         emailError: 'Invalid Email',
        //     })
        // } else {
        //     this.setState({
        //         emailError: '',
        //     })
        // }
        // if(this.state.password===''){
        //     this.setState({
        //         passwordError: 'Invalid Password',
        //     })
        // } else {
        //     this.setState({
        //         passwordError: '',
        //     })
        // }

        //========Approach-2============

        let nameError = "";
        let emailError = "";
        let passwordError = "";
        if (this.state.name === '') {
            nameError = 'Name field cannot be Empty';
        }
        if (!this.state.email.includes('@')) {
            emailError = 'Invalid Email';
        }
        if (this.state.password === '') {
            passwordError = 'Invalid Password';
        }
        if (nameError || emailError || passwordError) {
            this.setState({ nameError, emailError, passwordError });
            return false;
        }
        return true;
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const valid = this.validate();
        if (valid) {
            this.setState(initialState);
        }
        console.log(this.state);
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit} >
                <div>
                    <Input
                        name='name'
                        value={this.state.name}
                        onChange={this.handleChange}
                        placeholder="Enter Name" />
                </div>
                <div style={{ fontSize: '15px', color: 'red' }}>
                    {this.state.nameError}
                </div>
                <div>
                    <Input
                        name='email'
                        value={this.state.email}
                        onChange={this.handleChange}
                        placeholder="Enter Email" />
                </div>
                <div style={{ fontSize: '15px', color: 'red' }}>
                    {this.state.emailError}
                </div>
                <div>
                    <Input
                        name='password'
                        type='password'
                        value={this.state.password}
                        onChange={this.handleChange}
                        placeholder="Enter Password" />
                </div>
                <div style={{ fontSize: '15px', color: 'red' }}>
                    {this.state.passwordError}
                </div>
                <div>
                    <Button type="submit" style={{color:'white', backgroundColor: "blue", marginTop:'10px'}}>Submit</Button>
                </div>
            </form>
        )
    }
} 