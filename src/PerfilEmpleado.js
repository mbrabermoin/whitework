import React from 'react';
import './PerfilEmpleado.css';
import facebook from "./logos/facebook.png";
import twitter from "./logos/twitter.png";
import instagram from "./logos/instagram.png";
import linkedin from "./logos/linkedin.png";
import locacion from "./logos/locacion.png";
import telefono from "./logos/whatsapp.png";
import email from "./logos/email.png";
import cuilvalidado from "./logos/validado.png";
import empresavalidada from "./logos/validado.png";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Modificar from './components/DB/Editar';
import { auth } from "./firebase";
import db from './index';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import FileUploader from "react-firebase-file-uploader";
import firebase from "firebase";
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import authApi from "./session/api";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

class PerfilEmpleado extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usuario: props.usuario,
            openModalCUIL: false,
            openModalFacebook: false,
            openModalTwitter: false,
            openModalInstagram: false,
            openModalLinkedIn: false,
            openModalNombre: false,
            openModalTelefono: false,
            openModalUbicacion: false,
            openModalOcupacion: false,
            openModalDescripcionEmpleador: false,
            openModalDescripcionEmpleado: false,
            openCortina: true,
            openEliminar: false,
            comentariosEmpleado: [],
            puntajeEmpleado: 0,
            cantidadTrabajosRealizados: 0,
            comentariosEmpleador: [],
            puntajeEmpleador: 0,
            cantidadTrabajosContratados: 0,
            openComentariosEmpleado: false,
            openComentariosEmpleador: false,
            empleadoActivo: false,
            empresa: false,
            MensajeExito: "",
            openMensajeExito: false,
            modoMensaje: "success",
            //Files
            avatar: "",
            isUploading: false,
            progress: 0,
            avatarURL: "",
            cv: "",
        }
        this.guardarFacebook = this.guardarFacebook.bind(this)
        this.guardarInstagram = this.guardarInstagram.bind(this)
        this.guardarTwitter = this.guardarTwitter.bind(this)
        this.guardarLinkedIn = this.guardarLinkedIn.bind(this)
        this.guardarNombre = this.guardarNombre.bind(this)
        this.guardarTelefono = this.guardarTelefono.bind(this)
        this.guardarUbicacion = this.guardarUbicacion.bind(this)
        this.guardarOcupacion = this.guardarOcupacion.bind(this)
        this.guardarCUIL = this.guardarCUIL.bind(this)
        this.guardarDescripcionEmpleador = this.guardarDescripcionEmpleador.bind(this)
        this.guardarDescripcionEmpleado = this.guardarDescripcionEmpleado.bind(this)
    }
    componentDidMount() {
        var user = auth.currentUser;
        var docRef = db.collection("usuarios").doc(user.email);
        let component = this;
        docRef.get().then(function (doc) {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                component.setState({ usuario: doc.data() });
                component.setState({ empleadoActivo: doc.data().empleadoActivo })
                component.setState({ empresa: doc.data().empresa })
            } else {
                alert("Ha ocurrido un error. Actualice la página.");
            }
        }).catch(function (error) {
            console.log(error);
            alert("Ha ocurrido un error. Actualice la página.");
        });
        var puntajeEmpleado = 0;
        var cantidadPuntajes = 0;
        var comments = [];
        db.collection("comentarios").where("comentado", "==", this.state.usuario.email).where("tipo", "==", "CaE").get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    puntajeEmpleado = puntajeEmpleado + parseInt(doc.data().puntaje);
                    cantidadPuntajes = cantidadPuntajes + 1;
                    const comentario = { comentador: doc.data().comentador, comentario: doc.data().comentario, puntaje: doc.data().puntaje, nombreComentador: doc.data().nombreComentador, foto: doc.data().foto, id_comentario: doc.data().id_comentario, fecha: doc.data().id_comentario.slice(7, 9) + "-" + doc.data().id_comentario.slice(5, 7) + "-" + doc.data().id_comentario.slice(1, 5) }
                    comments.push(comentario);
                });
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
        var puntajeEmpleador = 0;
        var cantidadPuntajesEmpleador = 0;
        var commentsEmpleador = [];
        db.collection("comentarios").where("comentado", "==", this.state.usuario.email).where("tipo", "==", "EaC").get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    puntajeEmpleador = puntajeEmpleador + parseInt(doc.data().puntaje);
                    cantidadPuntajesEmpleador = cantidadPuntajesEmpleador + 1;
                    const comentario = { comentador: doc.data().comentador, comentario: doc.data().comentario, puntaje: doc.data().puntaje, nombreComentador: doc.data().nombreComentador, foto: doc.data().foto, id_comentario: doc.data().id_comentario, fecha: doc.data().id_comentario.slice(7, 9) + "-" + doc.data().id_comentario.slice(5, 7) + "-" + doc.data().id_comentario.slice(1, 5) }
                    commentsEmpleador.push(comentario);
                });
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
        setTimeout(() => {
            if (puntajeEmpleado === 0) {
                puntajeEmpleado = 0;
            } else {
                puntajeEmpleado = puntajeEmpleado / cantidadPuntajes;
                puntajeEmpleado = puntajeEmpleado.toFixed(2);
            }
            if (puntajeEmpleador === 0) {
                puntajeEmpleador = 0;
            } else {
                puntajeEmpleador = puntajeEmpleador / cantidadPuntajesEmpleador;
                puntajeEmpleador = puntajeEmpleador.toFixed(2);
            }
            this.setState({ comentariosEmpleado: comments })
            this.setState({ cantidadTrabajosRealizados: cantidadPuntajes })
            this.setState({ puntajeEmpleado: puntajeEmpleado })
            this.setState({ comentariosEmpleador: commentsEmpleador })
            this.setState({ cantidadTrabajosContratados: cantidadPuntajesEmpleador })
            this.setState({ puntajeEmpleador: puntajeEmpleador })
            this.setState({ openCortina: false });
        }, 2000);
    }
    obtenerFechaActual() {
        var today = new Date();
        var mes = "";
        if ((today.getMonth() + 1).toString().length === 2) {
            mes = (today.getMonth() + 1)
        } else {
            mes = 0 + "" + (today.getMonth() + 1)
        }
        var dia = "";
        if (today.getDate().toString().length === 2) {
            dia = today.getDate()
        } else {
            dia = 0 + "" + today.getDate()
        }
        var minutos = "";
        if (today.getMinutes().toString().length === 2) {
            minutos = today.getMinutes()
        } else {
            minutos = 0 + "" + today.getMinutes()
        }
        var hora = "";
        if (today.getHours().toString().length === 2) {
            hora = today.getHours()
        } else {
            hora = 0 + "" + today.getHours()
        }
        var date = today.getFullYear() + "" + mes + "" + dia;
        var time = hora + "" + minutos;
        var dateTime = date + time;
        return dateTime;
    }
    //Files
    handleUploadSuccessFoto = filename => {
        this.setState({ openCortina: true });
        const email = this.state.usuario.email;
        this.setState({ avatar: filename, progress: 100, isUploading: false });
        firebase.storage().ref("images").child(filename).getDownloadURL().then(url =>
            this.setState({ avatarURL: url }));
        firebase.storage().ref("images").child(filename).getDownloadURL().then(url =>
            Modificar.modificarFotoUsuario(url, email));
        setTimeout(() => {
            this.refrescarUsuario();
            this.setState({ openCortina: false });
        }, 1000);
    };
    handleUploadSuccessCV = filename => {
        this.setState({ openCortina: true });
        const email = this.state.usuario.email;
        this.setState({ cv: filename, progress: 100, isUploading: false });
        firebase.storage().ref("CV").child(filename).getDownloadURL().then(url =>
            this.setState({ cv: url }));
        firebase.storage().ref("CV").child(filename).getDownloadURL().then(url =>
            Modificar.modificarCVUsuario(url, email));
        setTimeout(() => {
            this.refrescarUsuario();
            this.setState({ openCortina: false });
        }, 3000);
    };
    handleUploadSuccessMatricula = filename => {
        this.setState({ openCortina: true });
        const email = this.state.usuario.email;
        this.setState({ matricula: filename, progress: 100, isUploading: false });
        firebase.storage().ref("Matricula").child(filename).getDownloadURL().then(url =>
            this.setState({ matricula: url }));
        firebase.storage().ref("Matricula").child(filename).getDownloadURL().then(url =>
            Modificar.modificarMatriculaUsuario(url, email));
        setTimeout(() => {
            this.refrescarUsuario();
            this.setState({ openCortina: false });
        }, 3000);
    };
    handleUploadSuccessLicenciaConducir = filename => {
        this.setState({ openCortina: true });
        const email = this.state.usuario.email;
        this.setState({ licenciaConducir: filename, progress: 100, isUploading: false });
        firebase.storage().ref("LicenciaConducir").child(filename).getDownloadURL().then(url =>
            this.setState({ matricula: url }));
        firebase.storage().ref("LicenciaConducir").child(filename).getDownloadURL().then(url =>
            Modificar.modificarLicenciaConducirUsuario(url, email));
        setTimeout(() => {
            this.refrescarUsuario();
            this.setState({ openCortina: false });
        }, 3000);
    };
    handleDesactivarUsuario = () => {
        this.setState({ openCortina: true });
        const email = this.state.usuario.email;
        /*DESACTIVAR USUARIO - FUNCIONA*/
      Modificar.desactivarUsuario(email);
        /*INVALIDAR EVENTOS EN VISTA PRESTADORES - FUNCIONA*/
        var dateTime = this.obtenerFechaActual();
        var filtro = db.collection("eventos").where("mail_dueño_evento", "==", email)
        filtro.onSnapshot((snapShots) => {
            snapShots.docs.map(doc => {
                var fromDateConcat = doc.data().dateComienzo.substr(0, 4) + "" + doc.data().dateComienzo.substr(5, 2) + "" + doc.data().dateComienzo.substr(8, 2) + "" + doc.data().timeComienzo.substr(0, 2) + "" + doc.data().timeComienzo.substr(3, 2);
                if (dateTime <= fromDateConcat) {
                return Modificar.desactivarEvento(doc.id);
                }else{
                    return 0;
                }
            })
        }, error => {
            console.log(error)
        });
        setTimeout(() => {
            this.setState({ openCortina: false });
            this.setState({ openEliminar: false });
            authApi.signOut();
        }, 1000);
    }
    handleAbrirEliminar = () => {
        this.setState({ openEliminar: true });
    };
    handleCerrarEliminar = () => {
        this.setState({ openEliminar: false });
    };
    handleCerrarNombre = () => {
        this.setState({ openModalNombre: false });
    };
    handleAbrirNombre = () => {
        this.setState({ openModalNombre: true });
    };
    handleCerrarTelefono = () => {
        this.setState({ openModalTelefono: false });
    };
    handleAbrirTelefono = () => {
        this.setState({ openModalTelefono: true });
    };
    handleCerrarUbicacion = () => {
        this.setState({ openModalUbicacion: false });
    };
    handleAbrirUbicacion = () => {
        this.setState({ openModalUbicacion: true });
    };
    handleCerrarOcupacion = () => {
        this.setState({ openModalOcupacion: false });
    };
    handleAbrirOcupacion = () => {
        this.setState({ openModalOcupacion: true });
    };
    handleCerrarDescripcionEmpleador = () => {
        this.setState({ openModalDescripcionEmpleador: false });
    };
    handleAbrirDescripcionEmpleador = () => {
        this.setState({ openModalDescripcionEmpleador: true });
    };
    handleCerrarDescripcionEmpleado = () => {
        this.setState({ openModalDescripcionEmpleado: false });
    };
    handleAbrirDescripcionEmpleado = () => {
        this.setState({ openModalDescripcionEmpleado: true });
    };
    handleCerrarFacebook = () => {
        this.setState({ openModalFacebook: false });
    };
    handleAbrirFacebook = () => {
        this.setState({ openModalFacebook: true });
    };
    handleCerrarTwitter = () => {
        this.setState({ openModalTwitter: false });
    };
    handleAbrirTwitter = () => {
        this.setState({ openModalTwitter: true });
    };
    handleCerrarInstagram = () => {
        this.setState({ openModalInstagram: false });
    };
    handleAbrirInstagram = () => {
        this.setState({ openModalInstagram: true });
    };
    handleCerrarLinkedIn = () => {
        this.setState({ openModalLinkedIn: false });
    };
    handleAbrirLinkedIn = () => {
        this.setState({ openModalLinkedIn: true });
    };
    handleAbrirCUIL = () => {
        this.setState({ openModalCUIL: true });
    };
    handleCloseCUIL = () => {
        this.setState({ openModalCUIL: false });
    };
    handleCloseComentariosEmpleado = () => {
        this.setState({ openComentariosEmpleado: false });
    };
    handleAbrirComentariosEmpleado = () => {
        this.setState({ openComentariosEmpleado: true });
    };
    handleCloseComentariosEmpleador = () => {
        this.setState({ openComentariosEmpleador: false });
    };
    handleAbrirComentariosEmpleador = () => {
        this.setState({ openComentariosEmpleador: true });
    };
    guardarNombre() {
        this.setState({ openCortina: true });
        const fullname = document.getElementById("fullname").value;
        const email = this.state.usuario.email;
        Modificar.modificarNombreUsuario(fullname, email);
        this.refrescarUsuario();
        this.setState({ openModalNombre: false });
    }
    guardarTelefono() {
        this.setState({ openCortina: true });
        const email = this.state.usuario.email;
        const telefono = document.getElementById("telefono").value;
        Modificar.modificarTelefonoUsuario(telefono, email);
        this.refrescarUsuario();
        this.setState({ openModalTelefono: false });
        setTimeout(() => {
            this.setState({ openCortina: false });
        }, 1000);
    }
    guardarCUIL() {
        this.setState({ openCortina: true });
        const email = this.state.usuario.email;
        const cuil = document.getElementById("cuil").value;
        var error = this.validarCUIT(cuil);
        if (error === "OK") {
            Modificar.modificarCUILUsuario(cuil, email);
            this.refrescarUsuario();
            this.setState({ openModalCUIL: false });
            setTimeout(() => {
                this.setState({ openCortina: false });
            }, 1000);
        } else {
            this.mostrarMensajeExito(error, "error")
            this.setState({ openCortina: false });
        }
    }
    validarCUIT(CUIT) {
        if (CUIT.length === 11) {
            if (isNaN(CUIT)) {
                return "El CUIT debe ser numerico.";
            } else {
                if (CUIT.slice(0, 2) === "20" || CUIT.slice(0, 2) === "23" || CUIT.slice(0, 2) === "24" || CUIT.slice(0, 2) === "27") {
                    var base = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
                    var suma = 0;
                    for (var i = 0; i < 10; i++) {
                        suma = suma + (CUIT.slice(i, i + 1) * base[i]);
                    }
                    var mod = suma % 11;
                    var verificador = 11 - mod;
                    if (mod === 0) {
                        verificador = 0;
                    }
                    if (verificador.toString() === CUIT.slice(10, 11)) {
                        return "OK"
                    } else {
                        return "CUIT Invalido."
                    }
                } else {
                    return "El CUIT debe comenzar con 20, 23, 24 o 27 para pertenecer a una persona fisica."
                }
            }
        } else {
            return "El CUIT debe poseer 11 numeros.";
        }
    }
    mostrarMensajeExito = (mensaje, modo) => {
        this.setState({ modoMensaje: modo });
        this.setState({ MensajeExito: mensaje });
        this.setState({ openMensajeExito: true });
    }
    cerrarMensajeExito = () => {
        this.setState({ openMensajeExito: false });
    }
    guardarOcupacion() {
        this.setState({ openCortina: true });
        const email = this.state.usuario.email;
        const ocupacion = document.getElementById("ocupacion").value;
        Modificar.modificarOcupacionUsuario(ocupacion, email);
        this.refrescarUsuario();
        this.setState({ openModalOcupacion: false });
        setTimeout(() => {
            this.setState({ openCortina: false });
        }, 1000);
    }
    guardarUbicacion() {
        this.setState({ openCortina: true });
        const email = this.state.usuario.email;
        const ubicacion = document.getElementById("ubicacion").value;
        Modificar.modificarUbicacionUsuario(ubicacion, email);
        this.refrescarUsuario();
        this.setState({ openModalUbicacion: false });
        setTimeout(() => {
            this.setState({ openCortina: false });
        }, 1000);
    }
    guardarDescripcionEmpleador() {
        this.setState({ openCortina: true });
        const email = this.state.usuario.email;
        const descripcionEmpleador = document.getElementById("descripcionEmpleador").value;
        Modificar.modificarDescripcionEmpleadorUsuario(descripcionEmpleador, email);
        this.refrescarUsuario();
        this.setState({ openModalDescripcionEmpleador: false });
        setTimeout(() => {
            this.setState({ openCortina: false });
        }, 1000);
    }
    guardarDescripcionEmpleado() {
        this.setState({ openCortina: true });
        const email = this.state.usuario.email;
        const descripcionEmpleado = document.getElementById("descripcionEmpleado").value;
        Modificar.modificarDescripcionEmpleadoUsuario(descripcionEmpleado, email);
        this.refrescarUsuario();
        this.setState({ openModalDescripcionEmpleado: false });
        setTimeout(() => {
            this.setState({ openCortina: false });
        }, 1000);
    }
    guardarFacebook() {
        this.setState({ openCortina: true });
        const email = this.state.usuario.email;
        const facebook = document.getElementById("facebookURL").value;
        Modificar.modificarFacebookUsuario(facebook, email);
        this.refrescarUsuario();
        this.setState({ openModalFacebook: false });
        setTimeout(() => {
            this.setState({ openCortina: false });
        }, 1000);
    }

    guardarInstagram() {
        this.setState({ openCortina: true });
        const email = this.state.usuario.email;
        const instagram = document.getElementById("instagramURL").value;
        Modificar.modificarInstagramUsuario(instagram, email);
        this.refrescarUsuario();
        this.setState({ openModalInstagram: false });
        setTimeout(() => {
            this.setState({ openCortina: false });
        }, 1000);
    }
    guardarTwitter() {
        this.setState({ openCortina: true });
        const email = this.state.usuario.email;
        const twitter = document.getElementById("twitterURL").value;
        Modificar.modificarTwitterUsuario(twitter, email);
        this.refrescarUsuario();
        this.setState({ openModalTwitter: false });
        setTimeout(() => {
            this.setState({ openCortina: false });
        }, 1000);
    }
    guardarLinkedIn() {
        this.setState({ openCortina: true });
        const email = this.state.usuario.email;
        const linkedin = document.getElementById("linkedinURL").value;
        Modificar.modificarLinkedinUsuario(linkedin, email);
        this.refrescarUsuario();
        this.setState({ openModalLinkedIn: false });
        setTimeout(() => {
            this.setState({ openCortina: false });
        }, 1000);
    }
    refrescarUsuario() {
        var docRef = db.collection("usuarios").doc(this.state.usuario.email);
        let component = this;
        docRef.get().then(function (doc) {
            if (doc.exists) {
                component.setState({ usuario: doc.data() });
            } else {
                alert("Ha ocurrido un error. Actualice la página.");
            }
        }).catch(function (error) {
            console.log(error);
            alert("Ha ocurrido un error. Actualice la página.");
        });
    }
    handleChange = (event) => {
        this.setState({ openCortina: true });
        const email = this.state.usuario.email;
        this.setState({ empleadoActivo: event.target.checked });
        Modificar.modificarEmpleadoActivo(event.target.checked, email);
        setTimeout(() => {
            this.setState({ openCortina: false });
        }, 1000);
    };
    handleChangeModoEmpresa = (event) => {
        this.setState({ openCortina: true });
        const email = this.state.usuario.email;
        this.setState({ empresa: event.target.checked });
        Modificar.modificarEmpresaActivo(event.target.checked, email);
        setTimeout(() => {
            this.setState({ openCortina: false });
        }, 1000);
    };
    render() {
        var foto = "";
        if (this.state.usuario.urlFoto !== "") {
            foto = <img src={this.state.usuario.urlFoto} alt="profile card" />
        } else {
            foto = <img src="https://f1.pngfuel.com/png/1008/352/43/circle-silhouette-user-user-profile-user-interface-login-user-account-avatar-data-png-clip-art.png" alt="profile card" />
        }
        var Numerotelefono = "";
        if (this.state.usuario.telefono === "" || this.state.usuario.telefono === null) {
            Numerotelefono = "Ingresar Telefono"
        } else {
            Numerotelefono = this.state.usuario.telefono
        }
        var Ubicacion = "";
        if (this.state.usuario.ubicacion === "" || this.state.usuario.ubicacion === null) {
            Ubicacion = "Ingresar Ubicación"
        } else {
            Ubicacion = this.state.usuario.ubicacion
        }
        var ocupacion = "";
        if (this.state.usuario.ocupacion === "" || this.state.usuario.ocupacion === null) {
            ocupacion = "Ingresar Ocupación"
        } else {
            ocupacion = this.state.usuario.ocupacion
        }
        var cuil = "";
        var cuilValidado = "";
        if (this.state.usuario.cuil === "" || this.state.usuario.cuil === null) {
            cuil = <div onClick={this.handleAbrirCUIL} className="profile-card__txt"><strong>Ingresar CUIT </strong> </div>
            cuilValidado = "";
        } else {
            if (this.state.usuario.cuilValidado === "N") {
                cuil = <div onClick={this.handleAbrirCUIL} className="profile-card__txt"><strong>CUIT {this.state.usuario.cuil} </strong> </div>
                cuilValidado = ""
            } else {
                cuil = <div onClick="" className="profile-card__txt"><strong>CUIT: {this.state.usuario.cuil} </strong> </div>
                cuilValidado = <span className="profile-card-cuilVal__icon">
                    <img width="20" height="20" alt="fb" src={cuilvalidado} />
                </span>
            }
        }
        var descripcionEmpleador = "";
        if (this.state.usuario.descripcionEmpleador === "" || this.state.usuario.descripcionEmpleador === null) {
            descripcionEmpleador = "Ingresar Breve Descripción como Empleador"
        } else {
            descripcionEmpleador = "Descripción como Empleador: " + this.state.usuario.descripcionEmpleador
        }
        var descripcionEmpleado = "";
        if (this.state.usuario.descripcionEmpleado === "" || this.state.usuario.descripcionEmpleado === null) {
            descripcionEmpleado = "Ingresar Breve Descripción como Prestador"
        } else {
            descripcionEmpleado = "Descripción como Prestador: " + this.state.usuario.descripcionEmpleado
        }
        var comentariosEmpleado = this.state.comentariosEmpleado;
        var ComentariosEmpleadoDisplay = <div className="content">
            {comentariosEmpleado.map(comentarioEmpleado => (
                <article className="tweet">
                    <div className="tweet-side">
                        <object className="avatar-comments" data={comentarioEmpleado.foto} type="image/png">
                            <img className="avatar-comments" src="https://f1.pngfuel.com/png/1008/352/43/circle-silhouette-user-user-profile-user-interface-login-user-account-avatar-data-png-clip-art.png" alt="1" />
                        </object>
                    </div>

                    <div className="tweet-body">
                        <span className="userName">{comentarioEmpleado.nombreComentador} - {comentarioEmpleado.fecha}</span>
                        <p className="message">{comentarioEmpleado.comentario}</p><br></br>
                        <p className="message">Puntaje: {comentarioEmpleado.puntaje}</p>
                    </div>
                </article>
            ))}
        </div>
        var comentariosEmpleador = this.state.comentariosEmpleador;
        var ComentariosEmpleadorDisplay = <div className="content">
            {comentariosEmpleador.map(comentarioEmpleador => (
                <article className="tweet">
                    <div className="tweet-side">
                        <object className="avatar-comments" data={comentarioEmpleador.foto} type="image/png">
                            <img className="avatar-comments" src="https://f1.pngfuel.com/png/1008/352/43/circle-silhouette-user-user-profile-user-interface-login-user-account-avatar-data-png-clip-art.png" alt="1" />
                        </object>
                    </div>
                    <div className="tweet-body">
                        <span className="userName">{comentarioEmpleador.nombreComentador} - {comentarioEmpleador.fecha}</span>
                        <p className="message">{comentarioEmpleador.comentario}</p><br></br>
                        <p className="message">Puntaje: {comentarioEmpleador.puntaje}</p>
                    </div>
                </article>
            ))}
        </div>
        var panelCV = "";
        if (this.state.usuario.CV === "" || this.state.usuario.CV === undefined) {
            panelCV =
                <div>
                    <label style={{ backgroundColor: 'steelblue', color: 'white', padding: 10, borderRadius: 4, cursor: 'pointer' }}>
                        Cargar CV
                    <FileUploader
                            accept="pdf/*"
                            name="avatar"
                            randomizeFilename
                            hidden
                            storageRef={firebase.storage().ref("CV")}
                            onUploadSuccess={this.handleUploadSuccessCV}
                        />
                    </label>
                </div>
        } else {
            panelCV =
                <div>
                    <div className="botones-files">
                        <label style={{ backgroundColor: 'steelblue', color: 'white', padding: 10, borderRadius: 4, cursor: 'pointer' }}>
                            Actualizar CV
                        <FileUploader
                                accept="pdf/*"
                                name="avatar"
                                randomizeFilename
                                hidden
                                storageRef={firebase.storage().ref("CV")}
                                onUploadSuccess={this.handleUploadSuccessCV}
                            />
                        </label>
                    </div>
                    <div className="botones-files">
                        <label style={{ backgroundColor: 'steelblue', color: 'white', padding: 10, borderRadius: 4, cursor: 'pointer' }}>
                            <a href={this.state.usuario.CV}> Ver CV</a>
                        </label>
                    </div>
                </div>
        }
        var panelMatricula = "";
        if (this.state.usuario.Matricula === "" || this.state.usuario.Matricula === undefined) {
            panelMatricula =
                <div>
                    <label style={{ backgroundColor: 'steelblue', color: 'white', padding: 10, borderRadius: 4, cursor: 'pointer' }}>
                        Cargar Matricula Profesional
                    <FileUploader
                            accept="pdf/*"
                            name="avatar"
                            randomizeFilename
                            hidden
                            storageRef={firebase.storage().ref("Matricula")}
                            onUploadSuccess={this.handleUploadSuccessMatricula}
                        />
                    </label>
                </div>
        } else {
            panelMatricula =
                <div>
                    <div className="botones-files">
                        <label style={{ backgroundColor: 'steelblue', color: 'white', padding: 10, borderRadius: 4, cursor: 'pointer' }}>
                            Actualizar Matricula Profesional
                        <FileUploader
                                accept="pdf/*"
                                name="avatar"
                                randomizeFilename
                                hidden
                                storageRef={firebase.storage().ref("Matricula")}
                                onUploadSuccess={this.handleUploadSuccessMatricula}
                            />
                        </label>
                    </div>
                    <div className="botones-files">
                        <label style={{ backgroundColor: 'steelblue', color: 'white', padding: 10, borderRadius: 4, cursor: 'pointer' }}>
                            <a href={this.state.usuario.Matricula}> Ver Matricula Profesional</a>
                        </label>
                    </div>
                </div>
        }
        var panelLicenciaConducir = "";
        if (this.state.usuario.LicenciaConducir === "" || this.state.usuario.LicenciaConducir === undefined) {
            panelLicenciaConducir =
                <div>
                    <label style={{ backgroundColor: 'steelblue', color: 'white', padding: 10, borderRadius: 4, cursor: 'pointer' }}>
                        Cargar Licencia Conducir
                    <FileUploader
                            accept="pdf/*"
                            name="avatar"
                            randomizeFilename
                            hidden
                            storageRef={firebase.storage().ref("LicenciaConducir")}
                            onUploadSuccess={this.handleUploadSuccessLicenciaConducir}
                        />
                    </label>
                </div>
        } else {
            panelLicenciaConducir =
                <div>
                    <div className="botones-files">
                        <label style={{ backgroundColor: 'steelblue', color: 'white', padding: 10, borderRadius: 4, cursor: 'pointer' }}>
                            Actualizar Licencia Conducir
                        <FileUploader
                                accept="pdf/*"
                                name="avatar"
                                randomizeFilename
                                hidden
                                storageRef={firebase.storage().ref("LicenciaConducir")}
                                onUploadSuccess={this.handleUploadSuccessLicenciaConducir}
                            />
                        </label>
                    </div>
                    <div className="botones-files">
                        <label style={{ backgroundColor: 'steelblue', color: 'white', padding: 10, borderRadius: 4, cursor: 'pointer' }}>
                            <a href={this.state.usuario.LicenciaConducir}> Ver Licencia Conducir</a>
                        </label>
                    </div>
                </div>
        }
        var perfilUsuario = "";
        var empresaValidada = "";
        var empresaValidadaLogo = "";
        if (this.state.empresa === false) {
            empresaValidada = "";
            empresaValidadaLogo = "";
            perfilUsuario = <div>
                <FormControlLabel control={<Switch color="primary" checked={this.state.empleadoActivo} onChange={this.handleChange} name="empleadoActivo" />} label="Prestador Activo" />
                <div className="profile-card-loc">
                    {cuil}
                    {cuilValidado}
                </div>
                <div onClick={this.handleAbrirOcupacion} className="profile-card__txt"><strong>{ocupacion} </strong> </div>
                <div className="profile-card-loc">
                    <span className="profile-card-loc__icon">
                        <img onClick={this.handleAbrirUbicacion} width="60" height="60" alt="fb" src={locacion} />
                    </span>
                    <span onClick={this.handleAbrirUbicacion} className="profile-card-loc__txt">
                        {Ubicacion}
                    </span>
                </div>
                <div className="profile-card-email">
                    <span className="profile-card-email__icon">
                        <img width="60" height="60" alt="fb" src={email} />
                    </span>
                    <span className="profile-card-email__txt">
                        {this.state.usuario.email}
                    </span>
                </div>
                <div className="profile-card-tel">
                    <span className="profile-card-tel__icon">
                        <img onClick={this.handleAbrirTelefono} width="60" height="60" alt="fb" src={telefono} />
                    </span>
                    <span onClick={this.handleAbrirTelefono} className="profile-card-tel__txt">
                        {Numerotelefono}
                    </span>
                </div>
                <div className="profile-card-inf">
                    <div className="profile-card-inf__item">
                        <div className="profile-card-inf__title">{this.state.cantidadTrabajosRealizados}</div>
                        <div className="profile-card-inf__txt">Trabajos realizados</div>
                    </div>
                    <div className="profile-card-inf__item">
                        <div onClick={this.handleAbrirComentariosEmpleado} className="profile-card-inf__title puntuacion">{this.state.puntajeEmpleado}/10</div>
                        <div className="profile-card-inf__txt">Puntuación Prestador</div>
                    </div>
                    <div className="profile-card-inf__item">
                        <div className="profile-card-inf__title">{this.state.cantidadTrabajosContratados}</div>
                        <div className="profile-card-inf__txt">Puntajes de Prestadores</div>
                    </div>
                    <div className="profile-card-inf__item">
                        <div onClick={this.handleAbrirComentariosEmpleador} className="profile-card-inf__title puntuacion">{this.state.puntajeEmpleador}/10</div>
                        <div className="profile-card-inf__txt">Puntuación Empleador</div>
                    </div>
                </div>
                {panelCV}
                {panelMatricula}
                {panelLicenciaConducir}
                <div className="profile-card-social" >
                    <div onClick={this.handleAbrirFacebook} className="profile-card-social__item facebook">
                        <span className="icon-font">
                            <img width="80" height="80" alt="fb" src={facebook} />
                        </span>
                    </div>
                    <div onClick={this.handleAbrirTwitter} className="profile-card-social__item twitter">
                        <span className="icon-font">
                            <img width="80" height="80" alt="fb" src={twitter} />
                        </span>
                    </div>
                    <div onClick={this.handleAbrirInstagram} className="profile-card-social__item instagram">
                        <span className="icon-font">
                            <img width="80" height="80" alt="fb" src={instagram} />
                        </span>
                    </div>
                    <div onClick={this.handleAbrirLinkedIn} className="profile-card-social__item linkedin">
                        <span className="icon-font">
                            <img width="80" height="80" alt="fb" src={linkedin} />
                        </span>
                    </div>
                </div>

                <div className="profile-card-desc">
                    <span onClick={this.handleAbrirDescripcionEmpleado} className="profile-card-desc__txt">
                        {descripcionEmpleado}
                    </span>
                </div>
                <div className="profile-card-desc">
                    <span onClick={this.handleAbrirDescripcionEmpleador} className="profile-card-desc__txt">
                        {descripcionEmpleador}
                    </span>
                </div>
            </div>
        } else {
            perfilUsuario = <div>
                <div className="profile-card-loc">
                    <span className="profile-card-loc__icon">
                        <img onClick={this.handleAbrirUbicacion} width="60" height="60" alt="fb" src={locacion} />
                    </span>
                    <span onClick={this.handleAbrirUbicacion} className="profile-card-loc__txt">
                        {Ubicacion}
                    </span>
                </div>
                <div className="profile-card-tel">
                    <span className="profile-card-tel__icon">
                        <img onClick={this.handleAbrirTelefono} width="60" height="60" alt="fb" src={telefono} />
                    </span>
                    <span onClick={this.handleAbrirTelefono} className="profile-card-tel__txt">
                        {Numerotelefono}
                    </span>
                </div>
                <div className="profile-card-inf">
                    <div className="profile-card-inf__item">
                        <div className="profile-card-inf__title">{this.state.cantidadTrabajosContratados}</div>
                        <div className="profile-card-inf__txt">Puntajes de Prestadores</div>
                    </div>
                    <div className="profile-card-inf__item">
                        <div onClick={this.handleAbrirComentariosEmpleador} className="profile-card-inf__title puntuacion">{this.state.puntajeEmpleador}/10</div>
                        <div className="profile-card-inf__txt">Puntuación Empleador</div>
                    </div>
                </div>
                <div className="profile-card-social" >
                    <div onClick={this.handleAbrirFacebook} className="profile-card-social__item facebook">
                        <span className="icon-font">
                            <img width="80" height="80" alt="fb" src={facebook} />
                        </span>
                    </div>
                    <div onClick={this.handleAbrirTwitter} className="profile-card-social__item twitter">
                        <span className="icon-font">
                            <img width="80" height="80" alt="fb" src={twitter} />
                        </span>
                    </div>
                    <div onClick={this.handleAbrirInstagram} className="profile-card-social__item instagram">
                        <span className="icon-font">
                            <img width="80" height="80" alt="fb" src={instagram} />
                        </span>
                    </div>
                    <div onClick={this.handleAbrirLinkedIn} className="profile-card-social__item linkedin">
                        <span className="icon-font">
                            <img width="80" height="80" alt="fb" src={linkedin} />
                        </span>
                    </div>
                    <div className="profile-card-desc">
                        <span onClick={this.handleAbrirDescripcionEmpleador} className="profile-card-desc__txt">
                            {descripcionEmpleador}
                        </span>
                    </div>
                </div>
            </div>;
            if (this.state.usuario.empresaValidada) {
                empresaValidada = "(empresa validada)";
                empresaValidadaLogo = <span className="profile-card-cuilVal__icon">
                    <img width="20" height="20" alt="empresa validada" src={empresavalidada} />
                </span>
            } else {
                empresaValidada = "";
                empresaValidadaLogo = "";
            }
        }
        return (
            <div>
                <Snackbar open={this.state.openMensajeExito} autoHideDuration={2000} onClose={this.cerrarMensajeExito}>
                    <Alert variant="filled" onClose={this.cerrarMensajeExito} severity={this.state.modoMensaje}>
                        {this.state.MensajeExito}
                    </Alert>
                </Snackbar>
                <div className="wrapper1">
                    <div className="profile-card js-profile-card">
                        <div className="profile-card__img">
                            {foto}
                        </div>
                        <div className="profile-card__cnt js-profile-cnt">
                            <div style={{ height: 40 }}>
                                <label style={{ backgroundColor: 'steelblue', color: 'white', padding: 10, borderRadius: 4, cursor: 'pointer' }}>
                                    Cambiar foto de perfil
                                    <FileUploader
                                        accept="image/*"
                                        name="avatar"
                                        randomizeFilename
                                        hidden
                                        storageRef={firebase.storage().ref("images")}
                                        onUploadSuccess={this.handleUploadSuccessFoto}
                                    />
                                </label>
                            </div>
                            <div onClick={this.handleAbrirNombre} className="profile-card__name" style={{ marginTop: '20px' }}>{this.state.usuario.fullname}</div>
                            <div>{empresaValidada}{empresaValidadaLogo}</div>
                            <FormControlLabel control={<Switch color="primary" checked={this.state.empresa} onChange={this.handleChangeModoEmpresa} name="empresaActivo" />} label="Modo Empresa" />
                            {perfilUsuario}
                            <div onClick={this.handleAbrirEliminar} style={{ height: 40, marginTop: '20px' }}>
                                <label style={{ backgroundColor: 'red', color: 'white', padding: 10, borderRadius: 4, cursor: 'pointer' }}>
                                    Eliminar Cuenta
                                </label>
                            </div>
                        </div>
                    </div>
                    <Dialog
                        open={this.state.openModalCUIL}
                        onClose={this.handleCloseCUIL}
                        TransitionComponent={Transition}
                        fullWidth={true}
                        maxWidth={'md'}
                        aria-labelledby="form-dialog-title">
                        <DialogTitle id="confirmation-dialog-title">Ingrese su CUIT*</DialogTitle>
                        <DialogContent dividers>
                            <TextField id="cuil" autoFocus margin="dense" label="CUIT (Sin espacios ni guiones)" defaultValue={this.state.usuario.cuil} type="cuil" fullWidth />
                            <div className="col-sm-12" style={{ paddingLeft: 0, marginTop: 10, fontSize: 12, fontStyle: 'italic' }}>*Será validado por un administrador del sitio.</div>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleCloseCUIL} color="primary">
                                Cancel
                         </Button>
                            <Button onClick={this.guardarCUIL} color="primary">
                                Ok
                         </Button>
                        </DialogActions>
                    </Dialog>
                    {/*Facebook*/}
                    <Dialog
                        open={this.state.openModalFacebook}
                        onClose={this.handleCerrarFacebook}
                        TransitionComponent={Transition}
                        fullWidth={true}
                        maxWidth={'md'}
                        aria-labelledby="form-dialog-title"
                    >
                        <DialogTitle id="confirmation-dialog-title">Facebook:</DialogTitle>
                        <DialogContent dividers>
                            <TextField id="facebookURL" autoFocus margin="dense" label="URL Facebook" defaultValue={this.state.usuario.facebook} type="facebook" fullWidth />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleCerrarFacebook} color="primary">
                                Cancel
                         </Button>
                            <Button onClick={this.guardarFacebook} color="primary">
                                Ok
                         </Button>
                        </DialogActions>
                    </Dialog>
                    {/*Twitter*/}
                    <Dialog
                        open={this.state.openModalTwitter}
                        onClose={this.handleCerrarTwitter}
                        TransitionComponent={Transition}
                        fullWidth={true}
                        maxWidth={'md'}
                        aria-labelledby="form-dialog-title"
                    >
                        <DialogTitle id="confirmation-dialog-title">Twitter:</DialogTitle>
                        <DialogContent dividers>
                            <TextField id="twitterURL" autoFocus margin="dense" label="URL Twitter" defaultValue={this.state.usuario.twitter} type="twitter" fullWidth />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleCerrarTwitter} color="primary">
                                Cancel
                         </Button>
                            <Button onClick={this.guardarTwitter} color="primary">
                                Ok
                         </Button>
                        </DialogActions>
                    </Dialog>
                    {/*Instagram*/}
                    <Dialog
                        open={this.state.openModalInstagram}
                        onClose={this.handleCerrarInstagram}
                        TransitionComponent={Transition}
                        fullWidth={true}
                        maxWidth={'md'}
                        aria-labelledby="form-dialog-title"
                    >
                        <DialogTitle id="confirmation-dialog-title">Instagram:</DialogTitle>
                        <DialogContent dividers>
                            <TextField id="instagramURL" autoFocus margin="dense" label="URL Instagram" defaultValue={this.state.usuario.instagram} type="instagram" fullWidth />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleCerrarInstagram} color="primary">
                                Cancel
                         </Button>
                            <Button onClick={this.guardarInstagram} color="primary">
                                Ok
                         </Button>
                        </DialogActions>
                    </Dialog>
                    {/*LinkedIn*/}
                    <Dialog
                        open={this.state.openModalLinkedIn}
                        onClose={this.handleCerrarLinkedIn}
                        TransitionComponent={Transition}
                        fullWidth={true}
                        maxWidth={'md'}
                        aria-labelledby="form-dialog-title"
                    >
                        <DialogTitle id="confirmation-dialog-title">LinkedIn:</DialogTitle>
                        <DialogContent dividers>
                            <TextField id="linkedinURL" autoFocus margin="dense" label="URL LinkedIn" defaultValue={this.state.usuario.linkedin} type="LinkedIn" fullWidth />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleCerrarLinkedIn} color="primary">
                                Cancel
                         </Button>
                            <Button onClick={this.guardarLinkedIn} color="primary">
                                Ok
                         </Button>
                        </DialogActions>
                    </Dialog>
                    {/*Nombre*/}
                    <Dialog
                        open={this.state.openModalNombre}
                        onClose={this.handleCerrarNombre}
                        TransitionComponent={Transition}
                        fullWidth={true}
                        maxWidth={'md'}
                        aria-labelledby="form-dialog-title"
                    >
                        <DialogTitle id="confirmation-dialog-title">Nombre:</DialogTitle>
                        <DialogContent dividers>
                            <TextField id="fullname" autoFocus margin="dense" label="Nombre" defaultValue={this.state.usuario.fullname} type="fullname" fullWidth />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleCerrarNombre} color="primary">
                                Cancel
                         </Button>
                            <Button onClick={this.guardarNombre} color="primary">
                                Ok
                         </Button>
                        </DialogActions>
                    </Dialog>
                    {/*Telefono*/}
                    <Dialog
                        open={this.state.openModalTelefono}
                        onClose={this.handleCerrarTelefono}
                        TransitionComponent={Transition}
                        fullWidth={true}
                        maxWidth={'md'}
                        aria-labelledby="form-dialog-title"
                    >
                        <DialogTitle id="confirmation-dialog-title">Ingrese su número telefónico</DialogTitle>
                        <DialogContent dividers>
                            <TextField id="telefono" autoFocus margin="dense" label="Telefono" defaultValue={this.state.usuario.telefono} type="telefono" fullWidth />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleCerrarTelefono} color="primary">
                                Cancel
                         </Button>
                            <Button onClick={this.guardarTelefono} color="primary">
                                Ok
                         </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog
                        open={this.state.openModalOcupacion}
                        onClose={this.handleCerrarOcupacion}
                        TransitionComponent={Transition}
                        fullWidth={true}
                        maxWidth={'md'}
                        aria-labelledby="form-dialog-title"
                    >
                        <DialogTitle id="confirmation-dialog-title">Ingrese su Ocupación</DialogTitle>
                        <DialogContent dividers>
                            <TextField id="ocupacion" autoFocus margin="dense" label="Ocupación" defaultValue={this.state.usuario.ocupacion} type="ocupacion" fullWidth />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleCerrarOcupacion} color="primary">
                                Cancel
                         </Button>
                            <Button onClick={this.guardarOcupacion} color="primary">
                                Ok
                         </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog
                        open={this.state.openModalUbicacion}
                        onClose={this.handleCerrarUbicacion}
                        TransitionComponent={Transition}
                        fullWidth={true}
                        maxWidth={'md'}
                        aria-labelledby="form-dialog-title"
                    >
                        <DialogTitle id="confirmation-dialog-title">Ingrese su Ubicación</DialogTitle>
                        <DialogContent dividers>
                            <TextField id="ubicacion" autoFocus margin="dense" label="Ubicación" defaultValue={this.state.usuario.ubicacion} type="ubicacion" fullWidth />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleCerrarUbicacion} color="primary">
                                Cancel
                         </Button>
                            <Button onClick={this.guardarUbicacion} color="primary">
                                Ok
                         </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog
                        open={this.state.openCortina}
                        TransitionComponent={Transition}
                        aria-labelledby="form-dialog-title"
                    >
                    </Dialog>
                    <Dialog
                        open={this.state.openModalDescripcionEmpleador}
                        onClose={this.handleCerrarDescripcionEmpleador}
                        TransitionComponent={Transition}
                        fullWidth={true}
                        maxWidth={'md'}
                        aria-labelledby="form-dialog-title"
                    >
                        <DialogTitle id="confirmation-dialog-title">Definase en pocas palabras como Empleador:</DialogTitle>
                        <DialogContent dividers>
                            <TextField id="descripcionEmpleador" autoFocus margin="dense" label="Descripción como empleador" defaultValue={this.state.usuario.descripcionEmpleador} type="descripcionEmpleador" fullWidth />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleCerrarDescripcionEmpleador} color="primary">
                                Cancel
                         </Button>
                            <Button onClick={this.guardarDescripcionEmpleador} color="primary">
                                Ok
                         </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog
                        open={this.state.openModalDescripcionEmpleado}
                        onClose={this.handleCerrarDescripcionEmpleado}
                        TransitionComponent={Transition}
                        fullWidth={true}
                        maxWidth={'md'}
                        aria-labelledby="form-dialog-title"
                    >
                        <DialogTitle id="confirmation-dialog-title">Definase en pocas palabras como Prestador:</DialogTitle>
                        <DialogContent dividers>
                            <TextField id="descripcionEmpleado" autoFocus margin="dense" label="Descripción como Prestador" defaultValue={this.state.usuario.descripcionEmpleado} type="descripcionEmpleado" fullWidth />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleCerrarDescripcionEmpleado} color="primary">
                                Cancel
                         </Button>
                            <Button onClick={this.guardarDescripcionEmpleado} color="primary">
                                Ok
                         </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog
                        open={this.state.openCortina}
                        TransitionComponent={Transition}
                        aria-labelledby="form-dialog-title"
                    >
                    </Dialog>
                    <Dialog
                        open={this.state.openComentariosEmpleado}
                        onClose={this.handleCloseComentariosEmpleado}
                        TransitionComponent={Transition}
                        fullWidth={true}
                        maxWidth={'md'}
                        aria-labelledby="form-dialog-title"
                    >
                        <DialogTitle id="confirmation-dialog-title">Comentarios de Empleadores:</DialogTitle>
                        <DialogContent dividers>
                            <div className="comentarios-container">
                                <div className="comments-list">
                                    {ComentariosEmpleadoDisplay}
                                </div>
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleCloseComentariosEmpleado} color="primary">
                                CERRAR
                 </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog
                        open={this.state.openComentariosEmpleador}
                        onClose={this.handleCloseComentariosEmpleador}
                        TransitionComponent={Transition}
                        fullWidth={true}
                        maxWidth={'md'}
                        aria-labelledby="form-dialog-title"
                    >
                        <DialogTitle id="confirmation-dialog-title">Comentarios de Prestadores:</DialogTitle>
                        <DialogContent dividers>
                            <div className="comentarios-container">
                                <div className="comments-list">
                                    {ComentariosEmpleadorDisplay}
                                </div>
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleCloseComentariosEmpleador} color="primary">
                                CERRAR
                 </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog
                        open={this.state.openEliminar}
                        onClose={this.handleCerrarEliminar}
                        TransitionComponent={Transition}
                        maxWidth={'md'}
                        aria-labelledby="form-dialog-title"
                    >
                        <DialogTitle id="confirmation-dialog-title">Eliminar Usuario</DialogTitle>
                        <DialogContent dividers>
                            ¿Desea eliminar el usuario definitivamente? Esta acción eliminará todos sus eventos, postulaciones y asignaciones.
                    </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleCerrarEliminar} color="primary">
                                No
                         </Button>
                            <Button onClick={this.handleDesactivarUsuario} color="primary">
                                Si
                         </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>);
    }
}

export default PerfilEmpleado;