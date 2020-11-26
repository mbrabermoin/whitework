import React from 'react';
import db from '../../index';

class Agregar extends React.Component {
    obtenerId() {
        var dateNow = new Date();
        var year = dateNow.getFullYear();
        var monthWithOffset = dateNow.getUTCMonth() + 1;
        var day = dateNow.getUTCDate().toString();
        // Setting current Month number from current Date object
        var month = monthWithOffset.toString();
        if (monthWithOffset.toString().length < 2) {
            month = "0" + month
        }
        if (day.length < 2) {
            day = "0" + day
        }
        var hours = dateNow.getHours();
        var minutes = dateNow.getMinutes();
        var seconds = dateNow.getSeconds();
        return year + month + day + hours + minutes + seconds;
    }
    agregarEvento = (nombre, descripcion, mail_dueño_evento, nombre_dueño_evento, provincia, ciudad, direccion, dateComienzo, timeComienzo, dateFinaliza, timeFinaliza, cantidadTrabajos) => {
        var idHora = this.obtenerId();
        db.collection("eventos").doc("E" + idHora + "" + mail_dueño_evento).set({
            id_evento:"E" + idHora + "" + mail_dueño_evento,
            titulo: nombre,
            descripcion: descripcion,
            mail_dueño_evento: mail_dueño_evento,
            nombre_dueño_evento: nombre_dueño_evento,
            provincia: provincia,
            ciudad: ciudad,
            direccion: direccion,
            dateComienzo: dateComienzo,
            dateFinaliza: dateFinaliza,
            timeComienzo: timeComienzo,
            timeFinaliza: timeFinaliza,
            estado: "pendiente",
            cantidadTrabajos: cantidadTrabajos,
            cantPostulados: 0,
            cantAsignados: 0,
            cantPuntuados: 0,
        }).then(() => {
            console.log("Evento Creado")            
        }).catch(() => {
            console.log("error")
            return ("error")
        })
        return ("E" + idHora + "" + mail_dueño_evento);
    }
    agregarTrabajo = (nuevoEvento, mail_dueño_evento, rolT, descripciontrab, datecomienzotrab, timecomienzotrab, datefintrab, timefintrab, metodopago,facturacion, pago, periodo, categoria) => {
        var idHora = this.obtenerId();
        db.collection("trabajos").doc("T" + idHora + "" + mail_dueño_evento).set({
            id_trabajo:"T" + idHora + "" + mail_dueño_evento,
            id_evento: nuevoEvento,            
            rol: rolT,
            descripcion: descripciontrab,
            dateComienzo: datecomienzotrab,
            dateFinaliza: datefintrab,
            timeComienzo: timecomienzotrab,
            timeFinaliza: timefintrab,
            metodopago: metodopago,
            facturacion: facturacion,
            pago: pago,
            periodo: periodo,
            estado: "pendiente",
            mail_trabajador: "",
            categoria: categoria,
            requisitos: "",
            cantPostulados: 0,
            puntuadoEmpleado: "N",
            puntuadoEmpleador: "N",
        }).then(() => {
            console.log("Trabajo Creado")
        }).catch(() => {
            console.log("error")
        })
    }
    agregarPostulacion = (mail_postulante, id_trabajo, id_evento) => {
        var idHora = this.obtenerId();
        db.collection("postulaciones").doc("P" + idHora + "" + mail_postulante).set({
            id_postulacion:"P" + idHora + "" + mail_postulante,
            id_trabajo: id_trabajo,
            id_evento: id_evento,
            mail_postulante:mail_postulante,            
        }).then(() => {
            console.log("Postulación Creada")
        }).catch(() => {
            console.log("error")
        })
    }
    agregarComentario = (mail_comentador,nombre_comentador,foto, mail_comentado, comentario, puntaje, tipo) => {
        var idHora = this.obtenerId();
        db.collection("comentarios").doc("C" + idHora + "" + mail_comentador).set({
            id_comentario:"C" + idHora + "" + mail_comentador,
            comentador: mail_comentador,
            nombreComentador: nombre_comentador,
            foto: foto,
            comentado: mail_comentado,
            comentario:comentario,
            puntaje:puntaje,
            tipo:tipo,            
        }).then(() => {
            console.log("Comentario Creado")
        }).catch(() => {
            console.log("error")
        })
    }
}
export default new Agregar();