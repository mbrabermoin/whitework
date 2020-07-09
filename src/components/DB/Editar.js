import React from 'react';
import db from '../../index';

class Editar extends React.Component {
  //Usuarios
  modificarNombreUsuario = (fullname, email)=> {
    db.collection("usuarios").doc(email).update({
      fullname: fullname,
    }).then(() => {
      console.log("Modificado")
    }).catch(() => {
      console.log("error")
    })
  }
  modificarTelefonoUsuario = (telefono, email)=> {
    db.collection("usuarios").doc(email).update({
      telefono: telefono,
    }).then(() => {
      console.log("Modificado")
    }).catch(() => {
      console.log("error")
    })
  }
  modificarFacebookUsuario = (facebook, email)=> {
    db.collection("usuarios").doc(email).update({
      facebook: facebook,
    }).then(() => {
      console.log("Modificado")
    }).catch(() => {
      console.log("error")
    })
  }
  modificarTwitterUsuario = (twitter, email)=> {
    db.collection("usuarios").doc(email).update({
      twitter: twitter,
    }).then(() => {
      console.log("Modificado")
    }).catch(() => {
      console.log("error")
    })
  }
  modificarInstagramUsuario = (instagram, email)=> {
    db.collection("usuarios").doc(email).update({
      instagram: instagram,
    }).then(() => {
      console.log("Modificado")
    }).catch(() => {
      console.log("error")
    })
  }
  modificarLinkedinUsuario = (linkedin, email)=> {
    db.collection("usuarios").doc(email).update({
      linkedin: linkedin,
    }).then(() => {
      console.log("Modificado")
    }).catch(() => {
      console.log("error")
    })
  }
  //Eventos
  cambiarEstadoEvento = (evento, estado)=> {
    db.collection("eventos").doc(evento).update({
      estado: estado,
    }).then(() => {
      console.log("Modificado")
    }).catch(() => {
      console.log("error")
    })
  }    
  restarTrabajo = (evento, cantTrabajos)=> {
    db.collection("eventos").doc(evento).update({
      cantidadTrabajos: cantTrabajos- 1,
    }).then(() => {
      console.log("Modificado")
    }).catch(() => {
      console.log("error")
    })
  } 
  //Trabajos
  cambiarEstadoTrabajo = (trabajo, estado)=> {
    db.collection("trabajos").doc(trabajo).update({
      estado: estado,
    }).then(() => {
      console.log("Modificado")
    }).catch(() => {
      console.log("error")
    })
  }   
  
}
export default new Editar();