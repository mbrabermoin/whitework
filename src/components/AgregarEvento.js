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
            open: false,
            usuario: props.usuario,
            nombre: "",
            zona: "",
            direccion: "",
            diaComienzo: "",
            diaFinalizacion: "",
            horaComienzo: "",
            horaFinalizacion: "",
            cantTrabajos: 0,
        }
    }
    handleClose = () => {
        this.setState({ open: false });
    };
    handleOpen = () => {
        this.setState({ open: true });
    };
    handleAgregarEvento = () => {
        const nombre = document.getElementById("nombre").value;
        const descripcion = document.getElementById("descripcion").value;
        const zona = document.getElementById("zona").value;
        const direccion = document.getElementById("direccion").value;
        const datetimeComienzo = document.getElementById("date").value+" "+document.getElementById("time").value;
        const datetimeFinaliza = document.getElementById("date2").value+" "+document.getElementById("time2").value;
        const mail_dueño_evento = this.state.usuario.email;
       // alert(nombre + "//" + zona + "//" + direccion + "//" + datetimeComienzo + "//" + datetimeFinaliza)
       Agregar.agregarEvento(nombre, descripcion, mail_dueño_evento, zona, direccion, datetimeComienzo,  datetimeFinaliza);
        this.setState({ open: false });
    }


    render() {

        return (

            <div >

                <button className='agregarEvento-btn' onClick={this.handleOpen}>Crear Evento</button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    TransitionComponent={Transition}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="confirmation-dialog-title">Nuevo Evento</DialogTitle>
                    <DialogContent dividers>
                        <DialogContentText>
                            Ingrese los datos necesarios para poder crear su evento.
                    </DialogContentText>
                        <TextField id="nombre" autoFocus margin="dense" label="Nombre del evento" type="evento" fullWidth />
                        <TextField id="descripcion" multiline="multiline" rows="2" margin="dense" label="Descripcion" type="evento" fullWidth />
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
                                <Button variant="outlined" size="large" onClick={this.handleOpenTrabajos}>{this.state.cantTrabajos} Trabajos</Button>

                            </div>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="secondary">
                            Cancel
                         </Button>
                        <Button onClick={this.handleAgregarEvento} color="primary">
                            Ok
                         </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}