import React from 'react';
import db from '../../index';

class Editar extends React.Component {
  modificarUsuario = (fullname, email, photoURL, telefono, facebook,  twitter, instagram, linkedin) => {
    db.collection("usuarios").doc(email).set({
      fullname: fullname,
      email: email,
      urlFoto: photoURL,
      telefono: telefono,
      facebook: facebook,
      twitter: twitter,
      instagram: instagram,      
      linkedin: linkedin,
    }).then(() => {
      console.log("Modificado")
    }).catch(() => {
      console.log("error")
    })
  }
}
export default new Editar();