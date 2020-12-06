import React from 'react';
import EventoTarjeta from "./components/EventoTarjeta";
import { auth } from "./firebase";
import db from './index';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import * as provinciasjson from './components/JSONs/Provincias.json';
import * as ciudadesjson from './components/JSONs/Ciudades.json';
import { MenuItem } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const provincias = provinciasjson.default.states;
const ciudades = ciudadesjson.default.cities;
const dateNow = new Date();
var year = dateNow.getFullYear();
const monthWithOffset = dateNow.getUTCMonth() + 1;
var day = dateNow.getUTCDate().toString();
// Setting current Month number from current Date object
var month = monthWithOffset.toString();
if (monthWithOffset.toString().length < 2) {
  month = "0" + month
}
if (day.length < 2) {
  day = "0" + day
}
const materialDateInput = year + "-" + month + "-" + day;
if (month < "12") {
  month = parseInt(month) + 1;
} else {
  month = 1;
  year = parseInt(year) + 1;
}
if (month.toString().length < 2) {
  month = "0" + month
}
const fechaProximoMes = year + "-" + month + "-" + day;
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
export default class ModoEmpleado extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      estadoDeEvento: "pendiente",
      usuario: null,
      eventos: [],
      openCortina: true,
      provincia: "",
      ciudad: "",
      provinciaDisplay: "",
      ciudadDisplay: "",
      ciudades: [],
      filtroActivo: false,
      trabajosPostulados: [],
      MensajeExito: "",
      openMensajeExito: false,
      modoMensaje: "success",
      periodoDisplay: "Total",
      categoriaDisplay: "",
    }
    this.actualizarEventosGeneral = this.actualizarEventosGeneral.bind(this);
  }
  componentDidMount() {
    this.setState({ openCortina: true });
    setTimeout(() => {
      var user = auth.currentUser;
      var docRef = db.collection("usuarios").doc(user.email);
      let component = this;
      docRef.get().then(function (doc) {
        if (doc.exists) {
          component.setState({ usuario: doc.data() });
        } else {
          alert("Ha ocurrido un error. Actualice la página.");
        }
      }).catch(function (error) {
        console.log(error);
        alert("Ha ocurrido un error. Actualice la página.");
      });
      this.iniciarBusqueda();
    }, 1000);
  }
  handleCambiarPeriodo = name => event => {
    this.setState({ periodoDisplay: event.target.value });
  }
  handleCambiarCategoria = name => event => {
    this.setState({ categoriaDisplay: event.target.value });
  }
  busquedaAbierta() {
    var post = [];
    var events = [];
    var eventosFiltrados = [];
    var user = auth.currentUser;
    var mailUsuario = user.email;
    var pago = "";
    var periodo = "";
    var tipoTrabajo = "";
    if (this.state.filtroActivo) {
      pago = document.getElementById("pago").value;
      periodo = this.state.periodoDisplay;
      tipoTrabajo = this.state.categoriaDisplay;
    }
    db.collection("postulaciones").where("mail_postulante", "==", mailUsuario).get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          post.push(doc.data().id_evento);
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
    db.collection("trabajos").where("mail_trabajador", "==", mailUsuario).get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          post.push(doc.data().id_evento);
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
    if (this.state.filtroActivo) {
      if (tipoTrabajo !== "") {
        if (pago !== "") {
          db.collection("trabajos").where("categoria", "==", tipoTrabajo).where("periodo", "==", periodo).get()
            .then(function (querySnapshot) {
              querySnapshot.forEach(function (doc) {
                if (parseFloat(doc.data().pago) >= parseFloat(pago)) {
                  eventosFiltrados.push(doc.data().id_evento);
                }
              });
            })
            .catch(function (error) {
              console.log("Error getting documents: ", error);
            });
        } else {
          db.collection("trabajos").where("categoria", "==", tipoTrabajo).get()
            .then(function (querySnapshot) {
              querySnapshot.forEach(function (doc) {
                eventosFiltrados.push(doc.data().id_evento);
              });
            })
            .catch(function (error) {
              console.log("Error getting documents: ", error);
            });
        }
      } else {
        if (pago !== "") {
          db.collection("trabajos").where("periodo", "==", periodo).get()
            .then(function (querySnapshot) {
              querySnapshot.forEach(function (doc) {
                if (parseFloat(doc.data().pago) >= parseFloat(pago)) {
                  eventosFiltrados.push(doc.data().id_evento);
                }
              });
            })
            .catch(function (error) {
              console.log("Error getting documents: ", error);
            });
        } else {
          db.collection("trabajos").get()
            .then(function (querySnapshot) {
              querySnapshot.forEach(function (doc) {
                eventosFiltrados.push(doc.data().id_evento);
              });
            })
            .catch(function (error) {
              console.log("Error getting documents: ", error);
            });
        }
      }

    }
    if (this.state.filtroActivo) {
      db.collection("eventos").get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            const found = post.find(element => element === doc.data().id_evento);
            const trabajofiltradoencontrado = eventosFiltrados.find(element => element === doc.data().id_evento);
            if (found !== doc.data().id_evento) {
              if (trabajofiltradoencontrado === doc.data().id_evento) {
                return events.push({ id: doc.id, data: doc.data() });
              }
            }
          });
        })
        .catch(function (error) {
          console.log("Error getting documents: ", error);
        });
    } else {
      db.collection("eventos").get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            const found = post.find(element => element === doc.data().id_evento);
            if (found !== doc.data().id_evento) {
              return events.push({ id: doc.id, data: doc.data() });
            }

          });
        })
        .catch(function (error) {
          console.log("Error getting documents: ", error);
        });
    }
    setTimeout(() => {
      if (this.state.filtroActivo) {
        this.aplicarFiltros(events);
      } else {
        this.setState({ eventos: events })
        this.setState({ openCortina: false });
      }
    }, 2000);
  }
  buscarPostulaciones() {
    var post = [];
    var trabajosPostulados = [];
    var events = [];
    var mailUsuario = this.state.usuario.email;
    db.collection("postulaciones").where("mail_postulante", "==", mailUsuario).get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          post.push(doc.data().id_evento);
          trabajosPostulados.push(doc.data().id_trabajo);
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
    db.collection("eventos").get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          const found = post.find(element => element === doc.data().id_evento);
          if (found === doc.data().id_evento) {
            return events.push({ id: doc.id, data: doc.data() });
          }
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
    this.setState({ trabajosPostulados: trabajosPostulados })
    setTimeout(() => {
      this.setState({ eventos: events })
      this.setState({ openCortina: false });
    }, 1000);
  }
  buscarAsignados() {
    var trab = [];
    var events = [];
    var mailUsuario = this.state.usuario.email;
    db.collection("trabajos").where("mail_trabajador", "==", mailUsuario).get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          trab.push(doc.data().id_evento);
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
    db.collection("eventos").get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          const found = trab.find(element => element === doc.data().id_evento);
          if (found === doc.data().id_evento) {
            return events.push({ id: doc.id, data: doc.data() });
          }
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
    setTimeout(() => {
      this.setState({ eventos: events })
      this.setState({ openCortina: false });
    }, 1000);
  }
  buscarPuntuados() {
    var trab = [];
    var events = [];
    var mailUsuario = this.state.usuario.email;
    db.collection("trabajos").where("mail_trabajador", "==", mailUsuario).where("puntuadoEmpleado", "==", "Y").get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          trab.push(doc.data().id_evento);
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
    db.collection("eventos").get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          const found = trab.find(element => element === doc.data().id_evento);
          if (found === doc.data().id_evento) {
            return events.push({ id: doc.id, data: doc.data() });
          }
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
    setTimeout(() => {
      this.setState({ eventos: events })
      this.setState({ openCortina: false });
    }, 1000);
  }
  elegirEstadoBusqueda = () => {
    this.setState({ eventos: [] })
    document.getElementById("busqueda").style.color = "black";
    document.getElementById("postulaciones").style.color = "#b2bbbd";
    document.getElementById("aceptados").style.color = "#b2bbbd";
    document.getElementById("enproceso").style.color = "#b2bbbd";
    document.getElementById("completados").style.color = "#b2bbbd";
    document.getElementById("puntuados").style.color = "#b2bbbd";
    document.getElementById("temporales-titulo").textContent = "Eventos Temporales - Búsqueda";
    this.setState({ estadoDeEvento: "pendiente" });
    if (!this.state.filtroActivo) {
      this.iniciarBusqueda();
    }
  }
  elegirEstadoPostulaciones = () => {
    this.setState({ openCortina: true });
    this.setState({ eventos: [] })
    document.getElementById("busqueda").style.color = "#b2bbbd";
    document.getElementById("postulaciones").style.color = "black";
    document.getElementById("aceptados").style.color = "#b2bbbd";
    document.getElementById("enproceso").style.color = "#b2bbbd";
    document.getElementById("completados").style.color = "#b2bbbd";
    document.getElementById("puntuados").style.color = "#b2bbbd";
    document.getElementById("temporales-titulo").textContent = "Eventos Temporales - Postulaciones";
    this.setState({ estadoDeEvento: "postulado" });
    this.buscarPostulaciones()
  }
  elegirEstadoAceptado = () => {
    this.setState({ openCortina: true });
    this.setState({ eventos: [] })
    document.getElementById("busqueda").style.color = "#b2bbbd";
    document.getElementById("postulaciones").style.color = "#b2bbbd";
    document.getElementById("aceptados").style.color = "black";
    document.getElementById("enproceso").style.color = "#b2bbbd";
    document.getElementById("completados").style.color = "#b2bbbd";
    document.getElementById("puntuados").style.color = "#b2bbbd";
    document.getElementById("temporales-titulo").textContent = "Eventos Temporales - Aceptados";
    this.setState({ estadoDeEvento: "aceptado" });
    this.buscarAsignados()
  }
  elegirEstadoEnProceso = () => {
    this.setState({ openCortina: true });
    this.setState({ eventos: [] })
    document.getElementById("busqueda").style.color = "#b2bbbd";
    document.getElementById("postulaciones").style.color = "#b2bbbd";
    document.getElementById("aceptados").style.color = "#b2bbbd";
    document.getElementById("enproceso").style.color = "black";
    document.getElementById("completados").style.color = "#b2bbbd";
    document.getElementById("puntuados").style.color = "#b2bbbd";
    document.getElementById("temporales-titulo").textContent = "Eventos Temporales - En Proceso";
    this.setState({ estadoDeEvento: "enproceso" });
    this.buscarAsignados();
  }
  elegirEstadoCompletado = () => {
    this.setState({ openCortina: true });
    this.setState({ eventos: [] })
    document.getElementById("busqueda").style.color = "#b2bbbd";
    document.getElementById("postulaciones").style.color = "#b2bbbd";
    document.getElementById("aceptados").style.color = "#b2bbbd";
    document.getElementById("enproceso").style.color = "#b2bbbd";
    document.getElementById("completados").style.color = "black";
    document.getElementById("puntuados").style.color = "#b2bbbd";
    document.getElementById("temporales-titulo").textContent = "Eventos Temporales - Completados";
    this.setState({ estadoDeEvento: "completado" });
    this.buscarAsignados();
  }
  elegirEstadoPuntuados = () => {
    this.setState({ openCortina: true });
    this.setState({ eventos: [] })
    document.getElementById("busqueda").style.color = "#b2bbbd";
    document.getElementById("postulaciones").style.color = "#b2bbbd";
    document.getElementById("aceptados").style.color = "#b2bbbd";
    document.getElementById("enproceso").style.color = "#b2bbbd";
    document.getElementById("completados").style.color = "#b2bbbd";
    document.getElementById("puntuados").style.color = "black";
    document.getElementById("temporales-titulo").textContent = "Eventos Temporales - Puntuados";
    this.setState({ estadoDeEvento: "puntuado" });
    this.buscarPuntuados();
  }

  aplicarFiltros = (events) => {
    var fromDate = document.getElementById("desde").value;
    var toDate = document.getElementById("hasta").value;
    var dueño = document.getElementById("dueño").value;
    var provincia = this.state.provincia;
    var ciudad = this.state.ciudad;
    var eventosFiltrados = events;
    fromDate = fromDate.substr(0, 4) + "" + fromDate.substr(5, 2) + "" + fromDate.substr(8, 2)
    toDate = toDate.substr(0, 4) + "" + toDate.substr(5, 2) + "" + toDate.substr(8, 2)
    eventosFiltrados = eventosFiltrados.filter(ev => ev.data.dateComienzo.substr(0, 4) + "" + ev.data.dateComienzo.substr(5, 2) + "" + ev.data.dateComienzo.substr(8, 2) + "" + ev.data.timeComienzo.substr(0, 2) + "" + ev.data.timeComienzo.substr(3, 2) > fromDate);
    eventosFiltrados = eventosFiltrados.filter(ev => ev.data.dateComienzo.substr(0, 4) + "" + ev.data.dateComienzo.substr(5, 2) + "" + ev.data.dateComienzo.substr(8, 2) + "" + ev.data.timeComienzo.substr(0, 2) + "" + ev.data.timeComienzo.substr(3, 2) < toDate);
    if (provincia.trim() !== "") {
      eventosFiltrados = eventosFiltrados.filter(ev => ev.data.provincia === provincia);
    }
    if (ciudad.trim() !== "") {
      eventosFiltrados = eventosFiltrados.filter(ev => ev.data.ciudad === ciudad);
    }
    if (dueño.trim() !== "") {
      eventosFiltrados = eventosFiltrados.filter(ev => ev.data.nombre_dueño_evento.includes(dueño));
    }
    setTimeout(() => {
      this.setState({ eventos: eventosFiltrados })
      this.setState({ openCortina: false });
    }, 1000);
  }
  iniciarBusqueda = () => {
    this.setState({ openCortina: true });
    this.busquedaAbierta()
  }
  openFiltro = () => {
    this.setState({ filtroActivo: true });
  }
  cerrarFiltros = () => {
    this.setState({ filtroActivo: false });
  }

  handleCambiarProvincia = name => event => {
    this.setState({ provinciaDisplay: event.target.value });
    this.setState({ ciudad: "" });
    var provincia = provincias.filter(provincia => provincia.id === event.target.value);
    this.setState({ provincia: provincia[0].name });
    var cities = ciudades.filter(ciudad => ciudad.id_state === event.target.value || ciudad.id_state === 0);
    this.setState({ ciudades: cities });
  }
  handleCambiarCiudad = name => event => {
    this.setState({ ciudadDisplay: event.target.value });
    var ciudad = ciudades.filter(city => city.id.toString() === event.target.value.toString());
    this.setState({ ciudad: ciudad[0].name })
  }
  limpiarFiltros = () => {
    this.setState({ provinciaDisplay: "" });
    this.setState({ periodoDisplay: "Total" });
    this.setState({ categoriaDisplay: "" });
    this.setState({ ciudad: "" });
    this.setState({ provincia: "" });
    document.getElementById("pago").value = "";
    document.getElementById("dueño").value = "";
    document.getElementById("desde").value = materialDateInput;
    document.getElementById("hasta").value = fechaProximoMes;
  }
  actualizarEventosGeneral() {
    this.setState({ eventos: [] })
    if (this.state.estadoDeEvento === "pendiente") {
      this.iniciarBusqueda();
    } else {
      if (this.state.estadoDeEvento === "postulado") {
        this.buscarPostulaciones();
      } else {
        if (this.state.estadoDeEvento === "aceptado") {
          this.buscarAsignados()
        } else {
          if (this.state.estadoDeEvento === "completado") {
            this.buscarAsignados();
          }
        }
      }
    }
  }
  mostrarMensajeExito = (mensaje, modo) => {
    this.setState({ modoMensaje: modo });
    this.setState({ MensajeExito: mensaje });
    this.setState({ openMensajeExito: true });
  }
  cerrarMensajeExito = () => {
    this.setState({ openMensajeExito: false });
  }
  render() {
    var ciudadesMostrar = ""
    if (this.state.provinciaDisplay === "") {
      ciudadesMostrar = <TextField id="ciudad2" disabled SelectProps={{ native: true, }} onChange="" label="Ciudad" style={{ width: 400, }} >

      </TextField>
    } else {
      ciudadesMostrar = <TextField id="ciudad" select SelectProps={{ native: true }} value={this.state.ciudadDisplay} onChange={this.handleCambiarCiudad('ciudadDisplay')} label="Ciudad" style={{ width: 400, }} >
        {this.state.ciudades.map(option => <option key={option.id} value={option.id}>{option.name}</option>)}
      </TextField>
    }
    var today = new Date();
    var mes = "";
    if ((today.getMonth() + 1).toString().length === 2) {
      mes = (today.getMonth() + 1)
    } else {
      mes = 0 + "" + (today.getMonth() + 1)
    }
    var dia = "";
    if (today.getDate().toString().length === 2) {
      dia = today.getDate()
    } else {
      dia = 0 + "" + today.getDate()
    }
    var minutos = "";
    if (today.getMinutes().toString().length === 2) {
      minutos = today.getMinutes()
    } else {
      minutos = 0 + "" + today.getMinutes()
    }
    var hora = "";
    if (today.getHours().toString().length === 2) {
      hora = today.getHours()
    } else {
      hora = 0 + "" + today.getHours()
    }
    var date = today.getFullYear() + "" + mes + "" + dia;
    var time = hora + "" + minutos;
    var dateTime = date + time;
    var filtros = "";
    if (this.state.estadoDeEvento === "pendiente") {
      if (this.state.filtroActivo === true) {
        filtros = <div className="filters-container">
          <label>Desde: </label>
          <input id="desde" type="date" text="desde" defaultValue={materialDateInput} className="filtro-busqueda" />
          <label>Hasta: </label>
          <input id="hasta" type="date" text="hasta" defaultValue={fechaProximoMes} className="filtro-busqueda" />
          <label>Dueño: </label>
          <input id="dueño" type="" text="Dueño" className="filtro-busqueda" />
          <br></br>
          <div >
            <TextField id="provincia" select value={this.state.provinciaDisplay} onChange={this.handleCambiarProvincia('provinciaDisplay')} label="Provincia" style={{ width: 200, marginRight: 20, }} >
              {provincias.map(option => <MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>)}
            </TextField>
            {ciudadesMostrar}
          </div>
          <div>
            <TextField id="pago" label="Pago minimo" style={{ width: 200, marginLeft: 20, }} />
            <TextField id="periodo" select value={this.state.periodoDisplay} onChange={this.handleCambiarPeriodo('periodoDisplay')} label="Periodo" style={{ width: 200, marginLeft: 20, }} >
              {periodos.map(option => <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>)}
            </TextField>
            <TextField id="tipo" select value={this.state.categoriaDisplay} onChange={this.handleCambiarCategoria('categoriaDisplay')} label="Categoria" style={{ width: 200, marginLeft: 20, }} >
              {categorias.map(option => <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>)}
            </TextField>
          </div>
          <div id="filtros-activos-botones">
            <button id="filter_button" onClick={this.iniciarBusqueda} className="filter-button-activos">Buscar</button>
            <button id="filter_button" onClick={this.cerrarFiltros} className="filter-button-cerrar"> Cerrar Filtros</button>
            <button id="filter_button" onClick={this.limpiarFiltros} className="filter-button-cerrar"> Limpiar Filtros</button>
          </div>
        </div>
      } else {
        filtros = <div className="filters-container">
          <button id="filter_button" onClick={this.openFiltro} className="filter-filter-button">Filtros</button>
          <button id="filter_button" onClick={this.iniciarBusqueda} className="filter-button">Buscar</button>
        </div>
      }
    }
    var mail = "";
    var contenedorEventos = "";
    if (this.state.usuario !== null) {
      mail = this.state.usuario.email;
      var eventos = "";
      if (this.state.estadoDeEvento === "pendiente") {
        eventos = this.state.eventos.filter(function (evento) {
          return evento.data.mail_dueño_evento !== mail && evento.data.cantAsignados < evento.data.cantidadTrabajos && evento.data.dateComienzo.substr(0, 4) + "" + evento.data.dateComienzo.substr(5, 2) + "" + evento.data.dateComienzo.substr(8, 2) + "" + evento.data.timeComienzo.substr(0, 2) + "" + evento.data.timeComienzo.substr(3, 2) > dateTime;
        });
      } else {
        if (this.state.estadoDeEvento === "postulado") {
          eventos = this.state.eventos.filter(function (evento) {
            return evento.data.mail_dueño_evento !== mail && evento.data.cantAsignados < evento.data.cantidadTrabajos && evento.data.dateComienzo.substr(0, 4) + "" + evento.data.dateComienzo.substr(5, 2) + "" + evento.data.dateComienzo.substr(8, 2) + "" + evento.data.timeComienzo.substr(0, 2) + "" + evento.data.timeComienzo.substr(3, 2) > dateTime;
          });
        } else {
          if (this.state.estadoDeEvento === "aceptado") {
            eventos = this.state.eventos.filter(function (evento) {
              return evento.data.mail_dueño_evento !== mail && evento.data.dateComienzo.substr(0, 4) + "" + evento.data.dateComienzo.substr(5, 2) + "" + evento.data.dateComienzo.substr(8, 2) + "" + evento.data.timeComienzo.substr(0, 2) + "" + evento.data.timeComienzo.substr(3, 2) > dateTime;
            });
          } else {
            if (this.state.estadoDeEvento === "enproceso") {
              eventos = this.state.eventos.filter(function (evento) {
                return evento.data.mail_dueño_evento !== mail && evento.data.dateComienzo.substr(0, 4) + "" + evento.data.dateComienzo.substr(5, 2) + "" + evento.data.dateComienzo.substr(8, 2) + "" + evento.data.timeComienzo.substr(0, 2) + "" + evento.data.timeComienzo.substr(3, 2) < dateTime &&
                  evento.data.dateFinaliza.substr(0, 4) + "" + evento.data.dateFinaliza.substr(5, 2) + "" + evento.data.dateFinaliza.substr(8, 2) + "" + evento.data.timeFinaliza.substr(0, 2) + "" + evento.data.timeFinaliza.substr(3, 2) > dateTime;;
              });
            } else {
              if (this.state.estadoDeEvento === "completado") {
                eventos = this.state.eventos.filter(function (evento) {
                  return evento.data.mail_dueño_evento !== mail && evento.data.cantAsignados > evento.data.cantPuntuados && evento.data.dateFinaliza.substr(0, 4) + "" + evento.data.dateFinaliza.substr(5, 2) + "" + evento.data.dateFinaliza.substr(8, 2) + "" + evento.data.timeFinaliza.substr(0, 2) + "" + evento.data.timeFinaliza.substr(3, 2) < dateTime;;
                });
              } else {
                if (this.state.estadoDeEvento === "puntuado") {
                  eventos = this.state.eventos.filter(function (evento) {
                    return evento.data.mail_dueño_evento !== mail && evento.data.cantAsignados === evento.data.cantPuntuados && evento.data.dateFinaliza.substr(0, 4) + "" + evento.data.dateFinaliza.substr(5, 2) + "" + evento.data.dateFinaliza.substr(8, 2) + "" + evento.data.timeFinaliza.substr(0, 2) + "" + evento.data.timeFinaliza.substr(3, 2) < dateTime;;
                  });
                }
              }
            }
          }
        }
      }
      if (eventos.length === 0) {
        contenedorEventos = <div className="sinEventos">
          No se han encontrado eventos.
      </div>
      } else {
        contenedorEventos = <div className='library'>
          {eventos.map(evento => (<EventoTarjeta key={evento.id} actualizarEventosGeneral={this.actualizarEventosGeneral} mostrarMensajeExito={this.mostrarMensajeExito} usuario={this.state.usuario} estado={this.state.estadoDeEvento} eventoid={evento.data.id_evento} titulo={evento.data.titulo} privado="no" mailDueño={evento.data.mail_dueño_evento} nombreDueño={evento.data.nombre_dueño_evento} cantTrabajos={evento.data.cantidadTrabajos} descripcion={evento.data.descripcion} datecomienzo={evento.data.dateComienzo} datefin={evento.data.dateFinaliza} timecomienzo={evento.data.timeComienzo} timefin={evento.data.timeFinaliza} provincia={evento.data.provincia} ciudad={evento.data.ciudad} direccion={evento.data.direccion} cantPostEvento={evento.data.cantPostulados} cantPuntEvento={evento.data.cantPuntuados} cantAsignados={evento.data.cantAsignados} trabajosPostulados={this.state.trabajosPostulados} modo="empleado" />
          ))}
        </div>
      }
    }
    return (
      <div>
        <Snackbar open={this.state.openMensajeExito} autoHideDuration={2000} onClose={this.cerrarMensajeExito}>
          <Alert variant="filled" onClose={this.cerrarMensajeExito} severity={this.state.modoMensaje}>
            {this.state.MensajeExito}
          </Alert>
        </Snackbar>
        <main className='grid'>
          <div className='progress-bar-custom'>
            <span onClick={this.elegirEstadoBusqueda} className="estados" id="busqueda">Búsqueda</span>
            <span onClick={this.elegirEstadoPostulaciones} className="estados" id="postulaciones">Postulaciones</span>
            <span onClick={this.elegirEstadoAceptado} className="estados" id="aceptados">Aceptados</span>
            <span onClick={this.elegirEstadoEnProceso} className="estados" id="enproceso">En Proceso</span>
            <span onClick={this.elegirEstadoCompletado} className="estados" id="completados">Completados</span>
            <span onClick={this.elegirEstadoPuntuados} className="estados" id="puntuados">Puntuados</span>
          </div>
          <div className='track'>
            <div className='top'>
              <p id="temporales-titulo" className='ux'>Eventos Temporales - Búsqueda</p>
            </div>
            {filtros}
            {contenedorEventos}
          </div>
        </main>
        <Dialog
          open={this.state.openCortina}
          TransitionComponent={Transition}
          aria-labelledby="form-dialog-title"
        >
        </Dialog>
      </div>
    );
  }
}
