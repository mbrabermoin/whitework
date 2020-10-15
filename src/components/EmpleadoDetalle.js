import React from 'react';
//import './PerfilEmpleado.css';
import facebook from "../logos/facebook.png";
import twitter from "../logos/twitter.png";
import instagram from "../logos/instagram.png";
import linkedin from "../logos/linkedin.png";
import locacion from "../logos/locacion.png";
import telefono from "../logos/whatsapp.png";
import email from "../logos/email.png";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import db from '../index';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

class EmpleadoDetalle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usuario: props.usuario,
            openCortina: true,
            comentariosEmpleado: [],
            puntajeEmpleado: 0,
            cantidadTrabajosRealizados: 0,
            openComentariosEmpleado: false,
            empleadoActivo: false,
        }
    }
    componentDidMount() {
        var puntajeEmpleado = 0;
        var cantidadPuntajes = 0;
        var comments = [];
        db.collection("comentarios").where("comentado", "==", this.state.usuario.email).where("tipo", "==", "CaE").get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    puntajeEmpleado = puntajeEmpleado + parseInt(doc.data().puntaje);
                    cantidadPuntajes = cantidadPuntajes + 1;
                    const comentario = { comentador: doc.data().comentador, comentario: doc.data().comentario, puntaje: doc.data().puntaje, nombreComentador: doc.data().nombreComentador, foto: doc.data().foto }
                    comments.push(comentario);
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
            this.setState({ comentariosEmpleado: comments })
            this.setState({ cantidadTrabajosRealizados: cantidadPuntajes })
            this.setState({ puntajeEmpleado: puntajeEmpleado })
            this.setState({ openCortina: false });
        }, 2000);
    }

    handleCloseComentariosEmpleado = () => {
        this.setState({ openComentariosEmpleado: false });
    };
    handleAbrirComentariosEmpleado = () => {
        this.setState({ openComentariosEmpleado: true });
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
            Numerotelefono = ""
        } else {
            Numerotelefono = <div className="profile-card-tel">
                <span className="profile-card-tel__icon-ne">
                    <img width="60" height="60" alt="fb" src={telefono} />
                </span>
                <span className="profile-card-tel__txt-ne">
                    {this.state.usuario.telefono}
                </span>
            </div>
        }
        var Ubicacion = "";
        if (this.state.usuario.ubicacion === "" || this.state.usuario.ubicacion === null) {
            Ubicacion = ""
        } else {
            Ubicacion = <div className="profile-card-loc">
                <span className="profile-card-loc__icon-ne">
                    <img width="60" height="60" alt="fb" src={locacion} />
                </span>
                <span className="profile-card-loc__txt-ne">
                    {this.state.usuario.ubicacion}
                </span>
            </div>
        }
        var ocupacion = "";
        if (this.state.usuario.ocupacion === "" || this.state.usuario.ocupacion === null) {
            ocupacion = ""
        } else {
            ocupacion = this.state.usuario.ocupacion
        }
        var descripcionEmpleado = "";
        if (this.state.usuario.descripcionEmpleado === "" || this.state.usuario.descripcionEmpleado === null) {
            descripcionEmpleado = ""
        } else {
            descripcionEmpleado = this.state.usuario.descripcionEmpleado
        }
        var facebookLogo = "";
        if (this.state.usuario.facebook === "" || this.state.usuario.facebook === null) {
            facebookLogo = "";
        } else {
            facebookLogo = <div className="profile-card-social__item facebook">
                <a target="_blank" rel="noopener noreferrer" href={this.state.usuario.facebook}>
                <span className="icon-font">
                    <img width="80" height="80" alt="fb" src={facebook} />
                </span>
                </a>
            </div>
        }
        var twitterLogo = "";
        if (this.state.usuario.twitter === "" || this.state.usuario.twitter === null) {
            twitterLogo = "";
        } else {
            twitterLogo = <div className="profile-card-social__item twitter">
                <a target="_blank" rel="noopener noreferrer" href={this.state.usuario.twitter}>
                <span className="icon-font">
                    <img width="80" height="80" alt="fb" src={twitter} />
                </span>
                </a>
            </div>
        }
        var instagramLogo = "";
        if (this.state.usuario.instagram === "" || this.state.usuario.instagram === null) {
            instagramLogo = "";
        } else {
            instagramLogo = <div className="profile-card-social__item instagram">
                <a target="_blank" rel="noopener noreferrer" href={this.state.usuario.instagram}>
                <span className="icon-font">
                    <img width="80" height="80" alt="fb" src={instagram} />
                </span>
                </a>
            </div>
        }
        var linkedinLogo = "";
        if (this.state.usuario.linkedin === "" || this.state.usuario.linkedin === null) {
            linkedinLogo = "";
        } else {
            linkedinLogo = <div className="profile-card-social__item linkedin">
                <a target="_blank" rel="noopener noreferrer" href={this.state.usuario.linkedin}>
                <span className="icon-font">
                    <img width="80" height="80" alt="fb" src={linkedin} />
                </span>
                </a>
            </div>
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
                        <span className="userName">{comentarioEmpleado.nombreComentador}</span>
                        <p className="message">{comentarioEmpleado.comentario}</p><br></br>
                        <p className="message">Puntaje: {comentarioEmpleado.puntaje}</p>
                    </div>
                </article>
            ))}
        </div>
        var panelCV = "";
        if (this.state.usuario.CV === "" || this.state.usuario.CV === undefined) {
            panelCV = ""
        } else {
            panelCV = <div>
                <div className="botones-files" style={{ margin: 20, height: 20 }}>
                    <label style={{ backgroundColor: 'steelblue', color: 'white', padding: 10, borderRadius: 4, cursor: 'pointer' }}>
                        <a href={this.state.usuario.CV}> Ver CV</a>
                    </label>
                </div>
            </div>
        }
        var panelMatricula = "";
        if (this.state.usuario.Matricula === "" || this.state.usuario.Matricula === undefined) {
            panelMatricula = ""
        } else {
            panelMatricula = <div>
                <div className="botones-files" style={{ margin: 20, height: 20 }}>
                    <label style={{ backgroundColor: 'steelblue', color: 'white', padding: 10, borderRadius: 4, cursor: 'pointer' }}>
                        <a href={this.state.usuario.Matricula}> Ver Matricula Profesional</a>
                    </label>
                </div>
            </div>
        }
        var panelLicenciaConducir = "";
        if (this.state.usuario.LicenciaConducir === "" || this.state.usuario.LicenciaConducir === undefined) {
            panelLicenciaConducir = "";
        } else {
            panelLicenciaConducir = <div>
                <div className="botones-files" style={{ margin: 20, height: 20 }}>
                    <label style={{ backgroundColor: 'steelblue', color: 'white', padding: 10, borderRadius: 4, cursor: 'pointer' }}>
                        <a href={this.state.usuario.LicenciaConducir}> Ver Licencia Conducir</a>
                    </label>
                </div>
            </div>
        }
        return (
            <div className="wrapper1">
                <div className="profile-card js-profile-card">
                    <div className="profile-card__img">
                        {foto}
                    </div>
                    <div className="profile-card__cnt js-profile-cnt">
                        <div className="profile-card__name-ne">{this.state.usuario.fullname}</div>
                        <div className="profile-card__txt-ne"><strong>{ocupacion} </strong> </div>
                        {Ubicacion}
                        <div className="profile-card-email">
                            <span className="profile-card-email__icon">
                                <img width="60" height="60" alt="fb" src={email} />
                            </span>
                            <span className="profile-card-email__txt">
                                {this.state.usuario.email}
                            </span>
                        </div>
                        {Numerotelefono}
                        <div className="profile-card-inf">
                            <div className="profile-card-inf__item">
                                <div className="profile-card-inf__title">{this.state.cantidadTrabajosRealizados}</div>
                                <div className="profile-card-inf__txt">Changas realizadas</div>
                            </div>
                            <div className="profile-card-inf__item">
                                <div onClick={this.handleAbrirComentariosEmpleado} className="profile-card-inf__title puntuacion">{this.state.puntajeEmpleado}/10</div>
                                <div className="profile-card-inf__txt">Puntuación Empleado</div>
                            </div>
                        </div>
                        {panelCV}
                        {panelMatricula}
                        {panelLicenciaConducir}
                        <div className="profile-card-social" >
                            {facebookLogo}
                            {twitterLogo}
                            {instagramLogo}
                            {linkedinLogo}                            
                        </div>
                        <div className="profile-card-desc">
                            <span className="profile-card-desc__txt-ne">
                                {descripcionEmpleado}
                            </span>
                        </div>

                    </div>
                </div>
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
            </div>);
    }
}

export default EmpleadoDetalle;