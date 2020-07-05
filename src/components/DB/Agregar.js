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
    agregarEvento = (nombre, descripcion, mail_dueño_evento, zona, direccion, datetimeComienzo, datetimeFinaliza, cantidadTrabajos) => {
        var idHora = this.obtenerId();
        db.collection("eventos").doc("E" + idHora + "" + mail_dueño_evento).set({
            titulo: nombre,
            descripcion: descripcion,
            mail_dueño_evento: mail_dueño_evento,
            zona: zona,
            direccion: direccion,
            datetimeComienzo: datetimeComienzo,
            datetimeFinaliza: datetimeFinaliza,
            estado: "pendiente",
            cantidadTrabajos: cantidadTrabajos,
        }).then(() => {
            console.log("Evento Creado")            
        }).catch(() => {
            console.log("error")
            return ("error")
        })
        return ("E" + idHora + "" + mail_dueño_evento);
    }
    agregarTrabajo = (nuevoEvento, mail_dueño_evento, rolT, descripciontrab, datecomienzotrab, datefintrab, pago, periodo, categoria) => {
        var idHora = this.obtenerId();
        db.collection("trabajos").doc("T" + idHora + "" + mail_dueño_evento).set({
            id_evento: nuevoEvento,
            rol: rolT,
            descripcion: descripciontrab,
            datetimeComienzo: datecomienzotrab,
            datetimeFinaliza: datefintrab,
            pago: pago,
            periodo: periodo,
            estado: "pendiente",
            mail_trabajador: "",
            categoria: categoria,
            requisitos: "",
        }).then(() => {
            console.log("Trabajo Creado")
        }).catch(() => {
            console.log("error")
        })
    }
}
export default new Agregar();