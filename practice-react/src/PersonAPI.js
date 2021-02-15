import React, { Component } from 'react';
export class PersonAPI extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            person: [],
        };
    }
    async componentDidMount() {
        const url = 'https://api.randomuser.me/?results=5';
        const response = await fetch(url);
        const data = await response.json();
        this.setState({ person: data.results, loading: false })
        // console.log(data.results[0].name.first);
    }
    render() {
        if (this.state.loading) {
            return <div>Still Loading</div>
        }
        if (!this.state.person) {
            return <div>No Person</div>
        }
        return (
            <div>
                {this.state.person.map((person, i) => (
                    <div key={`some-person-${i}`}>
                        <div>{person.name.title}</div>
                        <div>{person.name.first}</div>
                        <div>{person.name.last}</div>
                        <img src={person.picture.large} />
                    </div>
                ))}
            </div>
        )
    }
}