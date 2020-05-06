import React from 'react';
import '../App.css';

class TrabajoTarjeta extends React.Component {
    render() {    
        return (
            <div className='card'>
                <div className='top-library'>
                    <i className="fas fa-book-open book">{this.props.titulo}</i>
                </div>
                <div className='middle-library'>
                    <p className='type'>{this.props.tiempo}</p>
                    <h3 className='job-name'>{this.props.zona}</h3>
                    <p className='desc'>{this.props.descripcion}</p>
                    <button className='resume-btn'>Ver Detalle</button>
                </div>
            </div>
        );
    }
}

export default TrabajoTarjeta;