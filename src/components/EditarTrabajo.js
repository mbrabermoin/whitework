import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import db from '../index';
import Editar from './DB/Editar';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});
const periodos = [
    {
        value: 'Hora',
        label: 'Hora',
    },
    {
        value: 'Jornada',
        label: 'Jornada',
    },
    {
        value: 'Semana',
        label: 'Semana',
    },
    {
        value: 'Total',
        label: 'Total',
    },
];
const categorias = [
    {
        value: '',
        label: '',
    },
    {
        value: 'Diversion',
        label: 'Diversion',
    },
    {
        value: 'Electricidad',
        label: 'Electricidad',
    },
    {
        value: 'Plomeria',
        label: 'Plomeria',
    },
    {
        value: 'Gasista',
        label: 'Gasista',
    },
    {
        value: 'Seguridad',
        label: 'Seguridad',
    },
    {
        value: 'Otros',
        label: 'Otros',
    },
];
class EditarTrabajo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openCortina: false,
            openTrabajo: false,
            estado: this.props.estado,
            trabajoid: this.props.trabajo,
            rol: "",
            descripcion: "",
            pago: "",
            periodoDisplay: "",
            categoriaDisplay: "",
            trabajoObjeto: this.props.trabajoObjeto,
        }
    }
    handleCambiarPeriodo = name => event => {
        this.setState({ periodoDisplay: event.target.value });
    }
    handleCambiarCategoria = name => event => {
        this.setState({ categoriaDisplay: event.target.value });
    }
    handleCloseTrabajo = () => {
        this.setState({ openTrabajo: false });
    };
    handleOpenTrabajo = () => {
        this.setState({ openCortina: true });
        var rol = "";
        var descripcion = "";
        var pago = "";
        var periodo = "";
        var categoria = "";
        if (this.state.estado !== "agregando") {
            db.collection("trabajos").doc(this.state.trabajoid).get().then(function (doc) {
                if (doc.exists) {
                    rol = doc.data().rol;
                    descripcion = doc.data().descripcion;
                    pago = doc.data().pago;
                    periodo = doc.data().periodo;
                    categoria = doc.data().categoria;
                    console.log("Document data:", doc.data());
                } else {
                    alert("Ha ocurrido un error. Actualice la página.");
                }
            }).catch(function (error) {
                console.log(error);
                alert("Ha ocurrido un error. Actualice la página.");
            });
            setTimeout(() => {
                this.setState({ rol: rol });
                this.setState({ descripcion: descripcion });
                this.setState({ pago: pago });
                this.setState({ periodoDisplay: periodo });
                this.setState({ categoriaDisplay: categoria });
                this.setState({ openCortina: false });
                this.setState({ openTrabajo: true });
            }, 1100);
        } else {
            this.setState({ rol: this.state.trabajoObjeto.rol });
            this.setState({ descripcion: this.state.trabajoObjeto.descripciontrab });
            this.setState({ pago: this.state.trabajoObjeto.pago });
            this.setState({ periodoDisplay: this.state.trabajoObjeto.periodo });
            this.setState({ categoriaDisplay: this.state.trabajoObjeto.categoria });
            this.setState({ openCortina: false });
            this.setState({ openTrabajo: true });
        }

    };
    handleEditarTrabajo = () => {
        const rol = document.getElementById("rol").value;
        if (rol.trim() === "") {
            this.props.mostrarMensajeExitoEdit("Rol es Requerido.", "error");
        } else {
            const descripciontrab = document.getElementById("descripcion-trab").value;
            if (descripciontrab.trim() === "") {
                this.props.mostrarMensajeExitoEdit("Descripción es Requerida.", "error");
            } else {
                const pago = document.getElementById("pago").value;
                if (pago.trim() === "") {
                    this.props.mostrarMensajeExitoEdit("Pago es Requerido.", "error");
                } else {
                    const periodo = this.state.periodoDisplay;
                    if (periodo.trim() === "") {
                        this.props.mostrarMensajeExitoEdit("Periodo es Requerido.", "error");
                    } else {
                        const trabajoid = this.state.trabajoid;
                        const categoria = this.state.categoriaDisplay;
                        if (this.state.estado !== "agregando") {
                            this.setState({ openCortina: true });
                            Editar.modificarTrabajo(trabajoid, rol, descripciontrab, pago, periodo, categoria)
                            setTimeout(() => {
                                this.props.actualizarTrabajosEdit();
                                this.props.mostrarMensajeExitoEdit("Trabajo Actualizado Correctamente.", "success");
                                this.setState({ openCortina: false });
                                this.setState({ openTrabajo: false });
                            }, 1000);
                        } else {
                            this.props.editarEnAgregando(rol, descripciontrab, pago, periodo, categoria)
                            this.setState({ openCortina: false });
                            this.setState({ openTrabajo: false });
                        }
                    }
                }
            }
        }

    }
    render() {
        return (
            <div>
                <button className='editar-btn' onClick={this.handleOpenTrabajo}>Editar</button>
                <Dialog
                    open={this.state.openTrabajo}
                    onClose={this.handleCloseTrabajo}
                    TransitionComponent={Transition}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="confirmation-dialog-title">Editar Trabajo</DialogTitle>
                    <DialogContent dividers>
                        <TextField id="rol" required autoFocus margin="dense" defaultValue={this.state.rol} label="Rol del trabajador" type="rol" fullWidth />
                        <TextField id="descripcion-trab" required multiline rows="2" defaultValue={this.state.descripcion} margin="dense" label="Descripción del trabajo" type="descripcion" fullWidth />
                        <TextField id="pago" required margin="dense" defaultValue={this.state.pago} label="Pago" type="number" fullWidth />
                        <TextField id="periodo" select required margin="dense" defaultValue={this.state.periodoDisplay} value={this.state.periodoDisplay} SelectProps={{ native: true, }} onChange={this.handleCambiarPeriodo('periodoDisplay')} label="Periodo de Pago" fullWidth>
                            {periodos.map(option => (<option key={option.value} value={option.value}>{option.label}</option>))}
                        </TextField>
                        <TextField id="categoria" select margin="dense" defaultValue={this.state.categoriaDisplay} value={this.state.categoriaDisplay} SelectProps={{ native: true, }} onChange={this.handleCambiarCategoria('categoriaDisplay')} label="Categoría" fullWidth>
                            {categorias.map(option => (<option key={option.value} value={option.value}>{option.label}</option>))}
                        </TextField>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseTrabajo} color="secondary">
                            VOLVER
                         </Button>
                        <Button onClick={this.handleEditarTrabajo} color="primary">
                            GUARDAR
                         </Button>
                    </DialogActions>
                </Dialog><Dialog
                    open={this.state.openCortina}
                    TransitionComponent={Transition}
                    aria-labelledby="form-dialog-title"
                >
                </Dialog></div>);
    }
}

export default EditarTrabajo;