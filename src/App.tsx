import React from 'react';
import MainLogin from './components/mainLogin';
// import logo from './logo.svg';
import './style/main.scss';
import { PrimaryButton } from 'office-ui-fabric-react';

const App: React.FC = () => {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <MainLogin/>
      
    </div>
  );
}

export default App;
