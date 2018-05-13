import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import Login from './Screens/Auth';
import Main from './Screens/Main';
import SignUp from './Screens/SignUp';


const RouterComponent = () => {
  return (
    <Router sceneStyle={{  backgroundColor: 'rgba(200,200,150,0.8)' }}>
      <Scene>
      <Scene key="auth">
        <Scene key="login" component={Login} hideNavBar={true} />
        <Scene key="signup" component={SignUp} hideNavBar={true} />
      </Scene>

      <Scene key="home">
        <Scene key="main" component={Main} hideNavBar={true} />
      </Scene>
    </Scene>
    </Router>
  );
};

export default RouterComponent;
