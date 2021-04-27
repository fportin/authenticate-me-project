import React, { useState, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import VacationSpotFormPage from "./components/VacationSpotFormPage"
import VacationSpotPage from "./components/VacationSpotPage"
import VacationSpotEdit from "./components/VacationSpotEdit"
import FrontPage from './components/FrontPage';
import GreetingPage from './components/GreetingPage';


import * as sessionActions from './store/session';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);


  return (
    <div className='page__container'>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <FrontPage />
          </Route>
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/greeting">
            <GreetingPage />
          </Route>
          <Route exact path="/create-spot">
            <VacationSpotFormPage />
          </Route>
          <Route exact path="/spots/:spotId">
            <VacationSpotPage />
          </Route>
          <Route exact path="/spots/:spotId/edit">
            <VacationSpotEdit />
          </Route>
          <Redirect to='/' />
        </Switch>
      )}
    </div>
  );
}

export default App;
