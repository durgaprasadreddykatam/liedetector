import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Login from './pages/Login';
import '../index.css'
import Validator from './components/Validator';
import ToBeDeleteted from './pages/ToBeDeleteted';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

// /* Optional CSS utils that can be commented out */
// import '@ionic/react/css/padding.css';
// import '@ionic/react/css/float-elements.css';
// import '@ionic/react/css/text-alignment.css';
// import '@ionic/react/css/text-transformation.css';
// import '@ionic/react/css/flex-utils.css';
// import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Register from './pages/Register';
import Home from './pages/Home';
import Update from './pages/Update';
import Viewintro from './pages/Viewintro';
import Test from './pages/Test';
import TestNow from './components/TestNow';
import BluetoothDevices from './components/ BluetoothDevices';
import PredictionHistory from './pages/PredictionHistory';


setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <Route exact path="/">
          <Login/>
        </Route> 
        <Route exact path="/login">
          <Login/>
        </Route>
        <Route exact path="/Register">
          <Register/>
        </Route>
        <Route exact path="/home">
          <Validator>
            <Home decodedToken={undefined}/>
          </Validator>
        </Route>
        <Route exact path="/taketest">
          <Validator>
            <Test decodedToken={undefined}/>
          </Validator>
        </Route>  
        <Route exact path="/taketestnow">
          <TestNow/>
        </Route> 
        
        <Route exact path="/history">
          <PredictionHistory/>
        </Route> 
        {/* //Testing a Bluetooth Device */}
        {/* <Route exact path="/">
          <BluetoothDevices/>
        </Route> */}

        {/* //Testing Page  */}
        {/* <Route exact path="/">
          <ToBeDeleteted/>
        </Route> */}
        
        
          
        

        <Route exact path="/Account">
        <Validator>
            <Update decodedToken={undefined}/>
          </Validator>
        </Route>
        <Route exact path="/viewintro">
        <Validator>
            <Viewintro/>
          </Validator>
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
