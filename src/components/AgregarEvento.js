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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

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
    };
    handleAgregarEvento = () => {
        const nombre = document.getElementById("nombre").value;
        const descripcion = document.getElementById("descripcion").value;
        const zona = document.getElementById("zona").value;
        const direccion = document.getElementById("direccion").value;
        const datetimeComienzo = document.getElementById("date").value + " " + document.getElementById("time").value;
        const datetimeFinaliza = document.getElementById("date2").value + " " + document.getElementById("time2").value;
        const mail_dueño_evento = this.state.usuario.email;
        // alert(nombre + "//" + zona + "//" + direccion + "//" + datetimeComienzo + "//" + datetimeFinaliza)
        const nuevoEvento = Agregar.agregarEvento(nombre, descripcion, mail_dueño_evento, zona, direccion, datetimeComienzo, datetimeFinaliza);
        for (let t = 0; t < this.state.cantTrabajos; t++) {
            const rolT = this.state.arrayTrabajos[t].rol;
            const descripciontrab = this.state.arrayTrabajos[t].descripciontrab;
            const datecomienzotrab = this.state.arrayTrabajos[t].datecomienzotrab;
            const datefintrab = this.state.arrayTrabajos[t].datefintrab;
            const pago = this.state.arrayTrabajos[t].pago;
            const periodo = this.state.arrayTrabajos[t].periodo;
            setTimeout(function () {
                Agregar.agregarTrabajo(nuevoEvento, mail_dueño_evento, rolT, descripciontrab, datecomienzotrab, datefintrab, pago, periodo);
            }, t*1000);
        }
        this.setState({ openEvento: false });
        this.setState({ cantTrabajos: 0 });
        this.setState({ arrayTrabajos: [] });
    }

    handleAgregarTrabajo = () => {
        const rol = document.getElementById("rol").value;
        const descripciontrab = document.getElementById("descripcion-trab").value;
        const pago = document.getElementById("pago").value;
        const periodo = document.getElementById("periodo").value;
        const datecomienzotrab = document.getElementById("date-comienzo-trab").value + " " + document.getElementById("time-comienzo-trab").value;
        const datefintrab = document.getElementById("date-fin-trab").value + " " + document.getElementById("time-fin-trab").value;
        const job = { rol: rol, descripciontrab: descripciontrab, pago: pago, periodo: periodo, datecomienzotrab: datecomienzotrab, datefintrab: datefintrab };
        this.state.arrayTrabajos.push(job);
        var nuevaCantidad = this.state.cantTrabajos + 1;
        this.setState({ cantTrabajos: nuevaCantidad });
        this.setState({ openTrabajo: false });
    }


    render() {
        var trabajosDisplay = "";
        if (this.state.arrayTrabajos.length > 0) {
            trabajosDisplay = <div>
                {this.state.arrayTrabajos.map(evento => (<TrabajoTarjeta rol={evento.rol} descripcion={evento.descripciontrab} pago={evento.pago} periodo={evento.periodo} datecomienzotrab={evento.datecomienzotrab} datefintrab={evento.datefintrab} modo="empleador" />
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
                        <TextField id="nombre" autoFocus margin="dense" label="Nombre del evento" type="evento" fullWidth />
                        <TextField id="descripcion" multiline rows="2" margin="dense" label="Descripcion" type="evento" fullWidth />
                        <TextField id="zona" margin="dense" label="Zona" type="zona" fullWidth />
                        <TextField id="direccion" margin="dense" label="Dirección" type="direccion" fullWidth />
                        <TextField id="date" label="Comienzo:" type="date" defaultValue={materialDateInput} />
                        <TextField id="time" type="time" defaultValue="00:00" label=" " />
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
                        <TextField id="rol" autoFocus margin="dense" label="Rol del trabajador" type="rol" fullWidth />
                        <TextField id="descripcion-trab" multiline rows="2" margin="dense" label="Descripción del trabajo" type="descripcion" fullWidth />
                        <TextField id="pago" margin="dense" label="Pago" type="number" />
                        <TextField id="periodo" margin="dense" label="Periodo" type="number" />
                        <br />
                        <TextField id="date-comienzo-trab" label="Comienzo:" type="date" defaultValue={materialDateInput} />
                        <TextField id="time-comienzo-trab" type="time" defaultValue="00:00" label=" " />
                        <br />
                        <TextField id="date-fin-trab" label="Terminación:" type="date" defaultValue={materialDateInput} />
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