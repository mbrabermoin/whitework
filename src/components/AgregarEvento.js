import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogContentText from '@material-ui/core/DialogContentText';
import Grid from '@material-ui/core/Grid';
import Agregar from './DB/Agregar';
import TrabajoTarjeta from './TrabajoTarjeta';
import * as provinciasjson from './JSONs/Provincias.json';
import * as ciudadesjson from './JSONs/Ciudades.json';
import { MenuItem } from '@material-ui/core';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});
const provincias = provinciasjson.default.states;
const ciudades = ciudadesjson.default.cities;
const periodos = [
    {
        value: 'Hora',
        label: 'Hora',
    },
    {
        value: 'Jornada',
        label: 'Jornada',
    },
    {
        value: 'Semana',
        label: 'Semana',
    },
    {
        value: 'Total',
        label: 'Total',
    },
];
const metodopago = [
    {
        value: 'A Definir',
        label: 'A Definir',
    },
    {
        value: 'Efectivo',
        label: 'Efectivo',
    },
    {
        value: 'Transferencia',
        label: 'Transferencia',
    },
    {
        value: 'MercadoPago',
        label: 'MercadoPago',
    },
];
const categorias = [
    {
        value: '',
        label: '',
    },
    {
        value: 'Diversion',
        label: 'Diversion',
    },
    {
        value: 'Electricidad',
        label: 'Electricidad',
    },
    {
        value: 'Plomeria',
        label: 'Plomeria',
    },
    {
        value: 'Gasista',
        label: 'Gasista',
    },
    {
        value: 'Seguridad',
        label: 'Seguridad',
    },
    {
        value: 'Otros',
        label: 'Otros',
    },
];

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
export default class AgregarEvento extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openEvento: false,
            openLista: false,
            openTrabajo: false,
            usuario: props.usuario,
            nombre: "",
            provincia: "",
            ciudad: "",
            direccion: "",
            diaComienzo: "",
            diaFinalizacion: "",
            horaComienzo: "",
            horaFinalizacion: "",
            cantTrabajos: 0,
            periodoDisplay: "Hora",
            metodopagoDisplay: "A Definir",
            categoriaDisplay: "",
            provinciaDisplay: "",
            ciudadDisplay: "",
            ciudades: [],
            arrayTrabajos: [],
        }
        this.eliminarTrabajoAgregando = this.eliminarTrabajoAgregando.bind(this);
        this.duplicarTrabajoAgregando = this.duplicarTrabajoAgregando.bind(this);
        this.editarTrabajoAgregando = this.editarTrabajoAgregando.bind(this);
        this.mostrarMensajeExito = this.mostrarMensajeExito.bind(this);
    }
    handleCloseEvento = () => {
        this.setState({ openEvento: false });
        this.setState({ cantTrabajos: 0 });
        this.setState({ arrayTrabajos: [] });
        this.setState({ provinciaDisplay: "" });
        this.setState({ ciudadDisplay: "" });
        this.setState({ provincia: "" });
        this.setState({ ciudad: "" });
        this.setState({ ciudades: [] });
    };
    handleOpenEvento = () => {
        this.setState({ openEvento: true });
    };
    handleCloseLista = () => {
        this.setState({ openLista: false });
    };
    handleOpenLista = () => {
        this.setState({ openLista: true });
    };
    handleCloseTrabajo = () => {
        this.setState({ openTrabajo: false });
    };
    handleOpenTrabajo = () => {
        this.setState({ openTrabajo: true });
        this.setState({ periodoDisplay: "Hora" });
        this.setState({ metodopagoDisplay: "A Definir" });
        this.setState({ categoriaDisplay: "" });
    };
    handleAgregarEvento = () => {
        const nombre = document.getElementById("nombre").value;
        if (nombre.trim() === "") {
            this.props.mostrarMensajeExito("Nombre es necesario.", "error");
        } else {
            const descripcion = document.getElementById("descripcion").value;
            if (descripcion.trim() === "") {
                this.props.mostrarMensajeExito("Descripción es necesaria.", "error");
            } else {
                const provincia = this.state.provincia;
                if (provincia.trim() === "") {
                    this.props.mostrarMensajeExito("Provincia es necesaria.", "error");
                } else {
                    const ciudad = this.state.ciudad;
                    if (ciudad.trim() === "") {
                        this.props.mostrarMensajeExito("Ciudad es necesaria.", "error");
                    } else {
                        const direccion = document.getElementById("direccion").value;
                        if (direccion.trim() === "") {
                            this.props.mostrarMensajeExito("Dirección es necesaria.", "error");
                        } else {
                            const mail_dueño_evento = this.state.usuario.email;
                            const nombre_dueño_evento = this.state.usuario.fullname;
                            const cantidadTrabajos = this.state.cantTrabajos;
                            const dateComienzo = document.getElementById("date").value;
                            const timeComienzo = document.getElementById("time").value;
                            const dateFinaliza = document.getElementById("date2").value;
                            const timeFinaliza = document.getElementById("time2").value;
                            var fromDateConcat = dateComienzo.substr(0, 4) + "" + dateComienzo.substr(5, 2) + "" + dateComienzo.substr(8, 2) + "" + timeComienzo.substr(0, 2) + "" + timeComienzo.substr(3, 2);
                            var toDateConcat = dateFinaliza.substr(0, 4) + "" + dateFinaliza.substr(5, 2) + "" + dateFinaliza.substr(8, 2) + "" + timeFinaliza.substr(0, 2) + "" + timeFinaliza.substr(3, 2);
                            var dateTime = this.obtenerFechaActual();
                            if (fromDateConcat >= toDateConcat) {
                                this.props.mostrarMensajeExito("Fecha de Finalización debe ser posterior a la de Comienzo.", "error");
                            } else {
                                if (dateTime >= fromDateConcat) {
                                    this.props.mostrarMensajeExito("La fecha de Comiezo debe ser posterior a la actual.", "error");
                                } else {
                                    if (this.state.cantTrabajos === 0) {
                                        this.props.mostrarMensajeExito("Se necesita al menos un trabajo para crear el evento.", "error");
                                    } else {
                                        const nuevoEvento = Agregar.agregarEvento(nombre, descripcion, mail_dueño_evento, nombre_dueño_evento, provincia, ciudad, direccion, dateComienzo, timeComienzo, dateFinaliza, timeFinaliza, cantidadTrabajos);
                                        for (let t = 0; t < this.state.cantTrabajos; t++) {
                                            const rolT = this.state.arrayTrabajos[t].rol;
                                            const descripciontrab = this.state.arrayTrabajos[t].descripciontrab;
                                            const pago = this.state.arrayTrabajos[t].pago;
                                            const metodopago = this.state.arrayTrabajos[t].metodopago;
                                            const periodo = this.state.arrayTrabajos[t].periodo;
                                            const categoria = this.state.arrayTrabajos[t].categoria;
                                            setTimeout(function () {
                                                Agregar.agregarTrabajo(nuevoEvento, mail_dueño_evento, rolT, descripciontrab, dateComienzo, timeComienzo, dateFinaliza, timeFinaliza,metodopago, pago, periodo, categoria);
                                            }, t * 1100);
                                        }
                                        this.props.mostrarMensajeExito("Evento Agregado Correctamente.", "success");
                                        this.handleCloseEvento();
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
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
    handleAgregarTrabajo = () => {
        const rol = document.getElementById("rol").value;
        if (rol.trim() === "") {
            this.props.mostrarMensajeExito("Rol es Requerido.", "error");
        } else {
            const descripciontrab = document.getElementById("descripcion-trab").value;
            if (descripciontrab.trim() === "") {
                this.props.mostrarMensajeExito("Descripción es Requerida.", "error");
            } else {
                const pago = document.getElementById("pago").value;
                if (pago.trim() === "") {
                    this.props.mostrarMensajeExito("Pago es Requerido.", "error");
                } else {
                    const periodo = this.state.periodoDisplay;
                    if (periodo.trim() === "") {
                        this.props.mostrarMensajeExito("Periodo es Requerido.", "error");
                    } else {
                        const metodopago = this.state.metodopagoDisplay;
                        const categoria = this.state.categoriaDisplay;
                        const job = { rol: rol, descripciontrab: descripciontrab,metodopago: metodopago, pago: pago, periodo: periodo, categoria: categoria };
                        this.state.arrayTrabajos.push(job);
                        var nuevaCantidad = this.state.cantTrabajos + 1;
                        this.setState({ cantTrabajos: nuevaCantidad });
                        this.setState({ openTrabajo: false });
                    }
                }
            }
        }

    }
    handleCambiarMetodopago = name => event => {
        this.setState({ metodopagoDisplay: event.target.value });
    }
    handleCambiarPeriodo = name => event => {
        this.setState({ periodoDisplay: event.target.value });
    }
    handleCambiarCategoria = name => event => {
        this.setState({ categoriaDisplay: event.target.value });

    }
    handleCambiarProvincia = name => event => {
        this.setState({ provinciaDisplay: event.target.value });
        var provincia = provincias.filter(provincia => provincia.id === event.target.value);
        this.setState({ provincia: provincia[0].name });
        var cities = ciudades.filter(ciudad => ciudad.id_state === event.target.value || ciudad.id_state === 0);
        this.setState({ ciudades: cities });
    }
    handleCambiarCiudad = name => event => {
        this.setState({ ciudadDisplay: event.target.value });
        var ciudad = ciudades.filter(city => city.id.toString() === event.target.value.toString());
        this.setState({ ciudad: ciudad[0].name })
    }
    eliminarTrabajoAgregando(index) {
        this.setState({ openCortina: true });
        var trabajos = [];
        trabajos = this.state.arrayTrabajos;
        this.state.arrayTrabajos.splice(index, 1);
        this.setState({ openLista: false });
        setTimeout(() => {
            this.setState({ arrayTrabajos: trabajos });
            var nuevaCantidad = this.state.cantTrabajos - 1;
            this.setState({ cantTrabajos: nuevaCantidad });
            this.setState({ openTrabajo: false });
            this.setState({ openLista: true });
            this.setState({ openCortina: false });
        }, 300);
    }
    duplicarTrabajoAgregando(index, trabajo) {
        this.setState({ openCortina: true });
        var trabajos = [];
        trabajos = this.state.arrayTrabajos;
        const job = { rol: trabajo.rol, descripciontrab: trabajo.descripciontrab, pago: trabajo.pago, periodo: trabajo.periodo, categoria: trabajo.categoria };
        this.state.arrayTrabajos.splice(index, 0, job);
        this.setState({ openLista: false });
        setTimeout(() => {
            this.setState({ arrayTrabajos: trabajos });
            var nuevaCantidad = this.state.cantTrabajos + 1;
            this.setState({ cantTrabajos: nuevaCantidad });
            this.setState({ openTrabajo: false });
            this.setState({ openLista: true });
            this.setState({ openCortina: false });
        }, 300);
    }
    editarTrabajoAgregando(index, rol, descripciontrab, metodopago, pago, periodo, categoria){
        this.setState({ openCortina: true });
        var trabajos = this.state.arrayTrabajos;
        trabajos[index].rol = rol;
        trabajos[index].descripciontrab = descripciontrab;
        trabajos[index].metodopago = metodopago;
        trabajos[index].pago = pago;
        trabajos[index].periodo = periodo;
        trabajos[index].categoria = categoria;
        this.setState({ openLista: false });
        setTimeout(() => {
            this.setState({ arrayTrabajos: trabajos});
            this.setState({ openTrabajo: false });
            this.setState({ openLista: true });
            this.setState({ openCortina: false });
        }, 300);
    }
    mostrarMensajeExito(mensaje, modo) {
        this.props.mostrarMensajeExito(mensaje, modo);
    }
    render() {
        var ciudadesMostrar = ""
        if (this.state.provinciaDisplay === "") {
            ciudadesMostrar = <TextField id="ciudad2" disabled required SelectProps={{ native: true, }} onChange="" label="Ciudad" fullWidth>

            </TextField>
        } else {
            ciudadesMostrar = <TextField id="ciudad" select required SelectProps={{ native: true, }} value={this.state.ciudadDisplay} onChange={this.handleCambiarCiudad('ciudadDisplay')} label="Ciudad" fullWidth>
                {this.state.ciudades.map(option => <option key={option.id} value={option.id}>{option.name}</option>)}
            </TextField>
        }
        var trabajosDisplay = "";
        if (this.state.arrayTrabajos.length > 0) {
            trabajosDisplay = <div>
                {this.state.arrayTrabajos.map((trabajo, index) => (<TrabajoTarjeta mostrarMensajeExito={this.mostrarMensajeExito} trabajoid={index} trabajoAgregando={trabajo} eliminarTrabajoAgregando={this.eliminarTrabajoAgregando} duplicarTrabajoAgregando={this.duplicarTrabajoAgregando} editarTrabajoAgregando={this.editarTrabajoAgregando} rol={trabajo.rol} estadoEvento="agregando" usuario={this.state.usuario} descripcion={trabajo.descripciontrab} metodopago={trabajo.metodopago} pago={trabajo.pago} periodo={trabajo.periodo} categoria={trabajo.categoria} modo="empleador" /> 
                ))}
            </div>
        } else {
            trabajosDisplay = <div className="sinEventos">
                Aún no hay trabajos para este evento.
         </div>
        }
        return (

            <div >

                <button className='agregarEvento-btn' onClick={this.handleOpenEvento}>Crear Evento</button>
                <Dialog
                    open={this.state.openEvento}
                    onClose={this.handleCloseEvento}
                    TransitionComponent={Transition}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="confirmation-dialog-title">Nuevo Evento</DialogTitle>
                    <DialogContent dividers>
                        <DialogContentText>
                            Ingrese los datos necesarios para poder crear su evento.
                    </DialogContentText>
                        <TextField id="nombre" required autoFocus margin="dense" label="Nombre del evento" type="evento" fullWidth />
                        <TextField id="descripcion" required multiline rows="2" margin="dense" label="Descripción" type="evento" fullWidth />
                        <TextField id="provincia" select required value={this.state.provinciaDisplay} onChange={this.handleCambiarProvincia('provinciaDisplay')} label="Provincia" fullWidth>
                            {provincias.map(option => <MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>)}
                        </TextField>
                        {ciudadesMostrar}
                        <TextField id="direccion" required margin="dense" label="Dirección" type="direccion" fullWidth />
                        <TextField id="date" required label="Comienzo:" type="date" defaultValue={materialDateInput} />
                        <TextField id="time" type="time" defaultValue="00:00" label=" " />
                        <br />
                        <TextField id="date2" required label="Terminación:" type="date" defaultValue={materialDateInput} />
                        <TextField id="time2" type="time" defaultValue="00:00" label=" " />
                        <Grid container
                            direction="row"
                            justify="center"
                            alignItems="center"
                        >
                            <div style={{ marginTop: 1 + 'em' }}>
                                <Button variant="outlined" size="large" onClick={this.handleOpenLista}>{this.state.cantTrabajos} Trabajos</Button>

                            </div>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseEvento} color="secondary">
                            CERRAR
                         </Button>
                        <Button onClick={this.handleAgregarEvento} color="primary">
                            AGREGAR EVENTO
                         </Button>
                    </DialogActions>
                </Dialog>
                {/*Lista de trabajos*/}
                <Dialog
                    open={this.state.openLista}
                    onClose={this.handleCloseLista}
                    TransitionComponent={Transition}
                    fullWidth={true}
                    maxWidth={'md'}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="confirmation-dialog-title">Lista de Trabajos</DialogTitle>
                    <DialogContent dividers>
                        {trabajosDisplay}
                        <Grid container direction="row" justify="center" alignItems="center">
                            <div style={{ marginTop: 1 + 'em' }}>
                                <Button variant="outlined" size="large" onClick={this.handleOpenTrabajo}>Agregar Trabajo</Button>
                            </div>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseLista} color="primary">
                            VOLVER
                         </Button>
                    </DialogActions>
                </Dialog>
                {/*Agregar Trabajo*/}
                <Dialog
                    open={this.state.openTrabajo}
                    onClose={this.handleCloseTrabajo}
                    TransitionComponent={Transition}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="confirmation-dialog-title">Nuevo Trabajo</DialogTitle>
                    <DialogContent dividers>
                        <TextField id="rol" required autoFocus margin="dense" label="Rol del trabajador" type="rol" fullWidth />
                        <TextField id="descripcion-trab" required multiline rows="2" margin="dense" label="Descripción del trabajo" type="descripcion" fullWidth />
                        <TextField id="metodopago" select required margin="dense" value={this.state.metodopagoDisplay} SelectProps={{ native: true, }} onChange={this.handleCambiarMetodopago('metodopagoDisplay')} label="Metodo de Pago" fullWidth>
                            {metodopago.map(option => (<option key={option.value} value={option.value}>{option.label}</option>))}
                        </TextField>
                        <TextField id="pago" required margin="dense" label="Pago" type="number" fullWidth />
                        <TextField id="periodo" select required margin="dense" value={this.state.periodoDisplay} SelectProps={{ native: true, }} onChange={this.handleCambiarPeriodo('periodoDisplay')} label="Periodo de Pago" fullWidth>
                            {periodos.map(option => (<option key={option.value} value={option.value}>{option.label}</option>))}
                        </TextField>
                        <TextField id="categoria" select margin="dense" value={this.state.categoriaDisplay} SelectProps={{ native: true, }} onChange={this.handleCambiarCategoria('categoriaDisplay')} label="Categoría" fullWidth>
                            {categorias.map(option => (<option key={option.value} value={option.value}>{option.label}</option>))}
                        </TextField>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseTrabajo} color="secondary">
                            VOLVER
                         </Button>
                        <Button onClick={this.handleAgregarTrabajo} color="primary">
                            AGREGAR
                         </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}