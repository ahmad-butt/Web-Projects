class IssueFilter extends React.Component {
    render() {
        return (
            <div>
                <h1>Issue Filter Placeholder</h1>
            </div>
        )
    }
}

class IssueRow extends React.Component {
    render() {
        return (
            <tr style={this.props.rowStyle}>
                <td style={this.props.rowStyle}>{this.props.issue.id}</td>
                <td style={this.props.rowStyle}>{this.props.issue.status}</td>
                <td style={this.props.rowStyle}>{this.props.issue.owner}</td>
                <td style={this.props.rowStyle}>{this.props.issue.created ? this.props.issue.created : 'No Date Assigned'}</td>
                <td style={this.props.rowStyle}>{this.props.issue.effort}</td>
                <td style={this.props.rowStyle}>{this.props.issue.due ? this.props.issue.due : 'No Date Assigned'}</td>
                <td style={this.props.rowStyle}>{this.props.issue.title}</td>
            </tr>
        )
    }
}

class IssueTable extends React.Component {
    render() {
        const rowStyle = { border: '1px solid silver', padding: 4 };
        return (
            <table style={{ borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={rowStyle}>ID</th>
                        <th style={rowStyle}>Status</th>
                        <th style={rowStyle}>Owner</th>
                        <th style={rowStyle}>Created</th>
                        <th style={rowStyle}>Effort</th>
                        <th style={rowStyle}>Due Date</th>
                        <th style={rowStyle}>Title</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.issues.map(issue => <IssueRow issue={issue} rowStyle={rowStyle} />)
                    }
                </tbody>
            </table>
        )
    }
}
class IssueAdd extends React.Component {
    constructor() {
        super();
        this.state = { owner: '', title: '' };
        this.handleOwner = this.handleOwner.bind(this);
        this.handleTitle = this.handleTitle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleOwner(e) {
        e.preventDefault();
        this.setState({ owner: e.target.value });
    }
    handleTitle(e) {
        e.preventDefault();
        this.setState({ title: e.target.value });
    }
    handleSubmit(e) {
        e.preventDefault();
        const issue = {
            owner: this.state.owner,
            title: this.state.title,
            due: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 10).toISOString(),
        }
        this.props.createIssue(issue);
        this.setState({ owner: '', title: '' });
    }
    render() {
        return (
            <>
                <form name='issueAdd' onSubmit={this.handleSubmit}>
                    <input value={this.state.owner} onChange={this.handleOwner} type='text' name='owner' placeholder='Owner' />
                    <input value={this.state.title} onChange={this.handleTitle} type='text' name='title' placeholder='Title' />
                    <button>Add</button>
                </form>
            </>
        )
    }
}

async function graphQLFetch(query, variables = {}) {
    try {
        const response = await fetch('http://localhost:3000/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, variables }),
        });
        const result = await response.json();
        if (result.errors) {
            const error = result.errors[0];
            if (error.extensions.code === 'BAD_USER_INPUT') {
                const details = error.extensions.exception.errors.join('\n');
                alert(`${error.message}:\n${details}`)
            } else {
                alert(`${error.extensions.code}: ${error.message}`);
            }
        }
        return result;
    } catch (error) {
        alert(`Error in sending Data to server ${error.message}`);
    }
}

class IssueList extends React.Component {
    constructor() {
        super();
        this.state = { issues: [] };
        this.createIssue = this.createIssue.bind(this);
    }
    componentDidMount() {
        this.loadData();
    }
    loadData = async () => {

        const query = `
            query{
                issueList {
                    id
                    title
                    status
                    owner
                    effort
                    created
                    due
                }
            }
        `;

        const result = await graphQLFetch(query);

        if (result) {
            this.setState({ issues: result.data.issueList });
        }
    }

    async createIssue(newIssue) {
        const query = `mutation temp ($newIssue: IssueInputs!) {
            setIssueAdd(issue: $newIssue) {
              id
            }
        }`

        // const response = await fetch('/graphql',{
        //     method: 'POST',
        //     headers: {'Content-Type': 'application/json'},
        //     body: JSON.stringify({query, variables: {newIssue}})
        // });

        const response = await graphQLFetch(query, { newIssue });

        if (response) {
            this.loadData();
        }
    }
    render() {
        return (
            <>
                <IssueFilter />
                <hr />
                <IssueTable issues={this.state.issues} />
                <hr />
                <IssueAdd createIssue={this.createIssue} />
            </>
        )
    }
}

const element = <IssueList />
ReactDOM.render(element, document.getElementById('contents'));