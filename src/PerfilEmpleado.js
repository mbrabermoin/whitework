import React from 'react';
import './PerfilEmpleado.css';
import facebook from "./logos/facebook.png";
import twitter from "./logos/twitter.png";
import instagram from "./logos/instagram.png";
import gmail from "./logos/gmail.png";
import linkedin from "./logos/linkedin.png";
import whatsapp from "./logos/whatsapp.png";
import locacion from "./logos/locacion.png";
import BotonDarPuntuacion from "./components/DarPuntuacion";

class PerfilEmpleado extends React.Component {
    render() {
        return (
            <div className="wrapper1">

                <div className="profile-card js-profile-card">
                    <div className="profile-card__img">
                        <img src="https://res.cloudinary.com/muhammederdem/image/upload/v1537638518/Ba%C5%9Fl%C4%B1ks%C4%B1z-1.jpg" alt="profile card" />
                    </div>

                    <div className="profile-card__cnt js-profile-cnt">
                        <div className="profile-card__name">Marcelo Perez</div>
                        <div className="profile-card__txt">Guitarrista de <strong>Buenos Aires</strong></div>
                        <div className="profile-card-loc">
                            <span className="profile-card-loc__icon">
                                <img width="60" height="60" alt="fb" src={locacion} />
                            </span>

                            <span className="profile-card-loc__txt">
                                Istanbul, Turkey
        </span>
                        </div>

                        <div className="profile-card-inf">
                            <div className="profile-card-inf__item">
                                <div className="profile-card-inf__title">15</div>
                                <div className="profile-card-inf__txt">Changas realizadas</div>
                            </div>
                            <div className="profile-card-inf__item">
                                <div className="profile-card-inf__title">9</div>
                                <div className="profile-card-inf__txt">Positivos</div>
                            </div>
                            <div className="profile-card-inf__item">
                                <div className="profile-card-inf__title">6</div>
                                <div className="profile-card-inf__txt">Negativos</div>
                            </div>
                        </div>

                        <div className="profile-card-social">
                            <a href="https://facebook.com/" className="profile-card-social__item facebook">
                                <span className="icon-font">
                                    <img width="80" height="80" alt="fb" src={facebook} />
                                </span>
                            </a>

                            <a href="https://twitter.com/" className="profile-card-social__item twitter">
                                <span className="icon-font">
                                    <img width="80" height="80" alt="fb" src={twitter} />
                                </span>
                            </a>

                            <a href="https://www.instagram.com/" className="profile-card-social__item instagram">
                                <span className="icon-font">
                                    <img width="80" height="80" alt="fb" src={instagram} />
                                </span>
                            </a>
                            <a href="https://www.gmail.com/" className="profile-card-social__item gmail">
                                <span className="icon-font">
                                    <img width="80" height="80" alt="fb" src={gmail} />
                                </span>
                            </a>
                            <a href="https://www.linkedin.com/" className="profile-card-social__item linkedin">
                                <span className="icon-font">
                                    <img width="80" height="80" alt="fb" src={linkedin} />
                                </span>
                            </a>
                            <a href="https://www.whatsapp.com/" className="profile-card-social__item whatsapp">
                                <span className="icon-font">
                                    <img width="80" height="80" alt="fb" src={whatsapp} />
                                </span>
                            </a>

                        </div>

                        <div className="profile-card-ctr">
                            <BotonDarPuntuacion/>
                           </div>
                    </div>
                </div>
            </div>);
    }
}

export default PerfilEmpleado;