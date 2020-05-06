import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogContentText from '@material-ui/core/DialogContentText';
import './DarPuntuacion.css';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

export default class DarPuntuacion extends React.Component {
    constructor() {
        super();
        this.state = {
            success: false,
            open: false,
            nombre: "Marcelo Perez",
        }
    }
    handleClose = () => {
        this.setState({ open: false });
    };
    handleOpen = () => {
        this.setState({ open: true });
    };
    handleOk = () => {
        var opinion = document.getElementById("nombre").value;
        var puntuacion = -1;
        for (var i = 0; i < document.getElementsByName('estrellas').length; i++) {
            if (document.getElementsByName('estrellas')[i].checked === true) {
                puntuacion = document.getElementsByName('estrellas')[i].value;
                break;
            }
        }
        if (opinion === "") {
            alert("Debe ingresar un comentario.");
        } else {
            if (puntuacion === -1) {
                alert("Debe puntuar para dejar su comentario.")
            } else {
                alert("Comentario Agregado.")
            }
        }
    }
    render() {

        return (

            <div >
                <button className="profile-card__button button--blue js-message-btn" onClick={this.handleOpen}>Puntuar</button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    TransitionComponent={Transition}
                    fullWidth={true}
                    maxWidth={'md'}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="confirmation-dialog-title">{this.state.nombre}</DialogTitle>
                    <DialogContent dividers>
                        <DialogContentText>
                            ¿Como calificarias su trabajo?
                    </DialogContentText>
                        <TextField id="nombre" autoFocus multiline="true" rows="6" margin="dense" label="Opinión" type="opinion" fullWidth />
                        <form>
                            <p className="clasificacion-stars">
                                <input id="radio1" type="radio" name="estrellas" value="10" />
                                <label for="radio1">★</label>
                                <input id="radio2" type="radio" name="estrellas" value="9" />
                                <label for="radio2">★</label>
                                <input id="radio3" type="radio" name="estrellas" value="8" />
                                <label for="radio3">★</label>
                                <input id="radio4" type="radio" name="estrellas" value="7" />
                                <label for="radio4">★</label>
                                <input id="radio5" type="radio" name="estrellas" value="6" />
                                <label for="radio5">★</label>
                                <input id="radio6" type="radio" name="estrellas" value="5" />
                                <label for="radio6">★</label>
                                <input id="radio7" type="radio" name="estrellas" value="4" />
                                <label for="radio7">★</label>
                                <input id="radio8" type="radio" name="estrellas" value="3" />
                                <label for="radio8">★</label>
                                <input id="radio9" type="radio" name="estrellas" value="2" />
                                <label for="radio9">★</label>
                                <input id="radio10" type="radio" name="estrellas" value="1" />
                                <label for="radio10">★</label>
                            </p>
                        </form>
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