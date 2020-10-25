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
import EmpleadoDetalle from "./EmpleadoDetalle";
import BotonEditarTrabajo from "./EditarTrabajo";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Checkbox from '@material-ui/core/Checkbox';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});
const GreenCheckbox = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);
class TrabajoTarjeta extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openCortina: false,
            openPostulados: false,
            openPuntuacion: false,
            openPuntuacionEmpleado: false,
            postulados: [],
            asignado: this.props.asignado,
            asignadoObjeto: null,
            modo: this.props.modo,
            rol: this.props.rol,
            evento: this.props.evento,
            estadoEvento: this.props.estadoEvento,
            trabajo: this.props.trabajo,
            descripcion: this.props.descripcion,
            cantTrabajos: this.props.cantTrabajos,
            metodopago: this.props.metodopago,
            pago: this.props.pago,
            periodo: this.props.periodo,
            categoria: this.props.categoria,
            dateComienzo: this.props.datecomienzo,
            timeComienzo: this.props.timecomienzo,
            dateFinaliza: this.props.datefin,
            timeFinaliza: this.props.timefin,
            usuario: this.props.usuario,
            cantPost: this.props.cantPost,
            cantPostEvento: this.props.cantPostEvento,
            cantPuntEvento: this.props.cantPuntEvento,
            cantAsignados: this.props.cantAsignados,
            usuarioAsignado: null,
            mailDueño: this.props.dueño,
            dueño: null,
            puntuadoEmpleado: this.props.puntuadoEmpleado,
            puntuadoEmpleador: this.props.puntuadoEmpleador,
            openDetalleAsignado: false,
            postulado: this.props.postulado,
            indexAgregando: this.props.trabajoid,
            trabajoAgregando: this.props.trabajoAgregando,
            checkedMetodoPago: true,
            checkedPago: true,
            checkedMetodoPagoEmpleado: true,
            checkedPagoEmpleado: true,
            openSeguroPuntuarEmpleado: false,
            openSeguroPuntuarEmpleador: false,
        }
        this.actualizarEventosPost = this.actualizarEventosPost.bind(this);
        this.mostrarMensajeExitoPost = this.mostrarMensajeExitoPost.bind(this);
        this.mostrarMensajeExitoEdit = this.mostrarMensajeExitoEdit.bind(this);
        this.actualizarTrabajos = this.actualizarTrabajos.bind(this);
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
        if (this.state.usuario.suspendido) {
            this.props.mostrarMensajeExito("No puedes Eliminar trabajo, su cuenta se encuentra suspendida.", "error");
        } else {
            this.setState({ openCortina: true })
            var trabajo = this.state.trabajo;
            var evento = this.state.evento;
            var cantTrabajos = this.state.cantTrabajos;
            Eliminar.eliminarTrabajo(trabajo);
            Editar.restarTrabajo(evento, cantTrabajos);
            setTimeout(() => {
                this.props.mostrarMensajeExito("Trabajo Eliminado Correctamente.", "success");
                this.props.actualizarEventos();
            }, 1100);
        }

    }
    duplicar = () => {
        if (this.state.usuario.suspendido) {
            this.props.mostrarMensajeExito("No puedes Duplicar trabajo, su cuenta se encuentra suspendida.", "error");
        } else {
            this.setState({ openCortina: true })
            var evento = this.state.evento;
            var mail = this.state.mailDueño;
            var rol = this.state.rol;
            var descripcion = this.state.descripcion;
            var dateComienzo = this.state.dateComienzo;
            var timeComienzo = this.state.timeComienzo;
            var dateFinaliza = this.state.dateFinaliza;
            var timeFinaliza = this.state.timeFinaliza;
            var metodopago = this.state.metodopago;
            var pago = this.state.pago;
            var periodo = this.state.periodo;
            var categoria = this.state.categoria;
            var cantTrabajos = this.state.cantTrabajos;
            Agregar.agregarTrabajo(evento, mail, rol, descripcion, dateComienzo, timeComienzo, dateFinaliza, timeFinaliza, metodopago, pago, periodo, categoria);
            Editar.sumarTrabajo(evento, cantTrabajos);
            setTimeout(() => {
                this.props.mostrarMensajeExito("Trabajo Duplicado Correctamente.", "success");
                this.props.actualizarEventos();
            }, 1100);
        }
    }
    postularse = () => {
        if (this.state.usuario.empresa) {
            this.props.mostrarMensajeExito("Su cuenta pertenece a una empresa, no puedes postularte.", "error");
        } else {
            if (this.state.usuario.suspendido) {
                this.props.mostrarMensajeExito("No puedes postularte, su cuenta se encuentra suspendida.", "error");
            } else {
                if (this.state.usuario.cuil === "") {
                    this.props.mostrarMensajeExito("Necesitas un CUIL antes de postularte.", "error");
                } else {
                    if (this.state.usuario.cuilValidado === "N") {
                        this.props.mostrarMensajeExito("Se necesita tener el CUIL Validado para poder postularse a un trabajo. Aguarde a que un administrador lo valide.", "error");
                    } else {
                        this.setState({ openCortina: true })
                        var mail = this.state.usuario.email;
                        var trabajo = this.state.trabajo;
                        var evento = this.state.evento;
                        var cantPost = this.state.cantPost + 1;
                        var cantPostEvento = this.state.cantPostEvento + 1;
                        Agregar.agregarPostulacion(mail, trabajo, evento);
                        Editar.agregarPostulacionEvento(evento, cantPostEvento, "postulado");
                        Editar.agregarPostulacionTrabajo(trabajo, "postulado", cantPost);
                        setTimeout(() => {
                            this.props.mostrarMensajeExito("Postulado Correctamente.", "success");
                            this.props.actualizarEventos();
                        }, 1000);
                    }
                }
            }
        }
    }
    deshacerPostulacion = () => {
        this.setState({ openCortina: true })
        var mail = this.state.usuario.email;
        var evento = this.state.evento;
        var trabajo = this.state.trabajo;
        var postulacion = "";
        var cantPostTrabajo = 0;
        var cantPostEvento = this.state.cantPostEvento - 1;
        db.collection("postulaciones").where("id_evento", "==", evento).where("mail_postulante", "==", mail).get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    postulacion = doc.data().id_postulacion;
                });
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
        db.collection("trabajos").where("id_trabajo", "==", trabajo).get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    cantPostTrabajo = doc.data().cantPostulados - 1;
                });
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
        setTimeout(() => {
            Eliminar.eliminarPostulacion(postulacion)
            if (cantPostTrabajo === 0) {
                Editar.rechazarTrabajo(trabajo, "pendiente", cantPostTrabajo)
                if (cantPostEvento === 0) {
                    Editar.rechazarTrabajadorAEvento(evento, "pendiente", cantPostEvento);
                } else {
                    Editar.rechazarTrabajadorAEvento(evento, "postulado", cantPostEvento);
                }
            } else {
                Editar.rechazarTrabajo(trabajo, "postulado", cantPostTrabajo)
                Editar.rechazarTrabajadorAEvento(evento, "postulado", cantPostEvento);
            }
            this.props.mostrarMensajeExito("Postulación Cancelada.", "success");
            this.props.actualizarEventos();
        }, 1000);

    }
    rechazarAsignacion = () => {
        this.setState({ openCortina: true });
        var trabajo = this.state.trabajo;
        var evento = this.state.evento;
        var nuevaCantAsignado = this.state.cantAsignados - 1;
        Editar.desasignarEmpleado(trabajo);
        Editar.desasignarEmpleadoAEvento(evento, nuevaCantAsignado);
        setTimeout(() => {
            this.props.mostrarMensajeExito("Trabajo Desasignado Correctamente.", "success");
            this.props.actualizarEventos();
        }, 1000);
    }
    rechazarAlAsignado = () => {
        this.setState({ openCortina: true });
        var trabajo = this.state.trabajo;
        var evento = this.state.evento;
        var nuevaCantAsignado = this.state.cantAsignados - 1;
        Editar.desasignarEmpleado(trabajo);
        Editar.desasignarEmpleadoAEvento(evento, nuevaCantAsignado);
        setTimeout(() => {
            this.props.mostrarMensajeExito("Empleado Rechazado Correctamente.", "success");
            this.props.actualizarEventos();
        }, 1000);
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
    handleCloseDetalleAsignado = () => {
        this.setState({ openDetalleAsignado: false });
    }
    handleOpenDetalleAsignado = () => {
        var docRef = db.collection("usuarios").doc(this.state.asignado);
        let component = this;
        docRef.get().then(function (doc) {
            if (doc.exists) {
                component.setState({ asignadoObjeto: doc.data() });
            } else {
                alert("Ha ocurrido un error. Actualice la página.");
            }
        }).catch(function (error) {
            console.log(error);
            alert("Ha ocurrido un error. Actualice la página.");
        });
        this.setState({ openCortina: true })
        setTimeout(() => {
            this.setState({ openCortina: false })
            this.setState({ openDetalleAsignado: true });
        }, 1000);
    }
    handleChangeMP = () => {
        if (this.state.checkedMetodoPago === true) {
            this.setState({ checkedMetodoPago: false });
        } else {
            this.setState({ checkedMetodoPago: true });
        }
    };
    handleChangePago = () => {
        if (this.state.checkedPago === true) {
            this.setState({ checkedPago: false });
        } else {
            this.setState({ checkedPago: true });
        }
    };
    handleChangeMPEmpleado = () => {
        if (this.state.checkedMetodoPagoEmpleado === true) {
            this.setState({ checkedMetodoPagoEmpleado: false });
        } else {
            this.setState({ checkedMetodoPagoEmpleado: true });
        }
    };
    validarChequeadosEmpleador = () => {
        if (this.state.checkedMetodoPagoEmpleado && this.state.checkedPagoEmpleado) {
            var opinion = document.getElementById("opinionEmpleado").value;
            var puntuacion = -1;
            for (var i = 0; i < document.getElementsByName('estrellasEmpleado').length; i++) {
                if (document.getElementsByName('estrellasEmpleado')[i].checked === true) {
                    puntuacion = document.getElementsByName('estrellasEmpleado')[i].value;
                    break;
                }
            }
            if (opinion === "") {
                this.props.mostrarMensajeExito("Debe ingresar un comentario.", "error");
            } else {
                if (puntuacion === -1) {
                    this.props.mostrarMensajeExito("Debe puntuar para dejar su comentario.", "error");
                } else {
                    this.puntuarEmpleador();
                }
            }
        } else {
            this.handleOpenSeguroPuntuarEmpleador();
        }
    }
    validarChequeadosEmpleado = () => {
        var opinion = document.getElementById("nombre").value;
        var puntuacion = -1;
        for (var i = 0; i < document.getElementsByName('estrellas').length; i++) {
            if (document.getElementsByName('estrellas')[i].checked === true) {
                puntuacion = document.getElementsByName('estrellas')[i].value;
                break;
            }
        }
        if (opinion === "") {
            this.props.mostrarMensajeExito("Debe ingresar un comentario.", "error");
        } else {
            if (puntuacion === -1) {
                this.props.mostrarMensajeExito("Debe puntuar para dejar su comentario.", "error");
            } else {
                if (this.state.checkedMetodoPago && this.state.checkedPago) {
                    this.puntuarEmpleado();
                } else {
                    this.handleOpenSeguroPuntuarEmpleado();
                }
            }
        }
    }
    handleOpenSeguroPuntuarEmpleado = () => {
        this.setState({ openSeguroPuntuarEmpleado: true })
    }
    handleCloseSeguroPuntuarEmpleado = () => {
        this.setState({ openSeguroPuntuarEmpleado: false })
    }
    handleOpenSeguroPuntuarEmpleador = () => {
        this.setState({ openSeguroPuntuarEmpleador: true })
    }
    handleCloseSeguroPuntuarEmpleador = () => {
        this.setState({ openSeguroPuntuarEmpleador: false })
    }
    handleChangePagoEmpleado = () => {
        if (this.state.checkedPagoEmpleado === true) {
            this.setState({ checkedPagoEmpleado: false });
        } else {
            this.setState({ checkedPagoEmpleado: true });
        }
    };
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
        this.setState({ checkedMetodoPago: true });
        this.setState({ checkedPago: true });
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
        this.setState({ checkedMetodoPagoEmpleado: true });
        this.setState({ checkedPagoEmpleado: true });
        this.setState({ openPuntuacionEmpleado: true });
    }
    suspenderYpuntuarEmpleado = () => {
        var mail_susp = this.state.asignado;
        Editar.suspenderUsuario(mail_susp);
        this.puntuarEmpleado();
    }
    suspenderYpuntuarEmpleador = () => {
        var mail_susp = this.state.mailDueño;
        Editar.suspenderUsuario(mail_susp);
        this.puntuarEmpleador();
    }
    puntuarEmpleado = () => {
        this.setState({ openSeguroPuntuarEmpleado: false });
        this.setState({ openCortina: true });
        var opinion = document.getElementById("nombre").value;
        var puntuacion = -1;
        for (var i = 0; i < document.getElementsByName('estrellas').length; i++) {
            if (document.getElementsByName('estrellas')[i].checked === true) {
                puntuacion = document.getElementsByName('estrellas')[i].value;
                break;
            }
        }
        var mail_comentado = this.state.asignado;
        var mail_comentador = this.state.usuario.email;
        var nombre_comentador = this.state.usuario.fullname;
        var foto = this.state.usuario.urlFoto;
        var trabajo = this.state.trabajo;
        Agregar.agregarComentario(mail_comentador, nombre_comentador, foto, mail_comentado, opinion, puntuacion, "CaE");
        Editar.trabajoPuntuadoPorEmpleador(trabajo);
        if (this.state.puntuadoEmpleado === "Y") {
            var puntuados = this.state.cantPuntEvento;
            var evento = this.state.evento;
            Editar.agregarPuntuadoEvento(evento, puntuados)
        }
        setTimeout(() => {
            this.props.mostrarMensajeExito("Comentario Agregado Correctamente.", "success");
            this.props.actualizarEventos();
            this.setState({ openPuntuacion: false });
        }, 1000);
    }
    puntuarEmpleador = () => {
        this.setState({ openSeguroPuntuarEmpleador: false });
        this.setState({ openCortina: true });
        var opinion = document.getElementById("opinionEmpleado").value;
        var puntuacion = -1;
        for (var i = 0; i < document.getElementsByName('estrellasEmpleado').length; i++) {
            if (document.getElementsByName('estrellasEmpleado')[i].checked === true) {
                puntuacion = document.getElementsByName('estrellasEmpleado')[i].value;
                break;
            }
        }
        var mail_comentado = this.state.mailDueño;
        var mail_comentador = this.state.usuario.email;
        var nombre_comentador = this.state.usuario.fullname;
        var foto = this.state.usuario.urlFoto;
        var trabajo = this.state.trabajo;
        Agregar.agregarComentario(mail_comentador, nombre_comentador, foto, mail_comentado, opinion, puntuacion, "EaC");
        Editar.trabajoPuntuadoPorEmpleado(trabajo);
        if (this.state.puntuadoEmpleador === "Y") {
            var puntuados = this.state.cantPuntEvento;
            var evento = this.state.evento;
            Editar.agregarPuntuadoEvento(evento, puntuados)
        }
        setTimeout(() => {
            this.props.mostrarMensajeExito("Comentario Agregado Correctamente.", "success");
            this.props.actualizarEventos();
            this.setState({ openPuntuacionEmpleado: false });
        }, 1000);
    }
    eliminarEnAgregando = () => {
        this.props.eliminarTrabajoAgregando(this.state.indexAgregando)
    }
    duplicarEnAgregando = () => {
        this.props.duplicarTrabajoAgregando(this.state.indexAgregando, this.state.trabajoAgregando)
    }
    editarEnAgregando = (rol, descripciontrab, metodopago, pago, periodo, categoria) => {
        this.props.editarTrabajoAgregando(this.state.indexAgregando, rol, descripciontrab, metodopago, pago, periodo, categoria)
    }
    actualizarEventosPost() {
        this.props.actualizarEventos();
    }
    mostrarMensajeExitoPost(mensaje, modo) {
        this.props.mostrarMensajeExito(mensaje, modo);
    }
    mostrarMensajeExitoEdit(mensaje, modo) {
        this.props.mostrarMensajeExito(mensaje, modo);
    }
    actualizarTrabajos() {
        this.props.actualizarTrabajos();
    }
    render() {
        var categoria = "";
        if (this.state.categoria !== "") {
            categoria = " - Categoría: " + this.state.categoria;
        }
        var botones = "";
        if (this.state.modo === "empleado") {
            if (this.state.estadoEvento === "pendiente") {
                if (this.state.asignado === "") {
                    botones = <button className='postularse-btn' onClick={this.postularse}>Postularse</button>
                } else {
                    botones = <button disable className='asignado-btn'>Asignado</button>
                }
            } else {
                if (this.state.estadoEvento === "postulado") {
                    if (this.state.asignado !== "") {
                        botones = <button disable className='asignado-btn'>Asignado</button>
                    } else {
                        if (this.state.postulado === "Y") {
                            botones = <button className='eliminartrabajo-btn' onClick={this.deshacerPostulacion}>Deshacer Postulación</button>
                        } else {
                            botones = ""
                        }
                    }
                } else {
                    if (this.state.asignado === this.state.usuario.email) {
                        if (this.state.estadoEvento === "aceptado") {
                            botones = <button className='eliminartrabajo-btn' onClick={this.rechazarAsignacion}>Rechazar Asignación</button>
                        } else {
                            if (this.state.estadoEvento === "enproceso") {
                                botones = <button disable className='asignado-btn'>Mi Asignación</button>
                            } else {
                                if (this.state.estadoEvento === "completado") {
                                    if (this.state.puntuadoEmpleado === "Y") {
                                        botones = <button disable className='asignado-btn'>Ya Puntuado</button>
                                    } else {
                                        botones = <button className='postularse-btn' onClick={this.handleOpenPuntuacionEmpleado}>Valorar Empleador</button>

                                    }
                                } else {
                                    if (this.state.estadoEvento === "puntuado") {
                                        botones = <button disable className='asignado-btn'>Puntuado</button>
                                    }
                                }
                            }
                        }
                    } else {
                        if (this.state.asignado !== "") {
                            botones = <button disable className='asignado-btn'>Asignado</button>
                        } else {
                            botones = ""
                        }
                    }
                }
            }
        } else {
            if (this.state.estadoEvento === "pendiente") {
                if (this.state.asignado !== "") {
                    botones = <div><button className='eliminartrabajo-btn' onClick={this.rechazarAlAsignado}>Rechazar Asignado</button>
                        <button className='editar-btn' onClick={this.handleOpenDetalleAsignado}>Ver Asignado</button>
                    </div>
                } else {
                    botones = <div><button className='eliminartrabajo-btn' onClick={this.eliminarTrabajo}>Eliminar</button>
                        {/*<button className='editar-btn' onClick="">Editar</button>*/}
                        <BotonEditarTrabajo usuario={this.state.usuario} mostrarMensajeExitoEdit={this.mostrarMensajeExitoEdit} actualizarTrabajosEdit={this.actualizarTrabajos} estado={this.state.estadoEvento} trabajo={this.state.trabajo} />
                        <button className='editar-btn' onClick={this.duplicar}>Duplicar</button>
                    </div>
                }
            } else {
                if (this.state.estadoEvento === "postulado") {
                    if (this.state.cantPost > 0) {
                        botones = <button className='editar-btn' onClick={this.handleOpenPostulados}>Ver Postulantes</button>
                    }
                } else {
                    if (this.state.estadoEvento === "staffCompleto") {
                        botones = <div><button className='eliminartrabajo-btn' onClick={this.rechazarAlAsignado}>Rechazar Asignado</button>
                            <button className='editar-btn' onClick={this.handleOpenDetalleAsignado}>Ver Asignado</button>
                        </div>
                    } else {
                        if (this.state.estadoEvento === "enproceso") {
                            if (this.state.asignado !== "") {
                                botones = <div>
                                    <button className='editar-btn' onClick={this.handleOpenDetalleAsignado}>Ver Asignado</button>
                                </div>
                            } else {
                                botones = "";
                            }
                        } else {
                            if (this.state.estadoEvento === "completado") {
                                if (this.state.asignado !== "") {
                                    if (this.state.puntuadoEmpleador === "Y") {
                                        botones = <div><button className='editar-btn' onClick={this.handleOpenDetalleAsignado}>Ver Asignado</button>
                                            <button disable className='asignado-btn'>Ya Puntuado</button>
                                        </div>
                                    } else {
                                        botones = <button className='editar-btn' onClick={this.handleOpenPuntuacion}>Valorar Empleado</button>
                                    }
                                } else {
                                    botones = "";
                                }
                            } else {
                                if (this.state.estadoEvento === "puntuado") {
                                    if (this.state.asignado !== "") {
                                        botones = <div><button className='editar-btn' onClick={this.handleOpenDetalleAsignado}>Ver Asignado</button>
                                            <button disable className='asignado-btn'>Puntuado</button>
                                        </div>
                                    } else {
                                        botones = "";
                                    }
                                } else {
                                    if (this.state.estadoEvento === "agregando") {
                                        botones = <div><button className='eliminartrabajo-btn' onClick={this.eliminarEnAgregando}>Eliminar</button>
                                            <BotonEditarTrabajo mostrarMensajeExitoEdit={this.mostrarMensajeExitoEdit} estado={this.state.estadoEvento} trabajoObjeto={this.state.trabajoAgregando} editarEnAgregando={this.editarEnAgregando} />
                                            <button className='editar-btn' onClick={this.duplicarEnAgregando}>Duplicar</button>
                                        </div>
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
            {postulados.map(postulado => (<PostuladoTarjeta key={postulado.id} actualizarEventosPost={this.actualizarEventosPost} mostrarMensajeExitoPost={this.mostrarMensajeExitoPost} mailPostulado={postulado.data.mail_postulante} trabajo={postulado.data.id_trabajo} evento={postulado.data.id_evento} postulacion={postulado.data.id_postulacion} cantPost={this.state.cantPost} cantPostEvento={this.state.cantPostEvento} cantAsignados={this.state.cantAsignados} />))}
        </div>
        var nombreAsignado = "";
        var photoAsignado = "";
        if (this.state.usuarioAsignado !== null) {
            nombreAsignado = this.state.usuarioAsignado.fullname;
            if (this.state.usuarioAsignado.urlFoto !== "" && this.state.usuarioAsignado.urlFoto !== null) {
                photoAsignado = <div className="AsignadoFoto">
                    <img src={this.state.usuarioAsignado.urlFoto} alt="profile card" />
                </div>
            } else {
                photoAsignado = <div className="AsignadoFoto">
                    <img src="https://f1.pngfuel.com/png/1008/352/43/circle-silhouette-user-user-profile-user-interface-login-user-account-avatar-data-png-clip-art.png" alt="profile card" />
                </div>
            }
        }
        var nombreAsignadoDueño = "";
        var photoAsignadoDueño = "";
        if (this.state.dueño !== null) {
            nombreAsignadoDueño = this.state.dueño.fullname;
            if (this.state.dueño.urlFoto !== "" && this.state.dueño.urlFoto !== null) {
                photoAsignadoDueño = <div className="AsignadoFoto">
                    <img src={this.state.dueño.urlFoto} alt="profile card" />
                </div>
            } else {
                photoAsignadoDueño = <div className="AsignadoFoto">
                    <img src="https://f1.pngfuel.com/png/1008/352/43/circle-silhouette-user-user-profile-user-interface-login-user-account-avatar-data-png-clip-art.png" alt="profile card" />
                </div>
            }
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
                        {/*<h3>Comienza: {this.state.datecomienzotrab} - {this.state.timecomienzotrab}   Finaliza: {this.state.datefintrab} - {this.state.timefintrab}</h3>*/}
                        <p className="esp text-react">{this.state.pago}$ por {this.state.periodo} - Metodo de Pago: {this.state.metodopago}</p>
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
                        <TextField id="nombre" autoFocus multiline="true" rows="6" margin="dense" label="Comentario" type="opinion" fullWidth />
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
                        <FormControlLabel
                            control={<GreenCheckbox checked={this.state.checkedMetodoPago} onChange={this.handleChangeMP} name="checkedMP" />}
                            label="¿Cumplió con el metodo de pago acordado?"
                        />
                        <FormControlLabel
                            control={<GreenCheckbox checked={this.state.checkedPago} onChange={this.handleChangePago} name="checkedPago" />}
                            label="¿Cumplió con el pago acordado?"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={this.handleClosePuntuacion} color="primary">
                            CANCELAR
                         </Button>
                        <Button onClick={this.validarChequeadosEmpleado} color="primary">
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
                            ¿Como calificarias su Trato?
                        </DialogContentText>
                        <TextField id="opinionEmpleado" autoFocus multiline="true" rows="6" margin="dense" label="Comentario" type="opinion" fullWidth />
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
                        <FormControlLabel
                            control={<GreenCheckbox checked={this.state.checkedMetodoPagoEmpleado} onChange={this.handleChangeMPEmpleado} name="checkedMPEmpleado" />}
                            label="¿Cumplió con el metodo de pago acordado?"
                        />
                        <FormControlLabel
                            control={<GreenCheckbox checked={this.state.checkedPagoEmpleado} onChange={this.handleChangePagoEmpleado} name="checkedPagoEmpleado" />}
                            label="¿Cumplió con el pago acordado?"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={this.handleClosePuntuacionEmpleado} color="primary">
                            CANCELAR
                         </Button>
                        <Button onClick={this.validarChequeadosEmpleador} color="primary">
                            COMENTAR
                         </Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={this.state.openDetalleAsignado}
                    onClose={this.handleCloseDetalleAsignado}
                    TransitionComponent={Transition}
                    fullWidth={true}
                    maxWidth={'md'}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="confirmation-dialog-title">Asignado para {this.state.rol}</DialogTitle>
                    <DialogContent dividers>
                        <EmpleadoDetalle usuario={this.state.asignadoObjeto} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseDetalleAsignado} color="primary">
                            CERRAR
                 </Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={this.state.openSeguroPuntuarEmpleado}
                    onClose={this.handleCloseSeguroPuntuarEmpleado}
                    TransitionComponent={Transition}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="confirmation-dialog-title">¿Algo no se cumplió? </DialogTitle>
                    <DialogContent dividers>
                        Estas declarando que el prestador no cumplió con el metodo de pago o el pago. Esto suspenderá la cuenta del prestador temporalmente. ¿Estas seguro que deseas denunciar?
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseSeguroPuntuarEmpleado} color="primary">
                            NO
                 </Button>
                        <Button onClick={this.suspenderYpuntuarEmpleado} color="primary">
                            SI
                 </Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={this.state.openSeguroPuntuarEmpleador}
                    onClose={this.handleCloseSeguroPuntuarEmpleador}
                    TransitionComponent={Transition}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="confirmation-dialog-title">¿Algo no se cumplió? </DialogTitle>
                    <DialogContent dividers>
                        Estas declarando que el empleador no cumplió con el metodo de pago o el pago. Esto suspenderá la cuenta del empleador temporalmente. ¿Estas seguro que deseas denunciar?
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseSeguroPuntuarEmpleador} color="primary">
                            NO
                 </Button>
                        <Button onClick={this.suspenderYpuntuarEmpleador} color="primary">
                            SI
                 </Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={this.state.openCortina}
                    TransitionComponent={Transition}
                    aria-labelledby="form-dialog-title"
                >
                </Dialog>
            </div>
        );
    }
}

export default TrabajoTarjeta;