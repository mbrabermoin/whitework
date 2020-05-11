import React from 'react';
import './PerfilEmpleado.css';
import facebook from "./logos/facebook.png";
import twitter from "./logos/twitter.png";
import instagram from "./logos/instagram.png";
import linkedin from "./logos/linkedin.png";
import locacion from "./logos/locacion.png";
import BotonDarPuntuacion from "./components/DarPuntuacion";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

class PerfilEmpleado extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usuario: props.usuario,
            openModalFacebook: false,
            openModalTwitter: false,
            openModalInstagram: false,
            openModalLinkedIn: false,
        }
    }
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
    render() {
        return (
            <div className="wrapper1">
                <div className="profile-card js-profile-card">
                    <div className="profile-card__img">
                        <img src={this.state.usuario.urlFoto} alt="profile card" />
                    </div>
                    <div className="profile-card__cnt js-profile-cnt">
                        <div className="profile-card__name">{this.state.usuario.fullname}</div>
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
                            {/*<a href="https://www.whatsapp.com/" className="profile-card-social__item whatsapp">
                                <span className="icon-font">
                                    <img width="80" height="80" alt="fb" src={whatsapp} />
                                </span>
                            </a>*/}
                        </div>
                        <div className="profile-card-ctr">
                            <BotonDarPuntuacion />
                        </div>
                        <div className="comentarios-container">
                            <div className="titulo-comentarios">
                                Comentarios:
                            </div>
                            <div className="comments-list">

                                <div className="message-container">
                                    <div className="content">
                                        <article className="tweet">
                                            <div className="tweet-side">
                                                <img className="avatar-comments" src="//www.artifacting.com/blog/wp-content/uploads/2010/11/Batman.jpg" alt="Batman" />
                                            </div>

                                            <div className="tweet-body">
                                                <span className="userName">Raul Gonzalez</span>
                                                <p className="message">Labura genial, siempre atento</p>
                                            </div>
                                        </article>
                                        <article className="tweet">
                                            <div className="tweet-side">
                                                <img className="avatar-comments" src="//www.artifacting.com/blog/wp-content/uploads/2010/11/Gollum.jpg" alt="Gollum" />
                                            </div>

                                            <div className="tweet-body">
                                                <span className="userName">Pedro Mendez</span>
                                                <p className="message">No cumple los horarios.</p>
                                            </div>
                                        </article>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
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
                        <TextField id="nombre" autoFocus margin="dense" label="URL Facebook" type="facebook" fullWidth />
                       </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCerrarFacebook} color="primary">
                            Cancel
                         </Button>
                        <Button onClick={this.handleCerrarFacebook} color="primary">
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
                        <TextField id="nombre" autoFocus margin="dense" label="URL Twitter" type="twitter" fullWidth />
                       </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCerrarTwitter} color="primary">
                            Cancel
                         </Button>
                        <Button onClick={this.handleCerrarTwitter} color="primary">
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
                        <TextField id="nombre" autoFocus margin="dense" label="URL Instagram" type="instagram" fullWidth />
                       </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCerrarInstagram} color="primary">
                            Cancel
                         </Button>
                        <Button onClick={this.handleCerrarInstagram} color="primary">
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
                        <TextField id="nombre" autoFocus margin="dense" label="URL LinkedIn" type="LinkedIn" fullWidth />
                       </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCerrarLinkedIn} color="primary">
                            Cancel
                         </Button>
                        <Button onClick={this.handleCerrarLinkedIn} color="primary">
                            Ok
                         </Button>
                    </DialogActions>
                </Dialog>
            </div>);
    }
}

export default PerfilEmpleado;