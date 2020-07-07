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
import MenuItem from '@material-ui/core/MenuItem';
import Agregar from './DB/Agregar';
import TrabajoTarjeta from './TrabajoTarjeta';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});
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
            zona: "",
            direccion: "",
            diaComienzo: "",
            diaFinalizacion: "",
            horaComienzo: "",
            horaFinalizacion: "",
            cantTrabajos: 0,
            periodoDisplay: "Hora",
            categoriaDisplay: "",
            arrayTrabajos: [],
        }
    }

    handleCloseEvento = () => {
        this.setState({ openEvento: false });
        this.setState({ cantTrabajos: 0 });
        this.setState({ arrayTrabajos: [] });
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
                const zona = document.getElementById("zona").value;
                if (zona.trim() === "") {
                    alert("Zona es necesaria.")
                } else {
                    const direccion = document.getElementById("direccion").value;
                    if (direccion.trim() === "") {
                        alert("Dirección es necesaria.")
                    } else {
                        if (this.state.cantTrabajos === 0) {
                            alert("Se necesita al menos un trabajo para crear el evento.")
                        } else {
                            const dateComienzo = document.getElementById("date").value;
                            const timeComienzo = document.getElementById("time").value;
                            const dateFinaliza = document.getElementById("date2").value;
                            const timeFinaliza = document.getElementById("time2").value;
                            const mail_dueño_evento = this.state.usuario.email;  
                            const nombre_dueño_evento = this.state.usuario.fullname;                            
                            const cantidadTrabajos = this.state.cantTrabajos;
                            // alert(nombre + "//" + zona + "//" + direccion + "//" + datetimeComienzo + "//" + datetimeFinaliza)
                            const nuevoEvento = Agregar.agregarEvento(nombre, descripcion, mail_dueño_evento, nombre_dueño_evento, zona, direccion, dateComienzo, timeComienzo, dateFinaliza, timeFinaliza, cantidadTrabajos);
                            for (let t = 0; t < this.state.cantTrabajos; t++) {
                                const rolT = this.state.arrayTrabajos[t].rol;
                                const descripciontrab = this.state.arrayTrabajos[t].descripciontrab;
                                const datecomienzotrab = this.state.arrayTrabajos[t].datecomienzotrab;
                                const datefintrab = this.state.arrayTrabajos[t].datefintrab;
                                const timecomienzotrab = this.state.arrayTrabajos[t].timecomienzotrab;
                                const timefintrab = this.state.arrayTrabajos[t].timefintrab;
                                const pago = this.state.arrayTrabajos[t].pago;
                                const periodo = this.state.arrayTrabajos[t].periodo;
                                const categoria = this.state.arrayTrabajos[t].categoria;
                                setTimeout(function () {
                                    Agregar.agregarTrabajo(nuevoEvento, mail_dueño_evento, rolT, descripciontrab, datecomienzotrab, timecomienzotrab, datefintrab, timefintrab, pago, periodo, categoria);
                                }, t * 1000);
                            }
                            this.setState({ openEvento: false });
                            this.setState({ cantTrabajos: 0 });
                            this.setState({ arrayTrabajos: [] });
                        }
                    }
                }
            }
        }
    }

    handleAgregarTrabajo = () => {
        const rol = document.getElementById("rol").value;
        if (rol.trim() === "") {
            alert("Rol es Requerido.")
        } else {
            const descripciontrab = document.getElementById("descripcion-trab").value;
            if (descripciontrab.trim() === "") {
                alert("Descripcion es Requerida.")
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
                        const datecomienzotrab = document.getElementById("date-comienzo-trab").value;
                        const datefintrab = document.getElementById("date-fin-trab").value;
                        const timecomienzotrab = document.getElementById("time-comienzo-trab").value;
                        const timefintrab = document.getElementById("time-fin-trab").value;
                        const job = { rol: rol, descripciontrab: descripciontrab, pago: pago, periodo: periodo, datecomienzotrab: datecomienzotrab, timecomienzotrab: timecomienzotrab, datefintrab: datefintrab, timefintrab: timefintrab, categoria:categoria };
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

    render() {
        var trabajosDisplay = "";
        if (this.state.arrayTrabajos.length > 0) {
            trabajosDisplay = <div>
                {this.state.arrayTrabajos.map(trabajo => (<TrabajoTarjeta rol={trabajo.rol} descripcion={trabajo.descripciontrab} pago={trabajo.pago} periodo={trabajo.periodo} datecomienzotrab={trabajo.datecomienzotrab} datefintrab={trabajo.datefintrab} timecomienzotrab={trabajo.timecomienzotrab} timefintrab={trabajo.timefintrab} categoria={trabajo.categoria} modo="empleador" />
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
                        <TextField id="descripcion" required multiline rows="2" margin="dense" label="Descripcion" type="evento" fullWidth />
                        <TextField id="zona" required margin="dense" label="Zona" type="zona" fullWidth />
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
                            Cancel
                         </Button>
                        <Button onClick={this.handleAgregarEvento} color="primary">
                            Ok
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
                            Ok
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
                        <TextField id="pago" required margin="dense" label="Pago" type="number" fullWidth/>
                        <TextField id="periodo" select required margin="dense" value={this.state.periodoDisplay} onChange={this.handleCambiarPeriodo('periodoDisplay')}  label="Periodo de Pago" fullWidth>
                            {periodos.map(option => (<MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>))}
                        </TextField>
                        <TextField id="categoria" select margin="dense" value={this.state.categoriaDisplay} onChange={this.handleCambiarCategoria('categoriaDisplay')}  label="Categoria" fullWidth>
                            {categorias.map(option => (<MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>))}
                        </TextField>
                        <TextField id="date-comienzo-trab" required label="Comienzo" type="date" defaultValue={materialDateInput} />
                        <TextField id="time-comienzo-trab" required type="time" defaultValue="00:00" label=" " />
                        <br />
                        <TextField id="date-fin-trab" label="Terminación" type="date" defaultValue={materialDateInput} />
                        <TextField id="time-fin-trab" type="time" defaultValue="00:00" label=" " />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseTrabajo} color="secondary">
                            Cancel
                         </Button>
                        <Button onClick={this.handleAgregarTrabajo} color="primary">
                            Ok
                         </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}