import React from 'react';
import db from '../../index';

class Editar extends React.Component {
  //Usuarios
  modificarNombreUsuario = (fullname, email) => {
    db.collection("usuarios").doc(email).update({
      fullname: fullname,
    }).then(() => {
      console.log("Modificado")
    }).catch(() => {
      console.log("error")
    })
  }
  modificarTelefonoUsuario = (telefono, email) => {
    db.collection("usuarios").doc(email).update({
      telefono: telefono,
    }).then(() => {
      console.log("Modificado")
    }).catch(() => {
      console.log("error")
    })
  }
  modificarFotoUsuario = (urlFoto, email) => {
    db.collection("usuarios").doc(email).update({
      urlFoto: urlFoto,
    }).then(() => {
      console.log("Modificado")
    }).catch(() => {
      console.log("error")
    })
  }
  modificarOcupacionUsuario = (ocupacion, email) => {
    db.collection("usuarios").doc(email).update({
      ocupacion: ocupacion,
    }).then(() => {
      console.log("Modificado")
    }).catch(() => {
      console.log("error")
    })
  }
  modificarUbicacionUsuario = (ubicacion, email) => {
    db.collection("usuarios").doc(email).update({
      ubicacion: ubicacion,
    }).then(() => {
      console.log("Modificado")
    }).catch(() => {
      console.log("error")
    })
  }
  modificarDescripcionEmpleadoUsuario = (descripcionEmpleado, email) => {
    db.collection("usuarios").doc(email).update({
      descripcionEmpleado: descripcionEmpleado,
    }).then(() => {
      console.log("Modificado")
    }).catch(() => {
      console.log("error")
    })
  }
  modificarDescripcionEmpleadorUsuario = (descripcionEmpleador, email) => {
    db.collection("usuarios").doc(email).update({
      descripcionEmpleador: descripcionEmpleador,
    }).then(() => {
      console.log("Modificado")
    }).catch(() => {
      console.log("error")
    })
  }
  modificarCUILUsuario = (cuil, email) => {
    db.collection("usuarios").doc(email).update({
      cuil: cuil,
    }).then(() => {
      console.log("Modificado")
    }).catch(() => {
      console.log("error")
    })
  }  
  modificarFacebookUsuario = (facebook, email) => {
    db.collection("usuarios").doc(email).update({
      facebook: facebook,
    }).then(() => {
      console.log("Modificado")
    }).catch(() => {
      console.log("error")
    })
  }
  modificarTwitterUsuario = (twitter, email) => {
    db.collection("usuarios").doc(email).update({
      twitter: twitter,
    }).then(() => {
      console.log("Modificado")
    }).catch(() => {
      console.log("error")
    })
  }
  modificarInstagramUsuario = (instagram, email) => {
    db.collection("usuarios").doc(email).update({
      instagram: instagram,
    }).then(() => {
      console.log("Modificado")
    }).catch(() => {
      console.log("error")
    })
  }
  modificarLinkedinUsuario = (linkedin, email) => {
    db.collection("usuarios").doc(email).update({
      linkedin: linkedin,
    }).then(() => {
      console.log("Modificado")
    }).catch(() => {
      console.log("error")
    })
  }
  modificarEmpleadoActivo = (empleadoActivo, email) => {
    db.collection("usuarios").doc(email).update({
      empleadoActivo: empleadoActivo,
    }).then(() => {
      console.log("Modificado")
    }).catch(() => {
      console.log("error")
    })
  }
  //Eventos
  cambiarEstadoEvento = (evento, estado) => {
    db.collection("eventos").doc(evento).update({
      estado: estado,
    }).then(() => {
      console.log("Modificado")
    }).catch(() => {
      console.log("error")
    })
  }
  restarTrabajo = (evento, cantTrabajos) => {
    db.collection("eventos").doc(evento).update({
      cantidadTrabajos: cantTrabajos - 1,
    }).then(() => {
      console.log("Modificado")
    }).catch(() => {
      console.log("error")
    })
  }
  sumarTrabajo = (evento, cantTrabajos) => {
    db.collection("eventos").doc(evento).update({
      cantidadTrabajos: cantTrabajos + 1,
    }).then(() => {
      console.log("Modificado")
    }).catch(() => {
      console.log("error")
    })
  }
  agregarPostulacionEvento = (evento, cantPostEvento, estado) => {
    db.collection("eventos").doc(evento).update({
      cantPostulados: cantPostEvento,
      estado: estado,
    }).then(() => {
      console.log("Modificado")
    }).catch(() => {
      console.log("error")
    })
  }
  asignarTrabajadorAEvento = (evento, estado, cantPostEvento, cantAsignados) => {
    db.collection("eventos").doc(evento).update({
      estado: estado,
      cantPostulados: cantPostEvento,
      cantAsignados: cantAsignados,
    }).then(() => {
      console.log("Modificado")
    }).catch(() => {
      console.log("error")
    })
  }
  rechazarTrabajadorAEvento = (evento, estado, cantPostEvento) => {
    db.collection("eventos").doc(evento).update({
      estado: estado,
      cantPostulados: cantPostEvento,
    }).then(() => {
      console.log("Modificado")
    }).catch(() => {
      console.log("error")
    })
  }
  desasignarEmpleadoAEvento = (evento, nuevaCantAsignados) =>   {
    db.collection("eventos").doc(evento).update({
      cantAsignados: nuevaCantAsignados,
    }).then(() => {
      console.log("Modificado")
    }).catch(() => {
      console.log("error")
    })
  }
  agregarPuntuadoEvento = (evento, cantPuntEvento) => {
    db.collection("eventos").doc(evento).update({
      cantPuntuados: cantPuntEvento + 1,
  }).then(() => {
    console.log("Modificado")
  }).catch(() => {
    console.log("error")
  })
}
  //Trabajos
  agregarPostulacionTrabajo = (trabajo, estado, cantPost) => {
    db.collection("trabajos").doc(trabajo).update({
      estado: estado,
      cantPostulados: cantPost,
    }).then(() => {
      console.log("Modificado")
    }).catch(() => {
      console.log("error")
    })
  }
  cambiarEstadoTrabajo = (trabajo, estado) => {
    db.collection("trabajos").doc(trabajo).update({
      estado: estado,
    }).then(() => {
      console.log("Modificado")
    }).catch(() => {
      console.log("error")
    })
  }
  rechazarTrabajo = (trabajo, estado, cantPost) => {
    db.collection("trabajos").doc(trabajo).update({
      estado: estado,
      cantPostulados: cantPost,
    }).then(() => {
      console.log("Modificado")
    }).catch(() => {
      console.log("error")
    })
  }    
  asignarTrabajador = (mailTrabajador, trabajo) => {
    db.collection("trabajos").doc(trabajo).update({
      mail_trabajador: mailTrabajador,
      estado: "asignado",
      cantPostulados: 0,
    }).then(() => {
      console.log("Modificado")
    }).catch(() => {
      console.log("error")
    })
  }
  desasignarEmpleado = (trabajo) => {
    db.collection("trabajos").doc(trabajo).update({
      mail_trabajador: "",
      estado: "pendiente",
    }).then(() => {
      console.log("Modificado")
    }).catch(() => {
      console.log("error")
    })
  }
  trabajoPuntuadoPorEmpleado = (trabajo) => {
    db.collection("trabajos").doc(trabajo).update({
      puntuadoEmpleado: "Y",
    }).then(() => {
      console.log("Modificado")
    }).catch(() => {
      console.log("error")
    })
  }
  trabajoPuntuadoPorEmpleador = (trabajo) => {
    db.collection("trabajos").doc(trabajo).update({
      puntuadoEmpleador: "Y",
    }).then(() => {
      console.log("Modificado")
    }).catch(() => {
      console.log("error")
    })
  }
}
export default new Editar();