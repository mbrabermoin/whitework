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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});
class EventoTarjeta extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modo:this.props.modo,
            usuario: this.props.usuario,
            openDetalle: false,
            openTrabajo: false,
            openPerfil: false,
            openEliminarEvento: false,
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
    }
    buscarTrabajos(evento) {
        var trab = [];
        var trabajosPostulados = this.state.trabajosPostulados;
        /*var filtro = db.collection("trabajos").where("id_evento", "==", evento)
        filtro.onSnapshot((snapShots) => {
            this.setState({
                trabajos: snapShots.docs.map(doc => {
                    return { id: doc.id, data: doc.data() }
                })
            })
        }, error => {
            console.log(error)
        });*/
        if(trabajosPostulados===undefined){
            db.collection("trabajos").where("id_evento", "==", evento).get()
            .then(function (querySnapshot) {
              querySnapshot.forEach(function (doc) {
                  return trab.push({id: doc.id, data: doc.data(), postulado: "N"});
              });
            })
            .catch(function (error) {
              console.log("Error getting documents: ", error);
            });
        }else{
            db.collection("trabajos").where("id_evento", "==", evento).get()
            .then(function (querySnapshot) {
              querySnapshot.forEach(function (doc) {
                  const found = trabajosPostulados.find(element => element === doc.data().id_trabajo);
                if (found === doc.data().id_trabajo) {
                  return trab.push({id: doc.id, data: doc.data(), postulado: "Y"});
                }else{
                  return trab.push({id: doc.id, data: doc.data(), postulado: "N"});            
                }
              });
            })
            .catch(function (error) {
              console.log("Error getting documents: ", error);
            });
        }
        
      setTimeout(() => { 
          console.log(trab)  
         this.setState({trabajos: trab})
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
    actualizarEventos() {
        this.props.actualizarEventosGeneral();
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
    }
    render() {
        var fechas = this.state.datecomienzo + " - " + this.state.timecomienzo;
        var horarios = this.state.datefin + " - " + this.state.timefin;
        var dueño = "";
        if (this.state.modo === "empleado"){
        dueño = <div>
            <Button variant="outlined" size="large" onClick={this.handleOpenPerfil}>Organiza: {this.state.nombreDueño}</Button>
        </div>
        }else{
            dueño = "";
        }
        var botonEliminarEvento = "";
        if (this.state.modo === "empleador" && this.state.estadoEvento === "pendiente"){
            botonEliminarEvento = 
            <button className='eliminar-btn' onClick={this.handleOpenEliminarEvento}>Eliminar</button>
        }else{
            botonEliminarEvento = "";
        }
        var trabajos = this.state.trabajos;
        var contenedorTrabajos = <div>
            {trabajos.map(trabajo => (<TrabajoTarjeta key={trabajo.id} actualizarEventos={this.actualizarEventos} postulado={trabajo.postulado} usuario={this.state.usuario} estadoEvento={this.state.estadoEvento} rol={trabajo.data.rol} descripcion={trabajo.data.descripcion} evento={trabajo.data.id_evento} trabajo={trabajo.data.id_trabajo} cantTrabajos={this.state.cantTrabajos} pago={trabajo.data.pago} periodo={trabajo.data.periodo} datecomienzotrab={trabajo.data.dateComienzo} datefintrab={trabajo.data.dateFinaliza} timecomienzotrab={trabajo.data.timeComienzo} timefintrab={trabajo.data.timeFinaliza} categoria={trabajo.data.categoria} cantPost={trabajo.data.cantPostulados} cantPostEvento={this.state.cantPostEvento} cantPuntEvento={this.state.cantPuntEvento} cantAsignados={this.state.cantAsignados} asignado={trabajo.data.mail_trabajador} puntuadoEmpleado={trabajo.data.puntuadoEmpleado} puntuadoEmpleador={trabajo.data.puntuadoEmpleador} dueño={this.state.mailDueño} modo={this.state.modo}/>
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
                        <DueñoTarjeta mailDueño={this.state.mailDueño}/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClosePerfil} color="primary">
                            CERRAR
                         </Button>
                    </DialogActions>
                </Dialog>
                {/*Consultar si desea eliminar evento*/ }
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
            </div>
        );
    }
}

export default EventoTarjeta;