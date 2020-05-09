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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});
class EventoTarjeta extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openDetalle: false,
            openTrabajo: false,
            openPerfil: false,
            titulo: this.props.titulo,
            tiempo: this.props.tiempo,
            zona: this.props.zona,
            privado: this.props.privado,
            mail: this.props.mailDueño,
            telefono: this.props.telefonoDueño,
            descripcion: this.props.descripcion,
            direccion: this.props.direccion,
            cantTrabajos: this.props.cantTrabajos,
            dueñoEvento: this.props.dueñoEvento,
            tipoDueño: this.props.tipoDueño,
            horario: "00:00",
            fecha: "2002-10-10",
        }
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
    }
    handleClosePerfil = () => {
        this.setState({ openPerfil: false });
    }
    handleOpenPerfil = () => {
        this.setState({ openPerfil: true });
    }
    render() {
        var privacidad ="";
        if(this.state.privado === "yes"){
            privacidad=<div><h3>{this.state.mail}</h3>
            <h3>{this.state.telefono}</h3></div>
        }
        return (
            <div>
                <div className='card'>
                    <div className='top-library'>
                        <i className="fas fa-book-open book">{this.state.titulo}</i>
                    </div>
                    <div className='middle-library'>
                        <p className='type'>{this.state.tiempo}</p>
                        <h3 className='job-name'>{this.state.zona}</h3>
                        <p className='desc'>{this.state.descripcion}</p>
                        <button className='resume-btn' onClick={this.handleOpenDetalle}>Ver Detalle</button>
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
                        <TextField id="dias" margin="dense" disabled label="Día/s" type="date" value={this.state.fecha} fullWidth />
                        <TextField id="horario" margin="dense" disabled label="Horario" type="time" value={this.state.horario} fullWidth />
                        <TextField id="direccion" margin="dense" disabled label="Dirección" type="direccion" value={this.state.direccion} fullWidth />
                        <Grid container
                            direction="row"
                            justify="center"
                            alignItems="center"
                        >
                            <div style={{ marginRight: 4 + 'em' }}>
                                <Button variant="outlined" size="large" onClick={this.handleOpenTrabajos}>{this.state.cantTrabajos} Trabajos</Button>

                            </div>
                            <div>
                                <Button variant="outlined" size="large" onClick={this.handleOpenPerfil}>Organiza: {this.state.dueñoEvento}</Button>

                            </div>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseDetalle} color="primary">
                            Cancel
                         </Button>
                        <Button onClick={this.handleOk} color="primary">
                            Ok
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
                        <TrabajoTarjeta />
                        <TrabajoTarjeta />
                        <TrabajoTarjeta />
                        <TrabajoTarjeta />
                        <TrabajoTarjeta />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseTrabajos} color="primary">
                            Cancel
                         </Button>
                        <Button onClick={this.handleCloseTrabajos} color="primary">
                            Ok
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
                        <div fullwidth class="card-trabajo">
                            <img class="avatar-trabajo" src="https://f1.pngfuel.com/png/1008/352/43/circle-silhouette-user-user-profile-user-interface-login-user-account-avatar-data-png-clip-art.png" alt="person1" />
                            <div class="skewed bg-react"></div>
                            <div class="content-trabajo">
                                <div className="trabajo-postularse"><h1>{this.state.dueñoEvento}</h1>
                                    {privacidad}
                                    <p class="esp text-react">{this.state.tipoDueño}</p>
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClosePerfil} color="primary">
                            Cancel
                         </Button>
                        <Button onClick={this.handleClosePerfil} color="primary">
                            Ok
                         </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default EventoTarjeta;