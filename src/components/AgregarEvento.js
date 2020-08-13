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
// Setting current Month number from current Date object
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
            categoriaDisplay: "",
            provinciaDisplay: "",
            ciudadDisplay: "",
            ciudades: [],
            arrayTrabajos: [],
        }
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
        this.setState({ categoriaDisplay: "" });
    };
    handleAgregarEvento = () => {
        const nombre = document.getElementById("nombre").value;
        if (nombre.trim() === "") {
            alert("Nombre es necesario.")
        } else {
            const descripcion = document.getElementById("descripcion").value;
            if (descripcion.trim() === "") {
                alert("Descripción es necesaria.")
            } else {
                const provincia = this.state.provincia;
                if (provincia.trim() === "") {
                    alert("Provincia es necesaria.")
                } else {
                    const ciudad = this.state.ciudad;
                    if (ciudad.trim() === "") {
                        alert("Ciudad es necesaria.")
                    } else {
                        const direccion = document.getElementById("direccion").value;
                        if (direccion.trim() === "") {
                            alert("Dirección es necesaria.")
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
                                alert("Fecha de Finalización debe ser posterior a la de Comienzo.")
                            } else {
                                if (dateTime >= fromDateConcat) {
                                    alert("La fecha de Comiezo debe ser posterior a la actual.")
                                } else {
                                    if (this.state.cantTrabajos === 0) {
                                        alert("Se necesita al menos un trabajo para crear el evento.")
                                    } else {
                                        // alert(nombre + "//" + provincia + "//"+ ciudad + "//" + direccion + "//" + datetimeComienzo + "//" + datetimeFinaliza)
                                        const nuevoEvento = Agregar.agregarEvento(nombre, descripcion, mail_dueño_evento, nombre_dueño_evento, provincia, ciudad, direccion, dateComienzo, timeComienzo, dateFinaliza, timeFinaliza, cantidadTrabajos);
                                        for (let t = 0; t < this.state.cantTrabajos; t++) {
                                            const rolT = this.state.arrayTrabajos[t].rol;
                                            const descripciontrab = this.state.arrayTrabajos[t].descripciontrab;
                                            /*const datecomienzotrab = this.state.arrayTrabajos[t].datecomienzotrab;
                                            const datefintrab = this.state.arrayTrabajos[t].datefintrab;
                                            const timecomienzotrab = this.state.arrayTrabajos[t].timecomienzotrab;
                                            const timefintrab = this.state.arrayTrabajos[t].timefintrab;*/
                                            const pago = this.state.arrayTrabajos[t].pago;
                                            const periodo = this.state.arrayTrabajos[t].periodo;
                                            const categoria = this.state.arrayTrabajos[t].categoria;
                                            setTimeout(function () {
                                                Agregar.agregarTrabajo(nuevoEvento, mail_dueño_evento, rolT, descripciontrab, dateComienzo, timeComienzo, dateFinaliza, timeFinaliza, pago, periodo, categoria);
                                            }, t * 1100);
                                        }
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
            alert("Rol es Requerido.")
        } else {
            const descripciontrab = document.getElementById("descripcion-trab").value;
            if (descripciontrab.trim() === "") {
                alert("Descripción es Requerida.")
            } else {
                const pago = document.getElementById("pago").value;
                if (pago.trim() === "") {
                    alert("Pago es Requerido.")
                } else {
                    const periodo = this.state.periodoDisplay;
                    if (periodo.trim() === "") {
                        alert("Periodo es Requerido.")
                    } else {
                        const categoria = this.state.categoriaDisplay;
                        /*const datecomienzotrab = document.getElementById("date-comienzo-trab").value;
                        const datefintrab = document.getElementById("date-fin-trab").value;
                        const timecomienzotrab = document.getElementById("time-comienzo-trab").value;
                        const timefintrab = document.getElementById("time-fin-trab").value;*/
                        const job = { rol: rol, descripciontrab: descripciontrab, pago: pago, periodo: periodo, categoria: categoria };//datecomienzotrab: datecomienzotrab, timecomienzotrab: timecomienzotrab, datefintrab: datefintrab, timefintrab: timefintrab
                        this.state.arrayTrabajos.push(job);
                        var nuevaCantidad = this.state.cantTrabajos + 1;
                        this.setState({ cantTrabajos: nuevaCantidad });
                        this.setState({ openTrabajo: false });
                    }
                }
            }
        }

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
                {this.state.arrayTrabajos.map(trabajo => (<TrabajoTarjeta rol={trabajo.rol} estadoEvento="agregando" usuario={this.state.usuario} descripcion={trabajo.descripciontrab} pago={trabajo.pago} periodo={trabajo.periodo} categoria={trabajo.categoria} modo="empleador" />//datecomienzotrab={trabajo.datecomienzotrab} datefintrab={trabajo.datefintrab} timecomienzotrab={trabajo.timecomienzotrab} timefintrab={trabajo.timefintrab} 
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
                        <TextField id="time" required type="time" defaultValue="00:00" label=" " />
                        <br />
                        <TextField id="date2" label="Terminación:" type="date" defaultValue={materialDateInput} />
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
                        <TextField id="pago" required margin="dense" label="Pago" type="number" fullWidth />
                        <TextField id="periodo" select required margin="dense" value={this.state.periodoDisplay} SelectProps={{ native: true, }} onChange={this.handleCambiarPeriodo('periodoDisplay')} label="Periodo de Pago" fullWidth>
                            {periodos.map(option => (<option key={option.value} value={option.value}>{option.label}</option>))}
                        </TextField>
                        <TextField id="categoria" select margin="dense" value={this.state.categoriaDisplay} SelectProps={{ native: true, }} onChange={this.handleCambiarCategoria('categoriaDisplay')} label="Categoría" fullWidth>
                            {categorias.map(option => (<option key={option.value} value={option.value}>{option.label}</option>))}
                        </TextField>
                        {/*<TextField id="date-comienzo-trab" required label="Comienzo" type="date" defaultValue={materialDateInput} />
                        <TextField id="time-comienzo-trab" required type="time" defaultValue="00:00" label=" " />
                        <br />
                        <TextField id="date-fin-trab" label="Terminación" type="date" defaultValue={materialDateInput} />
                        <TextField id="time-fin-trab" type="time" defaultValue="00:00" label=" " />*/}
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