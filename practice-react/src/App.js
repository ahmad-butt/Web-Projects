import logo from './logo.svg';
import './App.css';
import { Header } from './Components/Header';
import { Body } from './Body';
import { Counter } from './Components/Counter';
import { Name } from './Components/Names';
import { MyForm } from './MyForm';
import { ValidationForm } from './ValidationForm';
import { PersonAPI } from './PersonAPI';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" />
        <Header title="Shit Shit Everywhere" myFunc={(a, b) => { return a + b }} />
        <Body msg="Fuck Off Everyone" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Body msg="Fuck Off Everyone" />
        <Counter initialValue={0} />
        <Name initIndex={0} /> */}
        {/* <MyForm /> */}
        <PersonAPI />
        <ValidationForm />
      </header>
    </div>
  );
}

export default App;
