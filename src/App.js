import React from 'react';
import { useUser } from "./session/hooks";
import Main from './Main';


function App() {
  const user = useUser();
  return (
    <Main photoURL={user.photoURL} displayName={user.displayName} email={user.email}/>   
  );
}

export default App;
