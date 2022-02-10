import logo from './logo.svg';
import './App.css';

import {dep_calc} from "./dep_calc";
import {cred_calc} from "./cred_calc";
import {Navigation} from "./Navigation";

import {BrowserRouter, Route, Switch} from 'react-router-dom';

function App() {
  return (
      <BrowserRouter>
        <div className="container">
          <h3 className="m-3 d-flex justify-content-center">
              Калькуляторы
          </h3>

          <Navigation/>

          <Switch>
            <Route path='/' component={cred_calc} exact/>
            <Route path='/depcalc' component={dep_calc}/>
          </Switch>

        </div>
      </BrowserRouter>
  );
}

export default App;