import React from 'react';
import './PerfilEmpleado.css';
import facebook from "./logos/facebook.png";
import twitter from "./logos/twitter.png";
import instagram from "./logos/instagram.png";
import gmail from "./logos/gmail.png";
import linkedin from "./logos/linkedin.png";
import whatsapp from "./logos/whatsapp.png";
import locacion from "./logos/locacion.png";

class PerfilEmpleado extends React.Component {
    render() {
        return (
            <div class="wrapper">

                <div class="profile-card js-profile-card">
                    <div class="profile-card__img">
                        <img src="https://res.cloudinary.com/muhammederdem/image/upload/v1537638518/Ba%C5%9Fl%C4%B1ks%C4%B1z-1.jpg" alt="profile card" />
                    </div>

                    <div class="profile-card__cnt js-profile-cnt">
                        <div class="profile-card__name">Marcelo Perez</div>
                        <div class="profile-card__txt">Guitarrista de <strong>Buenos Aires</strong></div>
                        <div class="profile-card-loc">
                            <span class="profile-card-loc__icon">
                                <img width="60" height="60" alt="fb" src={locacion} />
                            </span>

                            <span class="profile-card-loc__txt">
                                Istanbul, Turkey
        </span>
                        </div>

                        <div class="profile-card-inf">
                            <div class="profile-card-inf__item">
                                <div class="profile-card-inf__title">15</div>
                                <div class="profile-card-inf__txt">Changes realizadas</div>
                            </div>
                            <div class="profile-card-inf__item">
                                <div class="profile-card-inf__title">9</div>
                                <div class="profile-card-inf__txt">Positivos</div>
                            </div>
                            <div class="profile-card-inf__item">
                                <div class="profile-card-inf__title">6</div>
                                <div class="profile-card-inf__txt">Negativos</div>
                            </div>
                        </div>

                        <div class="profile-card-social">
                            <a href="https://facebook.com/" class="profile-card-social__item facebook">
                                <span class="icon-font">
                                    <img width="80" height="80" alt="fb" src={facebook} />
                                </span>
                            </a>

                            <a href="https://twitter.com/" class="profile-card-social__item twitter">
                                <span class="icon-font">
                                    <img width="80" height="80" alt="fb" src={twitter} />
                                </span>
                            </a>

                            <a href="https://www.instagram.com/" class="profile-card-social__item instagram">
                                <span class="icon-font">
                                    <img width="80" height="80" alt="fb" src={instagram} />
                                </span>
                            </a>
                            <a href="https://www.gmail.com/" class="profile-card-social__item gmail">
                                <span class="icon-font">
                                    <img width="80" height="80" alt="fb" src={gmail} />
                                </span>
                            </a>
                            <a href="https://www.linkedin.com/" class="profile-card-social__item linkedin">
                                <span class="icon-font">
                                    <img width="80" height="80" alt="fb" src={linkedin} />
                                </span>
                            </a>
                            <a href="https://www.whatsapp.com/" class="profile-card-social__item whatsapp">
                                <span class="icon-font">
                                    <img width="80" height="80" alt="fb" src={whatsapp} />
                                </span>
                            </a>

                        </div>

                        <div class="profile-card-ctr">
                            <button class="profile-card__button button--blue js-message-btn">Message</button>
                            <button class="profile-card__button button--orange">Follow</button>
                        </div>
                    </div>

                    <div class="profile-card-message js-message">
                        <form class="profile-card-form">
                            <div class="profile-card-form__container">
                                <textarea placeholder="Say something..."></textarea>
                            </div>

                            <div class="profile-card-form__bottom">
                                <button class="profile-card__button button--blue js-message-close">
                                    Send
          </button>

                                <button class="profile-card__button button--gray js-message-close">
                                    Cancel
          </button>
                            </div>
                        </form>

                        <div class="profile-card__overlay js-message-close"></div>
                    </div>
                </div>
            </div>);
    }
}

export default PerfilEmpleado;