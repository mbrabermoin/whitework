import React from 'react';
import './DueñoTarjeta.css';
import facebook from "../logos/facebook.png";
import twitter from "../logos/twitter.png";
import instagram from "../logos/instagram.png";
import linkedin from "../logos/linkedin.png";
import db from '../index';

class DueñoTarjeta extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mailDueño: this.props.mailDueño,
            usuario: null,
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
    }
    render() {
        var nombre = "";
        var descripcion = "";
        var photoUrl = "";
        var telefono = "";
        var linkedinpanel = "";
        var facebookpanel = "";
        var instagrampanel = "";
        var twitterpanel = "";
        if (this.state.usuario !== null) {
            nombre = this.state.usuario.fullname;
            descripcion = this.state.usuario.email;
            photoUrl = this.state.usuario.urlFoto;
            telefono = this.state.usuario.telefono;
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
                    <div className="redes-sociales">
                        {facebookpanel}
                        {instagrampanel}
                        {twitterpanel}
                        {linkedinpanel}
                    </div>
                    <h1>{nombre}</h1>
                    <h3>{descripcion}</h3>
                    <h3>{descripcion}</h3>

                    <p class="esp text-react">Telefono: {telefono}</p>
                </div>
            </div>
        );
    }
}

export default DueñoTarjeta;