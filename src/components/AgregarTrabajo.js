import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogContentText from '@material-ui/core/DialogContentText';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

export default class AgregarTrabajo extends React.Component {
    constructor() {
        super();
        this.state = {
            success: false,
            open: false,
            nombre: "",

        }
    }
    handleClose = () => {
        this.setState({ open: false });
    };
    handleOpen = () => {
        this.setState({ open: true });
    };
    handleOk = () => {
        alert("agregado")
    }
    render() {

        return (

            <div >

                <button class='agregarTrabajo-btn' onClick={this.handleOpen}>Agregar Trabajo</button>
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
                        <TextField id="zona" autoFocus margin="dense" label="Zona" type="zona" fullWidth />
                        <TextField id="direccion" autoFocus margin="dense" label="Dirección" type="direccion" fullWidth />
                        <TextField id="date" label="Comienzo:" type="date"  defaultValue="2020-05-24" />
                        <TextField id="time" type="time" defaultValue="00:00"  label=" " />
                        <br/>
                            <TextField id="date" label="Terminación:" type="date"  defaultValue="2020-05-24" />
                            <TextField id="time" type="time" defaultValue="00:00"  label=" " />
                           </DialogContent>
                        <DialogActions>
                            <Button autoFocus onClick={this.handleClose} color="primary">
                                Cancel
                         </Button>
                            <Button onClick={this.handleOk} color="primary">
                                Ok
                         </Button>
                        </DialogActions>
                </Dialog>
            </div>
        );
    }
}