import React from 'react';
import './PostuladoTarjeta.css';
import facebook from "../logos/facebook.png";
import twitter from "../logos/twitter.png";
import instagram from "../logos/instagram.png";
import linkedin from "../logos/linkedin.png";
import db from '../index';

class PostuladoTarjeta extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mailPostulado: this.props.mailPostulado,
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
                        <button className='eliminartrabajo-btn'>Rechazar</button>
                        <button className='editar-btn'>Aceptar</button>
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