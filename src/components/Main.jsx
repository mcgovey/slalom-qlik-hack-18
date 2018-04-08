import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PageOne from './PageOne';
import PageTwo from './PageTwo';
// import Schedule from './Schedule'

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"

// <Route path='/roster' component={Roster}/>
// <Route path='/schedule' component={Schedule}/>

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={PageOne} />
      <Route path="/compliance" component={PageTwo} />
    </Switch>
  </main>
);

export default Main;
