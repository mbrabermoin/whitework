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
import TextField from '@material-ui/core/TextField';
import DialogContentText from '@material-ui/core/DialogContentText';
import db from '../index';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});
class TrabajoTarjeta extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openPostulados: false,
            openPuntuacion: false,
            openPuntuacionEmpleado: false,
            postulados: [],
            asignado: this.props.asignado,
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
            cantPost: this.props.cantPost,
            cantPostEvento: this.props.cantPostEvento,
            cantAsignados: this.props.cantAsignados,
            usuarioAsignado: null,
            mailDueño: this.props.dueño,
            dueño: null,
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
        var cantPost = this.state.cantPost + 1;
        var cantPostEvento = this.state.cantPostEvento + 1;
        Agregar.agregarPostulacion(mail, trabajo, evento);
        //Editar.cambiarEstadoEvento(evento, "postulado");
        Editar.agregarPostulacionEvento(evento, cantPostEvento, "postulado");
        Editar.agregarPostulacionTrabajo(trabajo, "postulado", cantPost);
    }
    handleClosePostulados = () => {
        this.setState({ openPostulados: false });
    }
    handleOpenPostulados = () => {
        this.buscarPostulados(this.state.trabajo);
        this.setState({ openPostulados: true });
    }
    handleClosePuntuacion = () => {
        this.setState({ openPuntuacion: false });
    }
    handleClosePuntuacionEmpleado = () => {
        this.setState({ openPuntuacionEmpleado: false });
    }
    handleOpenPuntuacion = () => {
        var docRef = db.collection("usuarios").doc(this.state.asignado);
        let component = this;
        docRef.get().then(function (doc) {
            if (doc.exists) {
                component.setState({ usuarioAsignado: doc.data() });
            } else {
                alert("Ha ocurrido un error. Actualice la página.");
            }
        }).catch(function (error) {
            console.log(error);
            alert("Ha ocurrido un error. Actualice la página.");
        });
        this.setState({ openPuntuacion: true });
    }
    handleOpenPuntuacionEmpleado = () => {
        var docRef = db.collection("usuarios").doc(this.state.mailDueño);
        let component = this;
        docRef.get().then(function (doc) {
            if (doc.exists) {
                console.log("Dueño:", doc.data());
                component.setState({ dueño: doc.data() });
            } else {
                alert("Ha ocurrido un error. Actualice la página.");
            }
        }).catch(function (error) {
            console.log(error);
            alert("Ha ocurrido un error. Actualice la página.");
        });
        this.setState({ openPuntuacionEmpleado: true });
    }
    puntuarEmpleado = () => {
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
                var mail_comentado = this.state.asignado;
                var mail_comentador = this.state.usuario.email;
                var nombre_comentador = this.state.usuario.fullname;
                var foto = this.state.usuario.urlFoto;
                //alert(mail_comentador+"/"+mail_comentado+"/"+opinion+"/"+puntuacion+"/TaE")
                Agregar.agregarComentario(mail_comentador, nombre_comentador, foto, mail_comentado, opinion, puntuacion, "CaE");
                alert("Comentario Agregado.")
                this.setState({ openPuntuacion: false });
            }
        }
    }
    puntuarEmpleador = () => {
        var opinion = document.getElementById("opinionEmpleado").value;
        var puntuacion = -1;
        for (var i = 0; i < document.getElementsByName('estrellasEmpleado').length; i++) {
            if (document.getElementsByName('estrellasEmpleado')[i].checked === true) {
                puntuacion = document.getElementsByName('estrellasEmpleado')[i].value;
                break;
            }
        }
        if (opinion === "") {
            alert("Debe ingresar un comentario.");
        } else {
            if (puntuacion === -1) {
                alert("Debe puntuar para dejar su comentario.")
            } else {
                var mail_comentado = this.state.mailDueño;
                var mail_comentador = this.state.usuario.email;
                var nombre_comentador = this.state.usuario.fullname;
                var foto = this.state.usuario.urlFoto;
                //alert(mail_comentador+"/"+nombre_comentador+"/"+foto+"/"+mail_comentado+"/"+opinion+"/"+puntuacion+"/EaC")
                Agregar.agregarComentario(mail_comentador, nombre_comentador, foto, mail_comentado, opinion, puntuacion, "EaC");
                alert("Comentario Agregado.")
                this.setState({ openPuntuacion: false });
            }
        }
    }
    render() {
        var categoria = "";
        if (this.state.categoria !== "") {
            categoria = " - Categoria: " + this.state.categoria;
        }
        var botones = "";
        if (this.state.modo === "empleado") {
            if (this.state.estadoEvento === "pendiente") {
                if (this.state.asignado === "") {
                    botones = <button className='postularse-btn' onClick={this.postularse}>Postularse</button>
                } else {
                    botones = <button disable className='asignado-btn' onClick="">Asignado</button>
                }
            } else {
                if (this.state.asignado === this.state.usuario.email) {
                    if (this.state.estadoEvento === "postulado") {
                        botones = <button className='eliminartrabajo-btn' onClick="">Rechazar</button>
                    } else {
                        if (this.state.estadoEvento === "aceptado") {
                            botones = <button className='eliminartrabajo-btn' onClick="">Rechazar</button>
                        } else {
                            if (this.state.estadoEvento === "enproceso") {
                                botones = ""
                            } else {
                                if (this.state.estadoEvento === "completado") {
                                    botones = <button className='postularse-btn' onClick={this.handleOpenPuntuacionEmpleado}>Valorar Empleador</button>
                                } else {
                                    if (this.state.estadoEvento === "puntuado") {
                                        botones = <button disable className='asignado-btn' onClick="">Puntuado</button>
                                    }
                                }
                            }
                        }
                    }
                } else {
                    botones = ""
                }
            }
        } else {
            if (this.state.estadoEvento === "pendiente") {
                botones = <div><button className='eliminartrabajo-btn' onClick={this.eliminarTrabajo}>Eliminar</button>
                    <button className='editar-btn' onClick={this.editarTrabajo}>Editar</button>
                </div>
            } else {
                if (this.state.estadoEvento === "postulado") {
                    if (this.state.cantPost > 0) {
                        botones = <button className='editar-btn' onClick={this.handleOpenPostulados}>Ver Postulantes</button>
                    }
                } else {
                    if (this.state.estadoEvento === "staffCompleto") {
                        botones = <button className='eliminartrabajo-btn' onClick="">Rechazar</button>
                    } else {
                        if (this.state.estadoEvento === "enproceso") {
                            botones = ""
                        } else {
                            if (this.state.estadoEvento === "completado") {
                                if (this.state.asignado !== "") {
                                    botones = <button className='editar-btn' onClick={this.handleOpenPuntuacion}>Valorar Empleado</button>
                                } else {
                                    botones = "";
                                }
                            } else {
                                if (this.state.estadoEvento === "puntuado") {
                                    if (this.state.asignado !== "") {
                                        botones = <button disable className='asignado-btn' onClick="">Puntuado</button>
                                    } else {
                                        botones = "";
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        var postulados = this.state.postulados;
        var contenedorPostulados = <div>
            {postulados.map(postulado => (<PostuladoTarjeta key={postulado.id} mailPostulado={postulado.data.mail_postulante} trabajo={postulado.data.id_trabajo} evento={postulado.data.id_evento} postulacion={postulado.data.id_postulacion} cantPost={this.state.cantPost} cantPostEvento={this.state.cantPostEvento} cantAsignados={this.state.cantAsignados} />))}
        </div>
        var nombreAsignado = "";
        var photoAsignado = "";
        if (this.state.usuarioAsignado !== null) {
            nombreAsignado = this.state.usuarioAsignado.fullname;
            photoAsignado = <div className="AsignadoFoto">
                <img src={this.state.usuarioAsignado.urlFoto} alt="profile card" />
            </div>
        }
        var nombreAsignadoDueño = "";
        var photoAsignadoDueño = "";
        if (this.state.dueño !== null) {
            nombreAsignadoDueño = this.state.dueño.fullname;
            photoAsignadoDueño = <div className="AsignadoFoto">
                <img src={this.state.dueño.urlFoto} alt="profile card" />
            </div>
        }
        return (
            <div>
                <div fullwidth className="card-trabajo">
                    <img className="avatar-trabajo" src="https://f1.pngfuel.com/png/1008/352/43/circle-silhouette-user-user-profile-user-interface-login-user-account-avatar-data-png-clip-art.png" alt="persona" />
                    <div className="skewed bg-react"></div>
                    <div className="content-trabajo">
                        <div className="trabajo-postularse"><h1>{this.state.rol}{categoria}</h1>
                            {botones}
                        </div>
                        <h3>{this.props.descripcion}</h3>
                        <h3>Comienza: {this.state.datecomienzotrab} - {this.state.timecomienzotrab}   Finaliza: {this.state.datefintrab} - {this.state.timefintrab}</h3>
                        <p className="esp text-react">{this.state.pago}$ por {this.state.periodo}</p>
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
                <Dialog
                    open={this.state.openPuntuacion}
                    onClose={this.handleClosePuntuacion}
                    TransitionComponent={Transition}
                    fullWidth={true}
                    maxWidth={'md'}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="confirmation-dialog-title">{nombreAsignado}</DialogTitle>
                    <DialogContent dividers>

                        {photoAsignado}
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
                        <Button autoFocus onClick={this.handleClosePuntuacion} color="primary">
                            CANCELAR
                         </Button>
                        <Button onClick={this.puntuarEmpleado} color="primary">
                            COMENTAR
                         </Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={this.state.openPuntuacionEmpleado}
                    onClose={this.handleClosePuntuacionEmpleado}
                    TransitionComponent={Transition}
                    fullWidth={true}
                    maxWidth={'md'}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="confirmation-dialog-title">{nombreAsignadoDueño}</DialogTitle>
                    <DialogContent dividers>

                        {photoAsignadoDueño}
                        <DialogContentText>
                            ¿Como calificarias su trabajo?
                        </DialogContentText>
                        <TextField id="opinionEmpleado" autoFocus multiline="true" rows="6" margin="dense" label="Opinión" type="opinion" fullWidth />
                        <form>
                            <p className="clasificacion-stars">
                                <input id="radio1" type="radio" name="estrellasEmpleado" value="10" />
                                <label for="radio1">★</label>
                                <input id="radio2" type="radio" name="estrellasEmpleado" value="9" />
                                <label for="radio2">★</label>
                                <input id="radio3" type="radio" name="estrellasEmpleado" value="8" />
                                <label for="radio3">★</label>
                                <input id="radio4" type="radio" name="estrellasEmpleado" value="7" />
                                <label for="radio4">★</label>
                                <input id="radio5" type="radio" name="estrellasEmpleado" value="6" />
                                <label for="radio5">★</label>
                                <input id="radio6" type="radio" name="estrellasEmpleado" value="5" />
                                <label for="radio6">★</label>
                                <input id="radio7" type="radio" name="estrellasEmpleado" value="4" />
                                <label for="radio7">★</label>
                                <input id="radio8" type="radio" name="estrellasEmpleado" value="3" />
                                <label for="radio8">★</label>
                                <input id="radio9" type="radio" name="estrellasEmpleado" value="2" />
                                <label for="radio9">★</label>
                                <input id="radio10" type="radio" name="estrellasEmpleado" value="1" />
                                <label for="radio10">★</label>
                            </p>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={this.handleClosePuntuacionEmpleado} color="primary">
                            CANCELAR
                         </Button>
                        <Button onClick={this.puntuarEmpleador} color="primary">
                            COMENTAR
                         </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default TrabajoTarjeta;