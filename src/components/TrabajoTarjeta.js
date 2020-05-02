import React from 'react';
import '../App.css';

class TrabajoTarjeta extends React.Component {
    render() {    
        return (
            <div class='card'>
                <div class='top-library'>
                    <i class="fas fa-book-open book">{this.props.titulo}</i>
                </div>
                <div class='middle-library'>
                    <p class='type'>{this.props.tiempo}</p>
                    <h3 class='job-name'>{this.props.zona}</h3>
                    <p class='desc'>{this.props.descripcion}</p>
                    <button class='resume-btn'>Ver Detalle</button>
                </div>
            </div>
        );
    }
}

export default TrabajoTarjeta;