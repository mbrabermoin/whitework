import React from 'react';
import aceptar from "../../logos/aceptar-evento.png";
import crear from "../../logos/crear-evento.png";
import buscar from "../../logos/buscar-evento.png";
import valorar from "../../logos/valorar-trabajo.png";
import esperar from "../../logos/esperar.png";
import ww from '../../logos/wwsp.png';
import wwblack from "../../logos/whiteWork-black.png";
import homeSlide1 from "../../logos/home slide 1.jpg";
import homeSlide3 from "../../logos/home slide 3.jpg";
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
    document.getElementById("contentDiv").style.opacity = 0;
    setTimeout(function(){
      document.getElementById("contentDiv").style.opacity = 1;
    }, 200);
    document.getElementById("usuarios-li").style.color = "#b2bbbd";
    document.getElementById("prestadores-li").style.color = "#b2bbbd";
    this.setState({ display: "main" });
  }
  mostrarLogin = () => {
    document.getElementById("contentDiv").style.opacity = 0;
    setTimeout(function(){
      document.getElementById("contentDiv").style.opacity = 1;
    }, 200);
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
      <div>
      <div className="col-12 row" style={{padding: 0}}>
         <div id="carouselExampleControls" className="carousel slide col-8" data-ride="carousel" style={{minHeight: '527px', paddingLeft: '0px'}}>
            <div className="carousel-inner" style={{height: '527px'}}>
              <div className="carousel-item active">
                <img alt="trabajadores" src={homeSlide3}></img>
              </div>
              <div className="carousel-item">
                <img alt="..." src={homeSlide1}></img>
              </div>
            </div>
            <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="sr-only">Next</span>
            </a>
          </div>
          <div className="container col-4" style={{marginBottom: '20px'}}>
              <div className="row">
                <div className="col-sm-4" style={{marginTop: '36%'}}>
                    <div className="first-block">
                      <i className="fa fa-fw fa-lg fa-hourglass-half" style={{cursor: 'pointer', fontSize: '40px', marginBottom: '16px', color: '#3e474f'}}></i>
                      <div className="h4-height">
                        <h4 className="text-green" style={{fontSize: '20px', fontWeight: 'bold'}}>Inmediatez</h4>
                      </div>
                        <p>Comenzá a trabajar en pocos minutos</p>
                    </div>
                </div>
                <div className="col-sm-4" style={{marginTop: '10%'}}>
                    <div className="second-block">
                      <div className="h4-height">
                        <h4 className="text-green" style={{fontSize: '20px', fontWeight: 'bold'}}>Sin intermediarios</h4>
                      </div>
                        <p>Contactate directamente con la contraparte</p>
                    </div>
                      <i className="fa fa-fw fa-lg fa-handshake-o" style={{cursor: 'pointer', fontSize: '40px', color: '#3e474f'}}></i>
                </div>
                <div className="col-sm-4" style={{marginTop: '36%'}}>
                    <div className="first-block">
                      <i className="fa fa-fw fa-lg fa-users" style={{cursor: 'pointer', fontSize: '40px', marginBottom: '16px', color: '#3e474f'}}></i>
                      <div className="h4-height">
                        <h4 className="text-green" style={{fontSize: '20px', fontWeight: 'bold'}}>Seguridad</h4>
                      </div>
                        <p>Encontrá empleados de confianza para tus eventos</p>
                    </div>
                </div>
              </div>
              <div className="row">
                  <div className="col-sm-12">
                    <a href="#login" className="btn btn-secondary" onClick={this.mostrarLogin}>Unite a WhiteWork</a>
                  </div>
              </div>
            </div>
        </div>
        <div className="col-sm-12">
          <img alt="logo" src={wwblack} style={{margin: '30px 0 30px 0', width: '250px'}}></img>
        </div>
        <div className="offset-md-4 col-sm-4">
          <p style={{fontWeight: 'bold'}}>¿Qué es WhiteWork?</p>
          <p style={{textAlign: 'justify'}}>Es una plataforma que busca facilitar la conexión y comunicación entre personas que realicen un evento y necesitan personal temporal para trabajar en el mismo, con trabajadores de confianza que quieran ser parte de estos. </p>
        </div>
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
                <i onClick={authApi.signInFacebook} className="fa fa-fw fa-lg fa-facebook" style={{cursor: 'pointer'}}></i>
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
    }

    if (this.state.display === "institucionalEmpleado") {
      tareas = 
      <div className="col">
        <ul className="task-list" id="empleado-tareas">
          <li>
            <div className="mx-auto tarjeta">
              <img className="foto-trabajo" src={buscar} alt="persona" />
              <div className="content-tarea">
                <h3>1. Buscar Trabajo</h3>
                <h5>Podrás buscar el trabajo al que deseas postularte.</h5>
              </div>
            </div>
          </li>
          <li>
            <div className="mx-auto tarjeta">
              <img className="foto-trabajo" src={esperar} alt="persona" />
              <div className="content-tarea">
                <h3>2. Esperar aceptación</h3>
                <h5>Momento de esperar a que tu postulación sea aceptada.</h5>
              </div>
            </div>
          </li>
          <li>
            <div className="mx-auto tarjeta">
              <img className="foto-trabajo" src={valorar} alt="persona" />
              <div className="content-tarea">
                <h3>3. Puntuar a tu empleador</h3>
                <h5>Podrás colocar puntuación sobre el trato recibido por tu empleador.</h5>
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
              <div className="mx-auto tarjeta">
                <img className="foto-trabajo" src={crear} alt="persona" />
                <div className="content-tarea">
                  <h3>1. Crear Evento</h3>
                  <h5>Definir fecha, trabajo y pagos.</h5>
                </div>
              </div>
            </li>
            <li>
              <div className="mx-auto tarjeta">
                <img className="foto-trabajo" src={esperar} alt="persona" />
                <div className="content-tarea">
                  <h3>2. Esperar postulantes</h3>
                  <h5>Momento de esperar a quienes quieran trabajar en tus eventos.</h5>
                </div>
              </div>
            </li>
            <li>
              <div className="mx-auto tarjeta">
                <img className="foto-trabajo" src={aceptar} alt="persona" />
                <div className="content-tarea">
                  <h3>3. Aceptar postulantes</h3>
                  <h5>Aceptar o rechazar a los postulantes.</h5>
                </div>
              </div>
            </li>
            <li>
              <div className="mx-auto tarjeta">
                <img className="foto-trabajo" src={valorar} alt="persona" />
                <div className="content-tarea">
                  <h3>4. Puntuar </h3>
                  <h5>Una vez que el trabajo se ha consumado, podrás puntuar al trabajador.</h5>
                </div>
              </div>
            </li>
          </ul>
      </div>
    }
    
    return (
      <div>
        <div className="App">
          {/* HEADER */}
          <div className='navbar col-12'>
            <ul className="left-ui">
              <li onClick={this.mostrarMain}><div id="logo"><img className='logo' alt="log" src={ww} /></div></li>
              <li className='home' onClick={this.mostrarMain}>WHITEWORK</li>
              <li id="prestadores-li" onClick={this.mostrarInstitucionalEmpleado}>Busco trabajar</li>
              <li id="usuarios-li" onClick={this.mostrarInstitucionalEmpleador}>Busco contratar</li>
            </ul>
            <ul className='right-ui nombre-usuario'>
              <li onClick={this.mostrarLogin} style={{color:'#fff'}}>Ingresar</li>
              <li onClick={this.mostrarLogin} style={{color:'#fff'}}>Registrate</li>
            </ul>
          </div>
          {/* HEADER */}

          <div id="contentDiv" className="col-sm-12" style={{padding: 0, transition: 'opacity .15s linear'}}>
            {display}
            {tareas}
          </div>
        </div>
      </div>
    );
  }
}

export default SiteScreen;