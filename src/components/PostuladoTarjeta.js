import React from 'react';
import './PostuladoTarjeta.css';
import facebook from "../logos/facebook.png";
import twitter from "../logos/twitter.png";
import instagram from "../logos/instagram.png";
import linkedin from "../logos/linkedin.png";
import db from '../index';
import editar from './DB/Editar';
import eliminar from './DB/Eliminar';

class PostuladoTarjeta extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mailPostulado: this.props.mailPostulado,
            trabajo: this.props.trabajo,
            postulacion: this.props.postulacion,
            evento: this.props.evento,
            cantPostTrabajo: this.props.cantPost,
            cantPostEvento: this.props.cantPostEvento,
            usuario: null,
        }
    }
    componentDidMount() {
        var docRef = db.collection("usuarios").doc(this.state.mailPostulado);
        let component = this;
        docRef.get().then(function (doc) {
            if (doc.exists) {
                console.log("Postulado:", doc.data());
                component.setState({ usuario: doc.data() });
            } else {
                alert("Ha ocurrido un error. Actualice la página.");
            }
        }).catch(function (error) {
            console.log(error);
            alert("Ha ocurrido un error. Actualice la página.");
        });
    }
    eliminarPostulacionesPorTrabajo(trabajo) {
        db.collection("postulaciones").where("id_trabajo", "==", trabajo).get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    eliminar.eliminarPostulacion(doc.data().id_postulacion)
                });
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
    }

    aceptarPostulante = () => {
        var mail = this.state.usuario.email;
        var trabajo = this.state.trabajo;
        var evento = this.state.evento;
        var cantPostTrabajo = this.state.cantPostTrabajo;
        var cantPostEvento = this.state.cantPostEvento;
        var nuevaCantPostEvento = cantPostEvento - cantPostTrabajo; 
        var nuevaCantAsignados = this.state.cantAsignados - 1;
        this.eliminarPostulacionesPorTrabajo(trabajo)
        editar.asignarTrabajador(mail, trabajo)
        if (nuevaCantPostEvento === 0) {
        editar.asignarTrabajadorAEvento(evento, "pendiente", nuevaCantPostEvento, nuevaCantAsignados); 
        }else{
            editar.asignarTrabajadorAEvento(evento, "postulado", nuevaCantPostEvento, nuevaCantAsignados);   
        }
    }
    rechazarPostulante = () => {
        var evento = this.state.evento;
        var trabajo = this.state.trabajo;
        var postulacion = this.state.postulacion;
        var cantPostTrabajo = this.state.cantPostTrabajo - 1;
        var cantPostEvento = this.state.cantPostEvento - 1;
        eliminar.eliminarPostulacion(postulacion)
        if (cantPostTrabajo === 0) {
            editar.rechazarTrabajo(trabajo, "pendiente", cantPostTrabajo)
            if (cantPostEvento === 0) {
                editar.rechazarTrabajadorAEvento(evento, "pendiente", cantPostEvento);
                }else{
                    editar.rechazarTrabajadorAEvento(evento, "postulado", cantPostEvento);
                }
        } else {
            editar.rechazarTrabajo(trabajo, "postulado", cantPostTrabajo)
            editar.rechazarTrabajadorAEvento(evento, "postulado", cantPostEvento);
        }
    }
    render() {
        var nombre = "";
        var mail = "";
        var photoUrl = "";
        var telefono = "";
        var linkedinpanel = "";
        var facebookpanel = "";
        var instagrampanel = "";
        var twitterpanel = "";
        if (this.state.usuario !== null) {
            nombre = this.state.usuario.fullname;
            mail = this.state.usuario.email;
            photoUrl = this.state.usuario.urlFoto;
            if (this.state.usuario.telefono !== null && this.state.usuario.telefono !== "") {
                telefono = "Telefono: " + this.state.usuario.telefono;
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
        }

        return (
            <div fullwidth class="card-dueño">
                <img class="avatar-trabajo" src={photoUrl} alt="persona" />
                <div class="skewed bg-react"></div>
                <div class="content-dueño">
                    <div>
                        <button className='eliminartrabajo-btn' onClick={this.rechazarPostulante}>Rechazar</button>
                        <button className='aceptar-btn' onClick={this.aceptarPostulante}>Aceptar</button>
                    </div>
                    <div className="redes-sociales">
                        {facebookpanel}
                        {instagrampanel}
                        {twitterpanel}
                        {linkedinpanel}
                    </div>
                    <h1>{nombre}</h1>
                    <h3>{mail}</h3>

                    <p class="esp text-react">{telefono}</p>
                </div>
            </div>
        );
    }
}

export default PostuladoTarjeta;