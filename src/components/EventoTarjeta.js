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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});
class EventoTarjeta extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modo:this.props.modo,
            openDetalle: false,
            openTrabajo: false,
            openPerfil: false,
            titulo: this.props.titulo,
            tiempo: this.props.tiempo,
            zona: this.props.zona,
            privado: this.props.privado,
            mailDueño: this.props.mailDueño,
            nombreDueño: this.props.nombreDueño,
            telefono: this.props.telefonoDueño,
            descripcion: this.props.descripcion,
            direccion: this.props.direccion,
            cantTrabajos: this.props.cantTrabajos,
            tipoDueño: this.props.tipoDueño,
            eventoid: this.props.eventoid,
            horario: "00:00",
            fecha: "2002-10-10",
            trabajos: [],
        }
    }
    buscarTrabajos(evento) {
        var filtro = db.collection("trabajos").where("id_evento", "==", evento)
        filtro.onSnapshot((snapShots) => {
            this.setState({
                trabajos: snapShots.docs.map(doc => {
                    return { id: doc.id, data: doc.data() }
                })
            })
        }, error => {
            console.log(error)
        });
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
    render() {
        var trabajos = this.state.trabajos;
        var contenedorTrabajos = <div>
            {trabajos.map(trabajo => (<TrabajoTarjeta key={trabajo.id} rol={trabajo.data.rol} descripcion={trabajo.data.descripcion} pago={trabajo.data.pago} periodo={trabajo.data.periodo} datecomienzotrab={trabajo.data.datetimeComienzo} datefintrab={trabajo.data.datetimeFinaliza} modo={this.state.modo}/>
            ))}
        </div>
        var dueño = "";
        if (this.state.modo === "empleado"){
        dueño = <div>
            <Button variant="outlined" size="large" onClick={this.handleOpenPerfil}>Organiza: {this.state.nombreDueño}</Button>
        </div>
        }else{
            dueño = "";
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
                            {dueño}
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
                        {contenedorTrabajos}
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
                        <DueñoTarjeta mailDueño={this.state.mailDueño}/>
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