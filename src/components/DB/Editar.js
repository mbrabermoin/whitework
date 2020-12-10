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
  modificarCVUsuario = (CV, email)=> {
    db.collection("usuarios").doc(email).update({
      CV: CV,
    }).then(() => {
      console.log("Modificado")
    }).catch(() => {
      console.log("error")
    })
  }
  modificarMatriculaUsuario = (matricula, email)=> {
    db.collection("usuarios").doc(email).update({
      Matricula: matricula,
    }).then(() => {
      console.log("Modificado")
    }).catch(() => {
      console.log("error")
    })
  }
  modificarLicenciaConducirUsuario = (licencia, email)=> {
    db.collection("usuarios").doc(email).update({
      LicenciaConducir: licencia,
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
  modificarEmpresaActivo = (empresaActivo, email) => {
    db.collection("usuarios").doc(email).update({
      empresa: empresaActivo,
    }).then(() => {
      console.log("Modificado")
    }).catch(() => {
      console.log("error")
    })
  }
  suspenderUsuario = (email) => {
    db.collection("usuarios").doc(email).update({
      suspendido: true,
    }).then(() => {
      console.log("Modificado")
    }).catch(() => {
      console.log("error")
    })
  }
  desactivarUsuario = (email) => {
    db.collection("usuarios").doc(email).update({
      eliminado: true,
    }).then(() => {
      console.log("Modificado")
    }).catch(() => {
      console.log("error")
    })
  }  
  activarUsuario = (email) => {
    db.collection("usuarios").doc(email).update({
      eliminado: false,
    }).then(() => {
      console.log("Modificado")
    }).catch(() => {
      console.log("error")
    })
  }
  //Eventos
  desactivarEvento = (evento) => {
    db.collection("eventos").doc(evento).update({
      dueñoEliminado: true,
    }).then(() => {
      console.log("Modificado")
    }).catch(() => {
      console.log("error")
    })
  }
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
  desasignarEmpleadoAEvento = (evento, nuevaCantAsignados) => {
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
  editarEvento = (evento, nombre, descripcion, provincia, ciudad, direccion, dateComienzo, timeComienzo, dateFinaliza, timeFinaliza) => {
    db.collection("eventos").doc(evento).update({
      titulo: nombre,
      descripcion: descripcion,
      ciudad: ciudad,
      provincia: provincia,
      direccion: direccion,
      dateComienzo: dateComienzo,
      timeComienzo: timeComienzo,
      dateFinaliza: dateFinaliza,
      timeFinaliza: timeFinaliza,
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
  modificarHorariosTrabajo = (trabajo, dateComienzo, dateFinaliza, timeComienzo, timeFinaliza) => {
    db.collection("trabajos").doc(trabajo).update({
      dateComienzo: dateComienzo,
      dateFinaliza: dateFinaliza,
      timeComienzo: timeComienzo,
      timeFinaliza: timeFinaliza,
    }).then(() => {
      console.log("Modificado")
    }).catch(() => {
      console.log("error")
    })
  }
  modificarTrabajo = (trabajo, rol, descripcion, metodopago,facturacion, pago, periodo, categoria) => {
    db.collection("trabajos").doc(trabajo).update({
      rol: rol,
      descripcion: descripcion,
      metodopago: metodopago,
      facturacion: facturacion,
      pago: pago,
      periodo: periodo,
      categoria: categoria,
    }).then(() => {
      console.log("Modificado")
    }).catch(() => {
      console.log("error")
    })
  }

}
export default new Editar();