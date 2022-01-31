import logo from './logo.svg';
import axios from 'axios';
import './App.css';

function App() {
const makeApiRequest = () => {
  axios('/auth/api/current-user-posts').then(response => {
    console.log('response', response);
  })
}

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.11
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <button onClick={makeApiRequest}>Make API request</button>
    </div>
  );
}

export default App;
