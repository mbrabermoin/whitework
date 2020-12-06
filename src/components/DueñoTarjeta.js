import React from 'react';
import './DueñoTarjeta.css';
import facebook from "../logos/facebook.png";
import twitter from "../logos/twitter.png";
import instagram from "../logos/instagram.png";
import linkedin from "../logos/linkedin.png";
import db from '../index';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import empresavalidada from "../logos/validado.png";
import Button from '@material-ui/core/Button';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});
class DueñoTarjeta extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mailDueño: this.props.mailDueño,
            usuario: null,
            comentariosEmpleador: [],
            cantidadTrabajosContratados: "",
            puntajeEmpleador: "",
            openComentariosEmpleador: false,
        }
    }
    componentDidMount() {
        var docRef = db.collection("usuarios").doc(this.state.mailDueño);
        let component = this;
        docRef.get().then(function (doc) {
            if (doc.exists) {
                console.log("Dueño:", doc.data());
                component.setState({ usuario: doc.data() });
            } else {
                alert("Ha ocurrido un error. Actualice la página.");
            }
        }).catch(function (error) {
            console.log(error);
            alert("Ha ocurrido un error. Actualice la página.");
        });
        var puntajeEmpleador = 0;
        var cantidadPuntajesEmpleador = 0;
        var commentsEmpleador = [];
        db.collection("comentarios").where("comentado", "==", this.state.mailDueño).where("tipo", "==", "EaC").get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    puntajeEmpleador = puntajeEmpleador + parseInt(doc.data().puntaje);
                    cantidadPuntajesEmpleador = cantidadPuntajesEmpleador + 1;
                    const comentario = { comentador: doc.data().comentador, comentario: doc.data().comentario, puntaje: doc.data().puntaje, nombreComentador: doc.data().nombreComentador, foto: doc.data().foto,id_comentario: doc.data().id_comentario, fecha: doc.data().id_comentario.slice(7,9)+"-"+doc.data().id_comentario.slice(5,7)+"-"+doc.data().id_comentario.slice(1,5)  }
                    commentsEmpleador.push(comentario);
                });
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
        setTimeout(() => {
            if (puntajeEmpleador === 0) {
                puntajeEmpleador = 0;
            } else {
                puntajeEmpleador = puntajeEmpleador / cantidadPuntajesEmpleador;
                puntajeEmpleador = puntajeEmpleador.toFixed(2);
            }
            this.setState({ comentariosEmpleador: commentsEmpleador })
            this.setState({ cantidadTrabajosContratados: cantidadPuntajesEmpleador })
            this.setState({ puntajeEmpleador: puntajeEmpleador })
        }, 1000);
    }
    handleCloseComentariosEmpleador = () => {
        this.setState({ openComentariosEmpleador: false });
    };
    handleAbrirComentariosEmpleador = () => {
        this.setState({ openComentariosEmpleador: true });
    };
    render() {
        var nombre = "";
        var email = "";
        var descripcion = "";
        var photoUrl = "";
        var telefono = "";
        var ubicacion = "";
        var linkedinpanel = "";
        var facebookpanel = "";
        var instagrampanel = "";
        var twitterpanel = "";
        if (this.state.usuario !== null) {
            nombre = this.state.usuario.fullname;
            email = this.state.usuario.email;
            photoUrl = this.state.usuario.urlFoto;
            if (this.state.usuario.urlFoto === "" || this.state.urlFoto === null) {
                photoUrl = "https://f1.pngfuel.com/png/1008/352/43/circle-silhouette-user-user-profile-user-interface-login-user-account-avatar-data-png-clip-art.png";
                ;
            } else {
                photoUrl = this.state.usuario.urlFoto;
            }
            telefono = this.state.usuario.telefono;
            ubicacion = this.state.usuario.ubicacion;
            if (this.state.usuario.descripcionEmpleador !== null && this.state.usuario.descripcionEmpleador !== "") {
                descripcion = this.state.usuario.descripcionEmpleador;
            }
            if (this.state.usuario.facebook !== "") {
                facebookpanel = <div className="profile-card-social__dueño">
                    <a target="_blank" rel="noopener noreferrer" href={this.state.usuario.facebook}>
                        <span className="icon-font">
                            <img width="50" height="50" alt="fb" src={facebook} />
                        </span>
                    </a>
                </div>
            }
            if (this.state.usuario.instagram !== "") {
                instagrampanel = <div className="profile-card-social__dueño">
                    <a target="_blank" rel="noopener noreferrer" href={this.state.usuario.instagram}>
                        <span className="icon-font">
                            <img width="50" height="50" alt="fb" src={instagram} />
                        </span>
                    </a>
                </div>
            }
            if (this.state.usuario.twitter !== "") {
                twitterpanel = <div className="profile-card-social__dueño">
                    <a target="_blank" rel="noopener noreferrer" href={this.state.usuario.twitter}>
                        <span className="icon-font">
                            <img width="50" height="50" alt="fb" src={twitter} />
                        </span>
                    </a>
                </div>
            }
            if (this.state.usuario.linkedin !== "") {
                linkedinpanel = <div className="profile-card-social__dueño">
                    <a target="_blank" rel="noopener noreferrer" href={this.state.usuario.linkedin}>
                        <span className="icon-font">
                            <img width="50" height="50" alt="fb" src={linkedin} />
                        </span>
                    </a>
                </div>
            }
            var empresaValidada = "";
            var empresaValidadaLogo = "";
            if (this.state.usuario.empresa === true && this.state.usuario.empresaValidada) {
                empresaValidada = "(empresa validada)";
                empresaValidadaLogo = <span className="profile-card-cuilVal__icon">
                    <img width="20" height="20" alt="empresa validada" src={empresavalidada} />
                </span>
            }
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
        }
        return (
            <div fullwidth class="card-dueño">
                <img class="avatar-trabajo" src={photoUrl} alt="persona" />
                <div class="skewed bg-react"></div>
                <div class="content-dueño">
                    <div className="redes-sociales">
                        {facebookpanel}
                        {instagrampanel}
                        {twitterpanel}
                        {linkedinpanel}
                    </div>
                    <h1>{nombre}</h1>
                    <h3>{email}</h3><br></br>
                    <div>{empresaValidada}{empresaValidadaLogo}</div><br></br>
                    <div onClick={this.handleAbrirComentariosEmpleador} >Puntaje recibido: {this.state.puntajeEmpleador}  <br></br>
                    Trabajos Contratados: {this.state.cantidadTrabajosContratados}
                    </div>
                    <br></br><br></br>
                    <div class="desc-dueño">
                        {descripcion}
                    </div><br></br>
                    <p class="esp text-react">Ubicación: {ubicacion}</p>
                    <p class="esp text-react">Telefono: {telefono}</p>
                </div>
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
            </div>
        );
    }
}

export default DueñoTarjeta;