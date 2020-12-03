import React from 'react';
import aceptar from "../../logos/aceptar-evento.png";
import crear from "../../logos/crear-evento.png";
import buscar from "../../logos/buscar-evento.png";
import valorar from "../../logos/valorar-trabajo.png";
import esperar from "../../logos/esperar.png";
import ww from '../../logos/wwsp.png';
import '../../css/home.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { auth } from "../../firebase";
import db from "../../index";
import authApi from "../../session/api"

function resetPassword() {
  var email = document.getElementById("emailRecu").value;
  if (email === "") {
      alert("Por favor ingresar mail para resetear contraseña.")
  } else {
      if (email.search("@") && email.search(/\./) > 0) {
          auth.sendPasswordResetEmail(email).then(function (value) {
              alert("Un mail con link se ha enviado a " + email + " para restablecer contraseña.");
              window.location.reload();
          })
              .catch(function (error) {
                  var errorMessage = error.message;
                  alert(errorMessage);
              });
      } else {
          alert("El formato del email is incorrecto.")
      }
  }
}

function signInMail() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  auth.signInWithEmailAndPassword(email, password).catch(function (error) {
    if (error.code === 'auth/wrong-password') {
      alert('Contraseña incorrecta.');
    } else {
      alert(error.message);
    }
  });
}

function createMailUser() {
  var nombre = document.getElementById("nombreReg").value;
  var apellido = document.getElementById("apellidoReg").value;
  var email = document.getElementById("emailReg").value;
  var password = document.getElementById("passwordReg").value;
  var password2 = document.getElementById("password2Reg").value;
  if (nombre === "") {
      alert("El nombre es requerido.");
  } else {
      if (apellido === "") {
          alert("El apellido es requerido.");
      } else {
          if (email === "") {
              alert("El email es requerido.");
          } else {
              if (email.search("@") && email.search(/\./) > 0) {
                  if (password === "") {
                      alert("La contraseña es requerida.");
                  } else {
                      if (password2 === "") {
                          alert("Por favor repetir la contraseña.");
                      } else {
                          if (password !== password2) {
                              alert("Las contraseñas ingresadas no son idénticas.");
                          } else {
                              if (password2.length < 6) {
                                  alert("La contraseña debe poseer al menos 6 caracteres.");
                              } else {
                                  auth.createUserWithEmailAndPassword(email, password).catch(function (error) {
                                      var errorMessage = error.message;
                                      alert(errorMessage)
                                  })
                                      .then(registeredUser => {
                                          db.collection("usuarios").doc(registeredUser.user.email).set({
                                              cuil: "",
                                              cuilValidado: "N",
                                              email: registeredUser.user.email,
                                              urlFoto: "",
                                              telefono: "",
                                              empresa: false,
                                              fullname: nombre + " " + apellido,
                                              facebook: "",
                                              instagram: "",
                                              linkedin: "",
                                              twitter: "",
                                              empleadoActivo: false,
                                              descripcionEmpleado: "",
                                              descripcionEmpleador: "",
                                              ocupacion: "",
                                              ubicacion: "",
                                          });
                                      });
                              }
                          }
                      }
                  }
              } else {
                  alert("El formato del email is incorrecto.");
              }
          }
      }
  }
}

class SiteScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "main",
    }
  }
  componentDidMount() {
    document.getElementById("usuarios-li").style.color = "#b2bbbd";
    document.getElementById("prestadores-li").style.color = "#b2bbbd";
    this.setState({ display: "main" });
  }
  mostrarMain = () => {
    document.getElementById("usuarios-li").style.color = "#b2bbbd";
    document.getElementById("prestadores-li").style.color = "#b2bbbd";
    this.setState({ display: "main" });
  }
  mostrarLogin = () => {
    this.setState({ display: "login" });
  }
  mostrarInstitucionalEmpleado = () => {
    document.getElementById("usuarios-li").style.color = "#b2bbbd";
    document.getElementById("prestadores-li").style.color = "#eeeeee";
    this.setState({ display: "institucionalEmpleado" });
  }
  mostrarInstitucionalEmpleador = () => {
    document.getElementById("usuarios-li").style.color = "#eeeeee";
    document.getElementById("prestadores-li").style.color = "#b2bbbd";
    this.setState({ display: "institucionalEmpleador" });
  }

  render() {
    var display = "";
    var tareas = "";

    if (this.state.display === "main") {
      display = 
      <div id="foto-institucional">
        <img alt="trabajadores" src="https://controlpublicidad.com/uploads/2019/09/empleados-contentos-120254.jpg"></img>
      </div>
    }     

    if (this.state.display === "login") {
      display =   
      <div className="col-4 offset-md-4 panel-login">
        <link href="//netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.css" rel="stylesheet" />
        <ul className="nav nav-tabs nav-fill header-login" id="myTab" role="tablist" style={{'color':'#fff'}}>
          <li className="nav-item">
            <a className="nav-link active" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Ingreso</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Registro</a>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
            <div className="login-form col-12">
              <input type="text" id="email" placeholder="Usuario/email" className="col-8"/>
              <input type="password" id="password" placeholder="Contraseña" className="col-8"/>
            </div>
            <a href="#login" onClick={signInMail} className="ui-button inactive register">
              <div className="btn btn-secondary" style={{'marginTop':'20px'}}>Acceder</div>
            </a>
            <div className="col-12" style={{'marginTop':'10px'}}>
              <div className="right form-actions">
                <a data-toggle="tab" href="#recuperarPass" role="tab" aria-controls="recuperarPass" aria-selected="false" className="ui-button inactive login">¿Olvidó su contraseña?</a>
              </div>
              <div className="left social-login">
                Ingresá con
                <i onClick={authApi.signInGoogle} className="fa fa-fw fa-lg fa-google" style={{cursor: 'pointer'}}></i>
              </div>
            </div>
          </div>
          <div className="tab-pane fade" id="recuperarPass" role="tabpanel" aria-labelledby="profile-tab">
            <div className="login-form col-12">
              <p>Ingrese un email para recuperar su contraseña</p>
              <input type="text" id="emailRecu" placeholder="Email" className="col-8"/>
            </div>
            <div className="btn btn-secondary" style={{'marginTop':'20px'}}>
              <a href="#login" onClick={resetPassword} className="ui-button inactive register">Recuperar contraseña</a>
            </div>
          </div>
          <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
            <div className="login-form col-12">
              <input type="text" id="nombreReg" placeholder="Nombre" />
              <input type="text" id="apellidoReg" placeholder="Apellido" />
              <input type="text" id="emailReg" placeholder="Email" />
              <input type="password" id="passwordReg" placeholder="Contraseña" />
              <input type="password" id="password2Reg" placeholder="Repetir Contraseña" />
            </div>
            <a href="#login" onClick={createMailUser} className="ui-button inactive register">
              <div className="btn btn-secondary" style={{'marginTop':'20px', 'marginBottom':'10px'}}>Registrarse</div>
            </a>
          </div>
        </div>
      </div>

      // <div>
      //   <link href="//netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.css" rel="stylesheet" />
      //   <link href="https://s3-us-west-2.amazonaws.com/s.cdpn.io/67239/animate.min.css" rel="stylesheet" />
      //   <div className="ui-panel login-panel">
      //     <header>
      //       <div className="left logo">
      //         <a href="#logo"><span>WhiteWork</span></a>
      //       </div>
      //     </header>

      //     <div className="login-form">
      //       <div className="subtitle">Ingresar o <a href="#register" onClick={this.props.registrarseModal} className="ui-button inactive register">Registrarse</a></div>
      //       <input type="text" id="email" placeholder="Usuario/email" />
      //       <input id="password" type="password" placeholder="Contraseña" />
      //     </div>

      //     <footer>
      //       <div className="right form-actions">
      //         <a href="#password" onClick={this.props.resetModal} className="ui-button inactive login">¿Olvidó su contraseña?</a>
      //         {/* <a href="#login" onClick={signInMail} className="ui-button inactive register">Login</a> */}
      //       </div>
      //       <div className="left social-login">
      //         Ingresá con
      //         <i onClick={this.props.signInFacebook} className="fa fa-fw fa-lg fa-facebook" style={{cursor: 'pointer'}}></i>
      //         <i onClick={this.props.signInGoogle} className="fa fa-fw fa-lg fa-google" style={{cursor: 'pointer'}}></i>
      //       </div>
      //     </footer>
      //   </div>
      // </div>
    }

    if (this.state.display === "institucionalEmpleado") {
      tareas = 
      <div className="col">
        <ul className="task-list" id="empleado-tareas">
          <li>
            <div className="tarjeta">
              <img className="foto-trabajo" src={buscar} alt="persona" />
              <div className="content-tarea">
                <h2>1. Buscar Trabajo</h2>
                <h3>Podrás buscar el trabajo al que deseas postularte.</h3>
              </div>
            </div>
          </li>
          <li>
            <div className="tarjeta">
              <img className="foto-trabajo" src={esperar} alt="persona" />
              <div className="content-tarea">
                <h2>2. Esperar aceptación</h2>
                <h3>Momento de esperar a que tu postulación sea aceptada.</h3>
              </div>
            </div>
          </li>
          <li>
            <div className="tarjeta">
              <img className="foto-trabajo" src={valorar} alt="persona" />
              <div className="content-tarea">
                <h2>3. Puntuar a tu empleador</h2>
                <h3>Podrás colocar puntuación sobre el trato recibido por tu empleador.</h3>
              </div>
            </div>
          </li>
        </ul>
      </div>
    } 

    if(this.state.display === "institucionalEmpleador"){
      tareas = 
      <div className="col">
          <ul className="task-list" id="empleador-tareas">
            <li>
              <div className="tarjeta">
                <img className="foto-trabajo" src={crear} alt="persona" />
                <div className="content-tarea">
                  <h2>1. Crear Evento</h2>
                  <h3>Definir fecha, trabajo y pagos.</h3>
                </div>
              </div>
            </li>
            <li>
              <div className="tarjeta">
                <img className="foto-trabajo" src={esperar} alt="persona" />
                <div className="content-tarea">
                  <h2>2. Esperar postulantes</h2>
                  <h3>Momento de esperar a quienes quieran trabajar en tus eventos.</h3>
                </div>
              </div>
            </li>
            <li>
              <div className="tarjeta">
                <img className="foto-trabajo" src={aceptar} alt="persona" />
                <div className="content-tarea">
                  <h2>3. Aceptar postulantes</h2>
                  <h3>Aceptar o rechazar a los postulantes.</h3>
                </div>
              </div>
            </li>
            <li>
              <div className="tarjeta">
                <img className="foto-trabajo" src={valorar} alt="persona" />
                <div className="content-tarea">
                  <h2>4. Puntuar </h2>
                  <h3>Una vez que el trabajo se ha consumado, podrás puntuar al trabajador.</h3>
                </div>
              </div>
            </li>
          </ul>
      </div>
    }
    
    return (
      <div className="App">
        {/* HEADER */}
        <div className='navbar'>
          <ul className="left-ui">
            <li><div id="logo"><img className='logo' alt="log" src={ww} /></div></li>
            <li className='home' onClick={this.mostrarMain}>WHITEWORK</li>
            <li id="prestadores-li" onClick={this.mostrarInstitucionalEmpleado}>Modo Prestador</li>
            <li id="usuarios-li" onClick={this.mostrarInstitucionalEmpleador}>Modo Empleador</li>
          </ul>
          <ul className='right-ui nombre-usuario'>
            <li id="ingresar-li" onClick={this.mostrarLogin}>Ingresar</li>
            <li id="registrate-li" onClick={this.mostrarLogin}>Registrate</li>
          </ul>
        </div>
        {/* HEADER */}

        <div className="col-sm-12">
          {display}
        </div>
        
        </div>
    );
  }
}

export default SiteScreen;