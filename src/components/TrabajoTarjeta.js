import React from 'react';
import './TrabajoTarjeta.css';
import Eliminar from './DB/Eliminar';
import Editar from './DB/Editar';
import Agregar from './DB/Agregar';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import PostuladoTarjeta from './PostuladoTarjeta';
import db from '../index';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});
class TrabajoTarjeta extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openPostulados: false,
            postulados: [],
            modo: this.props.modo,
            rol: this.props.rol,
            evento: this.props.evento,
            estadoEvento: this.props.estadoEvento,
            trabajo: this.props.trabajo,
            descripcion: this.props.descripcion,
            cantTrabajos: this.props.cantTrabajos,
            pago: this.props.pago,
            periodo: this.props.periodo,
            categoria: this.props.categoria,
            datecomienzotrab: this.props.datecomienzotrab,
            timecomienzotrab: this.props.timecomienzotrab,
            datefintrab: this.props.datefintrab,
            timefintrab: this.props.timefintrab,
            usuario: this.props.usuario,
        }
    }
    buscarPostulados(trabajo) {
        var filtro = db.collection("postulaciones").where("id_trabajo", "==", trabajo)
        filtro.onSnapshot((snapShots) => {
          this.setState({
            postulados: snapShots.docs.map(doc => {
              console.log(doc.data())
              return { id: doc.id, data: doc.data() }
            })
          })
        }, error => {
          console.log(error)
        });
      }
    eliminarTrabajo = () => {
        var trabajo = this.state.trabajo;
        var evento = this.state.evento;
        var cantTrabajos = this.state.cantTrabajos;
        Eliminar.eliminarTrabajo(trabajo);
        Editar.restarTrabajo(evento, cantTrabajos);
    }
    postularse = () => {
        var mail = this.state.usuario.email;
        var trabajo = this.state.trabajo;
        var evento = this.state.evento;
        Agregar.agregarPostulacion(mail, trabajo, evento);
        Editar.cambiarEstadoEvento(evento, "postulado");
        Editar.cambiarEstadoTrabajo(trabajo, "postulado");
    }
    handleClosePostulados = () => {
        this.setState({ openPostulados: false });
    }
    handleOpenPostulados = () => {
        this.buscarPostulados(this.state.trabajo);
        this.setState({ openPostulados: true });
    }
    render() {
        var categoria = "";
        if (this.state.categoria !== "") {
            categoria = " - Categoria: " + this.state.categoria;
        }
        var botones = "";
        if (this.state.modo === "empleado") {
            botones = <button className='postularse-btn' onClick={this.postularse}>Postularse</button>
        } else {
            if (this.state.estadoEvento === "pendiente") {
                botones = <div><button className='eliminartrabajo-btn' onClick={this.eliminarTrabajo}>Eliminar</button>
                    <button className='editar-btn' onClick={this.editarTrabajo}>Editar</button>
                </div>
            } else {
                if (this.state.estadoEvento === "postulado") {
                    botones = <button className='editar-btn' onClick={this.handleOpenPostulados}>Ver Postulantes</button>
                }
            }
        }
        var postulados = this.state.postulados;
        var contenedorPostulados = <div>
            {postulados.map(postulado => (<PostuladoTarjeta key={postulado.id} mailPostulado={postulado.data.mail_postulante}/>))}
        </div>
        return (
            <div>
                <div fullwidth class="card-trabajo">
                    <img class="avatar-trabajo" src="https://f1.pngfuel.com/png/1008/352/43/circle-silhouette-user-user-profile-user-interface-login-user-account-avatar-data-png-clip-art.png" alt="persona" />
                    <div class="skewed bg-react"></div>
                    <div class="content-trabajo">
                        <div className="trabajo-postularse"><h1>{this.state.rol}{categoria}</h1>
                            {botones}
                        </div>
                        <h3>{this.props.descripcion}</h3>
                        <h3>Comienza: {this.state.datecomienzotrab} - {this.state.timecomienzotrab}   Finaliza: {this.state.datefintrab} - {this.state.timefintrab}</h3>
                        <p class="esp text-react">{this.state.pago}$ por {this.state.periodo}</p>
                    </div>
                </div>
                <Dialog
                    open={this.state.openPostulados}
                    onClose={this.handleClosePostulados}
                    TransitionComponent={Transition}
                    fullWidth={true}
                    maxWidth={'md'}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="confirmation-dialog-title">Postulados</DialogTitle>
                    <DialogContent dividers>
                        {contenedorPostulados}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClosePostulados} color="primary">
                            CERRAR
                 </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
        }
    }

    export default TrabajoTarjeta;