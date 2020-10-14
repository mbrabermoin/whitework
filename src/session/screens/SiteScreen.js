import React from 'react';
import aceptar from "../../logos/aceptar-evento.png";
import crear from "../../logos/crear-evento.png";
import buscar from "../../logos/buscar-evento.png";
import valorar from "../../logos/valorar-trabajo.png";
import esperar from "../../logos/esperar.png";
import ww from '../../logos/wwsp.png';
class SiteScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "main",
    }
  }
  componentDidMount() {
    // document.getElementById("paginaPrincipal-li").style.color = "#eeeeee";
    document.getElementById("usuarios-li").style.color = "#b2bbbd";
    document.getElementById("prestadores-li").style.color = "#b2bbbd";
    //document.getElementById("quienessomos-li").style.display = "#b2bbbd";
    this.setState({ display: "main" });
  }
  mostrarMain = () => {
    // document.getElementById("paginaPrincipal-li").style.color = "#eeeeee";
    document.getElementById("usuarios-li").style.color = "#b2bbbd";
    document.getElementById("prestadores-li").style.color = "#b2bbbd";
    //document.getElementById("quienessomos-li").style.display = "#b2bbbd";
    this.setState({ display: "main" });
  }
  mostrarTareasEmpleado = () => {
    // document.getElementById("paginaPrincipal-li").style.color = "#b2bbbd";
    document.getElementById("usuarios-li").style.color = "#b2bbbd";
    document.getElementById("prestadores-li").style.color = "#eeeeee";
    //document.getElementById("quienessomos-li").style.display = "#b2bbbd";
    this.setState({ display: "empleado" });
  }
  mostrarTareasEmpleador = () => {
    // document.getElementById("paginaPrincipal-li").style.color = "#b2bbbd";
    document.getElementById("usuarios-li").style.color = "#eeeeee";
    document.getElementById("prestadores-li").style.color = "#b2bbbd";
    //document.getElementById("quienessomos-li").style.display = "#b2bbbd";
    this.setState({ display: "empleador" });
  }
  render() {
    var display = "";
    var tareas = "";
    if (this.state.display === "main") {
      display = <div id="foto-institucional">
        <img alt="trabajadores" src="https://controlpublicidad.com/uploads/2019/09/empleados-contentos-120254.jpg"></img>
      </div>
    } else {
      if (this.state.display === "empleado") {
        tareas = <div className="col">
          <ul className="task-list" id="empleado-tareas">
            <li>
              <div className="tarjeta">
                <img className="foto-trabajo" src={buscar} alt="persona" />
                <div className="content-tarea">
                  <h2>1. Buscar Trabajo</h2>
                  <h3>Podrás buscar el trabajo al que deseas postularte.</h3>
                </div>
              </div>
            </li>
            <li>
              <div className="tarjeta">
                <img className="foto-trabajo" src={esperar} alt="persona" />
                <div className="content-tarea">
                  <h2>2. Esperar aceptación</h2>
                  <h3>Momento de esperar a que tu postulación sea aceptada.</h3>
                </div>
              </div>
            </li>
            <li>
              <div className="tarjeta">
                <img className="foto-trabajo" src={valorar} alt="persona" />
                <div className="content-tarea">
                  <h2>3. Puntuar a tu empleador</h2>
                  <h3>Podrás colocar puntuación sobre el trato recibido por tu empleador.</h3>
                </div>
              </div>
            </li>
          </ul>
        </div>
      } else {
        tareas = <div className="col">
          <ul className="task-list" id="empleador-tareas">
            <li>
              <div className="tarjeta">
                <img className="foto-trabajo" src={crear} alt="persona" />
                <div className="content-tarea">
                  <h2>1. Crear Evento</h2>
                  <h3>Definir fecha, trabajo y pagos.</h3>
                </div>
              </div>
            </li>
            <li>
              <div className="tarjeta">
                <img className="foto-trabajo" src={esperar} alt="persona" />
                <div className="content-tarea">
                  <h2>2. Esperar postulantes</h2>
                  <h3>Momento de esperar a quienes quieran trabajar en tus eventos.</h3>
                </div>
              </div>
            </li>
            <li>
              <div className="tarjeta">
                <img className="foto-trabajo" src={aceptar} alt="persona" />
                <div className="content-tarea">
                  <h2>3. Aceptar postulantes</h2>
                  <h3>Aceptar o rechazar a los postulantes.</h3>
                </div>
              </div>
            </li>
            <li>
              <div className="tarjeta">
                <img className="foto-trabajo" src={valorar} alt="persona" />
                <div className="content-tarea">
                  <h2>4. Puntuar </h2>
                  <h3>Una vez que el trabajo se ha consumado, podrás puntuar al trabajador.</h3>
                </div>
              </div>
            </li>
          </ul>
        </div>
      }
    }
    return (
      <div className="App">
        <nav className='navbar'>
          <ul className="left-ui">
            <li><div id="logo"><img className='logo' alt="log" src={ww} /></div></li>
            <li className='home headers-main' onClick={this.mostrarMain}>WHITEWORK</li>
            {/* <li id="paginaPrincipal-li" className="headers-main" onClick={this.mostrarMain}>Pagina Principal</li> */}
            <li id="prestadores-li" className="headers-main" onClick={this.mostrarTareasEmpleado}>Modo Prestador</li>
            <li id="usuarios-li" className="headers-main" onClick={this.mostrarTareasEmpleador}>Modo Empleador</li>
            {/*<li id="quienessomos-li" onClick="">¿Quienes Somos?</li>*/}

          </ul>
          <ul className='right-ui nombre-usuario'>
            <li id="registrate-li" onClick={this.props.abrirLogin}>Registrate</li>
            <li id="ingresar-li" onClick={this.props.abrirLogin}>Ingresar</li>
          </ul>
        </nav>
        {display}
        <div className="container">
          <div className="row">
            {tareas}
            <footer id="red">
              <h3 className="text">WHITEWORK</h3>
              <h4 className="text2">&copy;	Brabermoin&Fernandez</h4>
            </footer>
          </div>
        </div>
      </div>
    );
  }
}

export default SiteScreen;