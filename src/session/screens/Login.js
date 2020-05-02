import React from "react";
import SwitchModals from "./SwitchModals";
import './Login.css';

const LoginScreen = ({ signInGoogle, signInFacebook,signInTwitter, status }) => ( 
      <div>
        {status === "init" && <span>Intentando de restaurar sesión...</span>}
        {status === "restored" && 
         <SwitchModals signInFacebook={signInFacebook} signInGoogle={signInGoogle} signInTwitter={signInTwitter}/>
        }
      </div>
      );
      
export default LoginScreen;