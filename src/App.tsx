import React from 'react';
import MainComponent from './components/mainLogin';
import CreateOrUpdateTicketForm from './components/createOrUpdateTicketForm';
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
          <Route exact path="/" component={MainComponent} />
          <Route exact path="/tickets" component={CreateOrUpdateTicketForm}/>
        </Switch>
      </BrowserRouter>
  );
}

export default App;
