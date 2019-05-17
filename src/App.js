import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Classic from './pages/classic';
import Hooks from './pages/hooks';

function App() {
  return (
    <Router>
      <header>
        <Link className="button" to="/classic/furniture">Classic</Link>
        <Link className="button" to="/hooks/furniture">Hooks</Link>
      </header>
      
      <Route exact path="/classic" component={Classic} />
      <Route exact path="/classic/:id" component={Classic} />
      <Route exact path="/hooks" component={Hooks} />
      <Route exact path="/hooks/:id" component={Hooks} />
    </Router>
  );
}

export default App;
