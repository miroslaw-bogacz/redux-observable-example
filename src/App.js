import * as React from 'react';
import './App.css';
import { PeopleComponent } from './people/containers/people.container';



class App extends React.Component {
  render() {
    return (
      <PeopleComponent />
    );
  }
}

export default App;
