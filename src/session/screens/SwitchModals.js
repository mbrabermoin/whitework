import React from 'react';
import ResetPasswordModal from "./ResetPasswordModal";
import LoginScreenModal from "./LoginScreenModal";
import RegistrarseModal from "./RegistrarseModal";
import SiteScreen from './SiteScreen';


class switchModals extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: "site"
        }
    }
    abrirResetModal() {
        this.setState({ mode: "reset" });
    }
    abrirRegistrarseModal() {
        this.setState({ mode: "nuevoUser" });
    }
    abrirLoginModal() {
        this.setState({ mode: "login" });
    }
    render() {
        if (this.state.mode === "site") {
            return (<div>
                <SiteScreen abrirLogin={this.abrirLoginModal.bind(this)}/>
            </div>
            );
        } else {
            if (this.state.mode === "login") {
                return (<div>
                    <LoginScreenModal registrarseModal={this.abrirRegistrarseModal.bind(this)} resetModal={this.abrirResetModal.bind(this)} signInFacebook={this.props.signInFacebook} signInGoogle={this.props.signInGoogle} signInTwitter={this.props.signInTwitter} />
                </div>
                );
            } else {
                if (this.state.mode === "nuevoUser") {
                    return (<div><RegistrarseModal volverLoginModal={this.abrirLoginModal.bind(this)} /></div>);
                } else {
                    return (<div><ResetPasswordModal volverLoginModal={this.abrirLoginModal.bind(this)} /></div>);
                }
            }
        }
    }

}

export default switchModals;