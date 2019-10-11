import React from 'react';
import LoginOrSignUp from './components/loginOrSignUpParent';
import Dashboard from './components/dashboard';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import logo from './logo.svg';
import './style/main.scss';
import { PrimaryButton } from 'office-ui-fabric-react';

interface IAppProps {

}

const App: React.FC<IAppProps> = props => {

  return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LoginOrSignUp} />
          <Route exact path="/tickets" component={Dashboard}/>
        </Switch>
      </BrowserRouter>
  );
}

export default App;
