import React from 'react';
import db from '../../index';

class Eliminar extends React.Component {
    //Trabajo
    eliminarTrabajo = (trabajo) => {
        db.collection("trabajos").doc(trabajo).delete().then(function () {
            console.log("Trabajo eliminado");
        }).catch(function (error) {
            console.error("Error eliminando trabajo: ", error);
        });
    }
    //Evento
    eliminarEvento = (evento) => {
        db.collection("eventos").doc(evento).delete().then(function () {
            console.log("Evento eliminado");
        }).catch(function (error) {
            console.error("Error eliminando evento: ", error);
        });
    }

}
export default new Eliminar();