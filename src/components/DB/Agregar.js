import React from 'react';
import db from '../../index';

const dateNow = new Date();
const year = dateNow.getFullYear();
const monthWithOffset = dateNow.getUTCMonth() + 1;
var day = dateNow.getUTCDate().toString();
// Setting current Month number from current Date object
var month = monthWithOffset.toString();
if (monthWithOffset.toString().length < 2) {
    month = "0"+month
}
if (day.length < 2) {
    day = "0"+day
}
const hours = dateNow.getHours();
const minutes = dateNow.getMinutes();
const seconds = dateNow.getSeconds();
const materialDateInput = year+month+day+hours+minutes+seconds;

class Agregar extends React.Component {
  agregarEvento = (nombre, descripcion, mail_dueño_evento, zona, direccion, datetimeComienzo, datetimeFinaliza) => {
    db.collection("eventos").doc(materialDateInput+""+mail_dueño_evento).set({
      titulo: nombre,
      descripcion: descripcion,
      mail_dueño_evento: mail_dueño_evento,
      zona: zona,
      direccion: direccion,
      datetimeComienzo: datetimeComienzo,
      datetimeFinaliza: datetimeFinaliza, 
    }).then(() => {
      console.log("Evento Creado")
    }).catch(() => {
      console.log("error")
    })
  }
}
export default new Agregar();