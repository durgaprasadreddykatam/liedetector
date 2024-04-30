import {  Route } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Login from './pages/Login';
import '../index.css'
import Validator from './components/Validator';
import Register from './pages/Register';
import Home from './pages/Home';
import Update from './pages/Update';
import Viewintro from './pages/Viewintro';
import Test from './pages/Test';
import PredictionHistory from './pages/PredictionHistory';
import { defaultUserDetails } from './components/userTypes';
import React from 'react';

const App: React.FC = () => (
  <IonApp>
  <IonReactRouter>
    <IonRouterOutlet onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}>
      <Route path="/">
        <Login/>
      </Route> 
      <Route path="/login">
        <Login/>
      </Route>
      <Route path="/Register">
        <Register/>
      </Route>
      <Route  path="/home">
        <Validator>
          <Home decodedToken={defaultUserDetails}/>
        </Validator>
      </Route>
      <Route  path="/taketest">
        <Validator>
          <Test decodedToken={defaultUserDetails}/>
        </Validator>
      </Route>   
      
      <Route  path="/history">
        <Validator>
          <PredictionHistory decodedToken={defaultUserDetails}/>
        </Validator>
      </Route> 
      <Route  path="/Account">
        <Validator>
          <Update decodedToken={defaultUserDetails}/>
        </Validator>
      </Route>
      <Route  path="/viewintro">
        <Validator>
          <Viewintro/>
        </Validator>
      </Route>
    </IonRouterOutlet>
  </IonReactRouter>
</IonApp>
);

export default App;
