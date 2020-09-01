import React from 'react';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogContentText from '@material-ui/core/DialogContentText';
import Grid from '@material-ui/core/Grid';
import TrabajoTarjeta from './TrabajoTarjeta';
import db from '../index';
import DueñoTarjeta from './DueñoTarjeta';
import Eliminar from './DB/Eliminar';
import Agregar from './DB/Agregar';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});
const dateNow = new Date();
const year = dateNow.getFullYear();
const monthWithOffset = dateNow.getUTCMonth() + 1;
var day = dateNow.getUTCDate().toString();
var month = monthWithOffset.toString();
if (monthWithOffset.toString().length < 2) {
    month = "0" + month
}
if (day.length < 2) {
    day = "0" + day
}
const materialDateInput = year + "-" + month + "-" + day;
class EventoTarjeta extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modo: this.props.modo,
            usuario: this.props.usuario,
            openDetalle: false,
            openTrabajo: false,
            openPerfil: false,
            openEliminarEvento: false,
            openDuplicarEvento: false,
            estadoEvento: this.props.estado,
            titulo: this.props.titulo,
            provincia: this.props.provincia,
            ciudad: this.props.ciudad,
            privado: this.props.privado,
            mailDueño: this.props.mailDueño,
            nombreDueño: this.props.nombreDueño,
            descripcion: this.props.descripcion,
            direccion: this.props.direccion,
            cantTrabajos: this.props.cantTrabajos,
            eventoid: this.props.eventoid,
            datecomienzo: this.props.datecomienzo,
            datefin: this.props.datefin,
            timecomienzo: this.props.timecomienzo,
            timefin: this.props.timefin,
            cantPostEvento: this.props.cantPostEvento,
            cantPuntEvento: this.props.cantPuntEvento,
            cantAsignados: this.props.cantAsignados,
            trabajos: [],
            trabajosPostulados: this.props.trabajosPostulados,
        }
        this.actualizarEventos = this.actualizarEventos.bind(this);
        this.mostrarMensajeExito = this.mostrarMensajeExito.bind(this);
    }
    buscarTrabajos(evento) {
        var trab = [];
        var trabajosPostulados = this.state.trabajosPostulados;
        if (trabajosPostulados === undefined) {
            db.collection("trabajos").where("id_evento", "==", evento).get()
                .then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                        return trab.push({ id: doc.id, data: doc.data(), postulado: "N" });
                    });
                })
                .catch(function (error) {
                    console.log("Error getting documents: ", error);
                });
        } else {
            db.collection("trabajos").where("id_evento", "==", evento).get()
                .then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                        const found = trabajosPostulados.find(element => element === doc.data().id_trabajo);
                        if (found === doc.data().id_trabajo) {
                            return trab.push({ id: doc.id, data: doc.data(), postulado: "Y" });
                        } else {
                            return trab.push({ id: doc.id, data: doc.data(), postulado: "N" });
                        }
                    });
                })
                .catch(function (error) {
                    console.log("Error getting documents: ", error);
                });
        }

        setTimeout(() => {
            this.setState({ trabajos: trab })
        }, 1000);
    }
    handleCloseDetalle = () => {
        this.setState({ openDetalle: false });
    };
    handleOpenDetalle = () => {
        this.setState({ openDetalle: true });
    };
    handleCloseTrabajos = () => {
        this.setState({ openTrabajo: false });
    }
    handleOpenTrabajos = () => {
        this.setState({ openTrabajo: true });
        this.buscarTrabajos(this.state.eventoid);
    }
    handleClosePerfil = () => {
        this.setState({ openPerfil: false });
    }
    handleOpenPerfil = () => {
        this.setState({ openPerfil: true });
    }
    handleCloseEliminarEvento = () => {
        this.setState({ openEliminarEvento: false });
    }
    handleOpenEliminarEvento = () => {
        this.setState({ openEliminarEvento: true });
    }
    handleCloseDuplicarEvento = () => {
        this.setState({ openDuplicarEvento: false });
    }
    handleOpenDuplicarEvento = () => {
        this.setState({ openDuplicarEvento: true });
    }
    actualizarEventos() {
        this.props.actualizarEventosGeneral();
    }
    mostrarMensajeExito(mensaje, modo) {
        this.props.mostrarMensajeExito(mensaje, modo);
    }
    eliminarEvento = () => {
        Eliminar.eliminarEvento(this.state.eventoid);
        var filtro = db.collection("trabajos").where("id_evento", "==", this.state.eventoid)
        filtro.onSnapshot((snapShots) => {
            snapShots.docs.map(doc => {
                return Eliminar.eliminarTrabajo(doc.id);
            })
        }, error => {
            console.log(error)
        });
        this.props.mostrarMensajeExito("Evento Eliminado Correctamente.", "success");
    }
    obtenerFechaActual() {
        var today = new Date();
        var mes = "";
        if ((today.getMonth() + 1).toString().length === 2) {
            mes = (today.getMonth() + 1)
        } else {
            mes = 0 + "" + (today.getMonth() + 1)
        }
        var dia = "";
        if (today.getDate().toString().length === 2) {
            dia = today.getDate()
        } else {
            dia = 0 + "" + today.getDate()
        }
        var minutos = "";
        if (today.getMinutes().toString().length === 2) {
            minutos = today.getMinutes()
        } else {
            minutos = 0 + "" + today.getMinutes()
        }
        var hora = "";
        if (today.getHours().toString().length === 2) {
            hora = today.getHours()
        } else {
            hora = 0 + "" + today.getHours()
        }
        var date = today.getFullYear() + "" + mes + "" + dia;
        var time = hora + "" + minutos;
        var dateTime = date + time;
        return dateTime;
    }
    duplicarEvento = () => {
        var trab = [];
        var cantidadDeTrabajos = this.state.cantTrabajos;
        const dateComienzo = document.getElementById("dateDuplicar").value;
        const timeComienzo = document.getElementById("timeDuplicar").value;
        const dateFinaliza = document.getElementById("date2Duplicar").value;
        const timeFinaliza = document.getElementById("time2Duplicar").value;
        var fromDateConcat = dateComienzo.substr(0, 4) + "" + dateComienzo.substr(5, 2) + "" + dateComienzo.substr(8, 2) + "" + timeComienzo.substr(0, 2) + "" + timeComienzo.substr(3, 2);
        var toDateConcat = dateFinaliza.substr(0, 4) + "" + dateFinaliza.substr(5, 2) + "" + dateFinaliza.substr(8, 2) + "" + timeFinaliza.substr(0, 2) + "" + timeFinaliza.substr(3, 2);
        var dateTime = this.obtenerFechaActual();
        if (fromDateConcat >= toDateConcat) {
            this.props.mostrarMensajeExito("Fecha de Finalización debe ser posterior a la de Comienzo.", "error");
        } else {
            if (dateTime >= fromDateConcat) {
                this.props.mostrarMensajeExito("La fecha de Comiezo debe ser posterior a la actual.", "error");
            } else {
                const nuevoEvento = Agregar.agregarEvento(this.state.titulo, this.state.descripcion, this.state.mailDueño, this.state.nombreDueño, this.state.provincia, this.state.ciudad, this.state.direccion, dateComienzo, timeComienzo, dateFinaliza, timeFinaliza, this.state.cantTrabajos);
                /*setTimeout(function () {
                    Agregar.agregarTrabajo(nuevoEvento, mail_dueño_evento, rolT, descripciontrab, dateComienzo, timeComienzo, dateFinaliza, timeFinaliza, pago, periodo, categoria);
                }, t * 1100);*/
                var mailDueño = this.state.mailDueño;
                db.collection("trabajos").where("id_evento", "==", this.state.eventoid).get()
                    .then(function (querySnapshot) {
                        querySnapshot.forEach(function (doc) {
                            trab.push(doc.data());
                        });
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                setTimeout(function () {
                    for (let t = 0; t < cantidadDeTrabajos; t++) {
                        const rolT = trab[t].rol;
                        const descripciontrab = trab[t].descripcion;
                        const pago = trab[t].pago;
                        const periodo = trab[t].periodo;
                        const categoria = trab[t].categoria;
                        setTimeout(function () {
                            Agregar.agregarTrabajo(nuevoEvento, mailDueño, rolT, descripciontrab, dateComienzo, timeComienzo, dateFinaliza, timeFinaliza, pago, periodo, categoria);
                        }, t * 1100);
                    }
                }, 1100);
                this.props.mostrarMensajeExito("Evento Duplicado Correctamente.", "success");
                this.setState({ openDuplicarEvento: false });
            }
        }
    }
    render() {
        var fechas = this.state.datecomienzo + " - " + this.state.timecomienzo;
        var horarios = this.state.datefin + " - " + this.state.timefin;
        var dueño = "";
        if (this.state.modo === "empleado") {
            dueño = <div>
                <Button variant="outlined" size="large" onClick={this.handleOpenPerfil}>Organiza: {this.state.nombreDueño}</Button>
            </div>
        } else {
            dueño = "";
        }
        var botonEliminarEvento = "";
        if (this.state.modo === "empleador" && this.state.estadoEvento === "pendiente") {
            botonEliminarEvento =
                <button className='eliminar-btn' onClick={this.handleOpenEliminarEvento}>Eliminar</button>
        } else {
            botonEliminarEvento = "";
        }
        var botonDuplicarEvento = "";
        if (this.state.modo === "empleador") {
            botonDuplicarEvento =
                <button className='duplicar-btn' onClick={this.handleOpenDuplicarEvento}>Duplicar</button>
        } else {
            botonDuplicarEvento = "";
        }
        var trabajos = this.state.trabajos;
        var contenedorTrabajos = <div>
            {trabajos.map(trabajo => (<TrabajoTarjeta key={trabajo.id} actualizarEventos={this.actualizarEventos} mostrarMensajeExito={this.mostrarMensajeExito} postulado={trabajo.postulado} usuario={this.state.usuario} estadoEvento={this.state.estadoEvento} rol={trabajo.data.rol} descripcion={trabajo.data.descripcion} evento={trabajo.data.id_evento} trabajo={trabajo.data.id_trabajo} cantTrabajos={this.state.cantTrabajos} pago={trabajo.data.pago} periodo={trabajo.data.periodo} datecomienzo={trabajo.data.dateComienzo} datefin={trabajo.data.dateFinaliza} timecomienzo={trabajo.data.timeComienzo} timefin={trabajo.data.timeFinaliza} categoria={trabajo.data.categoria} cantPost={trabajo.data.cantPostulados} cantPostEvento={this.state.cantPostEvento} cantPuntEvento={this.state.cantPuntEvento} cantAsignados={this.state.cantAsignados} asignado={trabajo.data.mail_trabajador} puntuadoEmpleado={trabajo.data.puntuadoEmpleado} puntuadoEmpleador={trabajo.data.puntuadoEmpleador} dueño={this.state.mailDueño} modo={this.state.modo} />
            ))}
        </div>

        return (
            <div>
                <div className='card'>
                    <div className='top-library'>
                        <i className="fas fa-book-open book">{this.state.titulo}</i>
                    </div>
                    <div className='middle-library'>
                        <p className='type'>{this.state.tiempo}</p>
                        <h3 className='job-name'>{this.state.provincia} - {this.state.ciudad}</h3>
                        <p className='desc'>{this.state.descripcion}</p>
                        <button className='resume-btn' onClick={this.handleOpenDetalle}>Ver Detalle</button>
                        {botonEliminarEvento}
                        {botonDuplicarEvento}
                    </div>
                </div>
                <Dialog
                    open={this.state.openDetalle}
                    onClose={this.handleCloseDetalle}
                    TransitionComponent={Transition}
                    fullWidth={true}
                    maxWidth={'md'}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="confirmation-dialog-title">Detalle del Evento</DialogTitle>
                    <DialogContent dividers>
                        <DialogContentText>
                            {this.state.titulo}
                        </DialogContentText>
                        <TextField id="descripcion" margin="dense" disabled label="Descripción" type="descripcion" value={this.state.descripcion} fullWidth />
                        <TextField id="comienza" margin="dense" disabled label="Comienza" type="" value={fechas} fullWidth />
                        <TextField id="finaliza" margin="dense" disabled label="Finaliza" type="" value={horarios} fullWidth />
                        <TextField id="provincia" margin="dense" disabled label="Provincia" type="provincia" value={this.state.provincia} fullWidth />
                        <TextField id="ciudad" margin="dense" disabled label="Ciudad" type="ciudad" value={this.state.ciudad} fullWidth />
                        <TextField id="direccion" margin="dense" disabled label="Dirección" type="direccion" value={this.state.direccion} fullWidth />
                        <Grid container
                            direction="row"
                            justify="center"
                            alignItems="center"
                        >
                            <div style={{ marginRight: 4 + 'em' }}>
                                <Button variant="outlined" size="large" onClick={this.handleOpenTrabajos}>{this.state.cantTrabajos} Trabajos</Button>

                            </div>
                            {dueño}
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseDetalle} color="primary">
                            CERRAR
                         </Button>
                    </DialogActions>
                </Dialog>
                {/*Modal Trabajos*/}
                <Dialog
                    open={this.state.openTrabajo}
                    onClose={this.handleCloseTrabajos}
                    TransitionComponent={Transition}
                    fullWidth={true}
                    maxWidth={'md'}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="confirmation-dialog-title">Trabajos de {this.state.titulo}</DialogTitle>
                    <DialogContent dividers>
                        {contenedorTrabajos}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseTrabajos} color="primary">
                            CERRAR
                         </Button>
                    </DialogActions>
                </Dialog>
                {/*Modal Perfil*/}
                <Dialog
                    open={this.state.openPerfil}
                    onClose={this.handleClosePerfil}
                    TransitionComponent={Transition}
                    fullWidth={true}
                    maxWidth={'md'}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="confirmation-dialog-title">Detalle del Propietario del evento</DialogTitle>
                    <DialogContent dividers>
                        <DueñoTarjeta mailDueño={this.state.mailDueño} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClosePerfil} color="primary">
                            CERRAR
                         </Button>
                    </DialogActions>
                </Dialog>
                {/*Consultar si desea eliminar evento*/}
                <Dialog
                    open={this.state.openEliminarEvento}
                    onClose={this.handleCloseEliminarEvento}
                    TransitionComponent={Transition}
                    maxWidth={'md'}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="confirmation-dialog-title">Eliminar</DialogTitle>
                    <DialogContent dividers>
                        ¿Desea eliminar el evento {this.state.titulo} definitivamente?
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseEliminarEvento} color="primary">
                            No
                         </Button>
                        <Button onClick={this.eliminarEvento} color="primary">
                            Si
                         </Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={this.state.openDuplicarEvento}
                    onClose={this.handleCloseDuplicarEvento}
                    TransitionComponent={Transition}
                    maxWidth={'md'}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="confirmation-dialog-title">Duplicar</DialogTitle>
                    <DialogContent dividers>
                        <DialogContentText>
                            Duplicar {this.state.titulo}
                        </DialogContentText>
                        <TextField id="dateDuplicar" required label="Comienzo:" type="date" defaultValue={materialDateInput} />
                        <TextField id="timeDuplicar" type="time" defaultValue="00:00" label=" " />
                        <br />
                        <TextField id="date2Duplicar" required label="Terminación:" type="date" defaultValue={materialDateInput} />
                        <TextField id="time2Duplicar" type="time" defaultValue="00:00" label=" " />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseDuplicarEvento} color="primary">
                            No
                         </Button>
                        <Button onClick={this.duplicarEvento} color="primary">
                            Si
                         </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default EventoTarjeta;