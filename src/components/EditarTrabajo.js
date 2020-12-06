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
const metodopago = [
    {
        value: 'A Definir',
        label: 'A Definir',
    },
    {
        value: 'Efectivo',
        label: 'Efectivo',
    },
    {
        value: 'Transferencia',
        label: 'Transferencia',
    },
    {
        value: 'MercadoPago',
        label: 'MercadoPago',
    },
];
const facturacion = [
    {
        value: 'A Definir',
        label: 'A Definir',
    },
    {
        value: 'Factura A',
        label: 'Factura A',
    },
    {
        value: 'Factura B',
        label: 'Factura B',
    },
    {
        value: 'Factura C',
        label: 'Factura C',
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
            usuario: this.props.usuario,
            openCortina: false,
            openTrabajo: false,
            estado: this.props.estado,
            trabajoid: this.props.trabajo,
            rol: "",
            descripcion: "",
            pago: "",
            metodopagoDisplay: "",
            facturacionDisplay: "",
            periodoDisplay: "",
            categoriaDisplay: "",
            trabajoObjeto: this.props.trabajoObjeto,
        }
    }
    handleCambiarMetodopago = name => event => {
        this.setState({ metodopagoDisplay: event.target.value });
    }
    handleCambiarFacturacion = name => event => {
        this.setState({ facturacionDisplay: event.target.value });
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
        if (this.state.usuario.suspendido) {
            this.props.mostrarMensajeExitoEdit("No puedes Editar un trabajo, su cuenta se encuentra suspendida.", "error");
        } else {
            this.setState({ openCortina: true });
            var rol = "";
            var descripcion = "";
            var pago = "";
            var periodo = "";
            var categoria = "";
            var metodopago = "";
            var facturacion = "";
            if (this.state.estado !== "agregando") {
                db.collection("trabajos").doc(this.state.trabajoid).get().then(function (doc) {
                    if (doc.exists) {
                        rol = doc.data().rol;
                        descripcion = doc.data().descripcion;
                        metodopago = doc.data().metodopago;
                        facturacion = doc.data().facturacion;
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
                    if (metodopago === "" || metodopago === undefined) {
                        this.setState({ metodopagoDisplay: 'A Definir' });
                    } else {
                        this.setState({ metodopagoDisplay: metodopago });
                    }
                    if (facturacion === "" || facturacion === undefined) {
                        this.setState({ facturacionDisplay: 'A Definir' });
                    } else {
                        this.setState({ facturacionDisplay: facturacion });
                    }
                    this.setState({ periodoDisplay: periodo });
                    this.setState({ categoriaDisplay: categoria });
                    this.setState({ openCortina: false });
                    this.setState({ openTrabajo: true });
                }, 1100);
            } else {
                this.setState({ rol: this.state.trabajoObjeto.rol });
                this.setState({ descripcion: this.state.trabajoObjeto.descripciontrab });
                this.setState({ pago: this.state.trabajoObjeto.pago });
                this.setState({ metodopagoDisplay: this.state.trabajoObjeto.metodopago });
                this.setState({ facturacionDisplay: this.state.trabajoObjeto.facturacion });
                this.setState({ periodoDisplay: this.state.trabajoObjeto.periodo });
                this.setState({ categoriaDisplay: this.state.trabajoObjeto.categoria });
                this.setState({ openCortina: false });
                this.setState({ openTrabajo: true });
            }
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
                        const metodopago = this.state.metodopagoDisplay;
                        const facturacion = this.state.facturacionDisplay;
                        const categoria = this.state.categoriaDisplay;
                        if (this.state.estado !== "agregando") {
                            this.setState({ openCortina: true });
                            Editar.modificarTrabajo(trabajoid, rol, descripciontrab, metodopago,facturacion, pago, periodo, categoria)
                            setTimeout(() => {
                                this.props.actualizarTrabajosEdit();
                                this.props.mostrarMensajeExitoEdit("Trabajo Actualizado Correctamente.", "success");
                                this.setState({ openCortina: false });
                                this.setState({ openTrabajo: false });
                            }, 1000);
                        } else {
                            this.props.editarEnAgregando(rol, descripciontrab, metodopago,facturacion, pago, periodo, categoria)
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
                        <TextField id="rol" required autoFocus margin="dense" defaultValue={this.state.rol} label="Rol a cumplir" type="rol" fullWidth />
                        <TextField id="descripcion-trab" required multiline rows="2" defaultValue={this.state.descripcion} margin="dense" label="Descripción del trabajo" type="descripcion" fullWidth />
                        <TextField id="metodopago" select required margin="dense" defaultValue={this.state.metodopagoDisplay} value={this.state.metodopagoDisplay} SelectProps={{ native: true, }} onChange={this.handleCambiarMetodopago('metodopagoDisplay')} label="Metodo de Pago" fullWidth>
                            {metodopago.map(option => (<option key={option.value} value={option.value}>{option.label}</option>))}
                        </TextField>
                        <TextField id="facturacion" select required margin="dense" defaultValue={this.state.facturacionDisplay} value={this.state.facturacionDisplay} SelectProps={{ native: true, }} onChange={this.handleCambiarFacturacion('facturacionDisplay')} label="Facturación" fullWidth>
                            {facturacion.map(option => (<option key={option.value} value={option.value}>{option.label}</option>))}
                        </TextField>
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