import React, { useState, useRef } from 'react';
import axios from 'axios';
import CrearFichaMedica from './CrearFichaMedica'; // Asegúrate de que la ruta sea correcta
import FichaMedica from './FichaMedica';
import '../styles/buscarSocio.css';

const BuscarSocio = () => {
  const [cedula, setCedula] = useState('');
  const [nombres, setNombres] = useState('');
  const [socio, setSocio] = useState(null);
  const [error, setError] = useState(null);
  const [showCreateFicha, setShowCreateFicha] = useState(false); // Estado para mostrar el formulario de creación de ficha médica
  const [fichaMedica, setFichaMedica] = useState(null); // Estado para la ficha médica
  const [socios, setSocios] = useState([]);
  const handleCedulaChange = (e) => {
    setCedula(e.target.value);
  };

  const handleNombresChange = (e) => {
    setNombres(e.target.value);
  }

  const handleSeleccionarSocio = async (socioSeleccionado) => {
    setSocio(socioSeleccionado);
    setSocios([]);

    try {
      // Aquí podrías realizar una solicitud para obtener la ficha médica del socio seleccionado
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/ficha/${socioSeleccionado.cedula}`);
      const socioDetalles = response.data;

      // Ahora guardas la ficha médica en el estado
      setFichaMedica(socioDetalles);
  } catch (error) {
      if (error.response && error.response.status === 404) {
          // Si no se encuentra la ficha médica, puedes preguntar si desea crear una nueva
          const confirmCreate = window.confirm('El socio no tiene una ficha médica. ¿Desea crear una nueva?');
          if (confirmCreate) {
              setShowCreateFicha(true);
          }
      } else {
          console.error('Error al obtener detalles del socio: ', error);
          setError('Error al obtener detalles del socio');
      }
  }

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSocio(null);
    setFichaMedica(null); // Reseteamos la ficha médica
    setError(null);
    setShowCreateFicha(false);
    
    if (!cedula.trim() && nombres === '') {
      setError('Por favor, ingrese los nombres o el número de cédula');
      return;
    }

    let datosConsulta = cedula ? `${cedula}` : `${nombres}`;

    try {
      // Realizamos la solicitud para obtener el socio
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/socios/${datosConsulta}`);
      const socioData = response.data;

      if (Array.isArray (socioData)) {
        setSocios(socioData);
        return; //Detener la ejecución para que seleccione uno
      }

      else {
        setSocio(socioData);
        setNombres('');
      }
    
      // Ahora verificamos si tiene una ficha médica
      try {
        const fichaData = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/ficha/${cedula}`);
        setFichaMedica(fichaData.data); // Si la ficha médica existe, la guardamos en el estado
        console.log(fichaMedica);
      } catch (fichaError) {
        if (fichaError.response && fichaError.response.status === 404) {
          // Preguntamos al usuario si desea crear una nueva ficha médica
          const confirmCreate = window.confirm('El socio no tiene una ficha médica. ¿Desea crear una nueva?');
          if (confirmCreate) {
            setShowCreateFicha(true);
          }
        } else {
          console.error('Error al obtener la ficha médica:', fichaError);
          setError('Error al obtener la ficha médica');
        }
      }

    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError('El socio con esos datos no existe.')
      } else {
        console.error('Error al obtener el socio:', error);
        setError('No se pudo obtener la información del socio');
      }
      setSocio(null);
    }
  };


  return (
    <div className='form-container'>
      <form className='form' onSubmit={handleSubmit}>
        {/* Campo de entrada para los nombres*/}
        <div className='form__input-container'>
          <label>Nombres:</label>
          <input 
            className='form__input'
            type='text'
            name='nombres'
            value={nombres}
            onChange={handleNombresChange}
            placeholder='Ingrese los nombres'
            disabled={cedula !== ''}
          />
        </div>
        {/* Campo de entrada para la cédula */}
        <div className='form__input-container'>
          <label>Cédula:</label>
          <input
            className='form__input'
            type='text'
            name='cedula'
            value={cedula}
            onChange={handleCedulaChange}
            disabled={nombres !== ''}
            placeholder="Ingrese la cédula"
            minLength={10}
            maxLength={13}
          />
        <button className='form__button' type="submit">Consultar</button>
        </div>
      </form>

      {error && <p className="form__error">{error}</p>}

      {socios.length > 0 && (
        <ul>
          {socios.map((socio, index) => (
            <li key={index} onClick={() => {handleSeleccionarSocio(socio)}}>
              {socio.nombres} - {socio.cedula}</li>
          ))}
        </ul>
      )}



      {socio && showCreateFicha && (
        <CrearFichaMedica cedula={socio.cedula} setShowCreateFicha={setShowCreateFicha} socio={socio} />
      )}

      {socio && fichaMedica && (
        <FichaMedica fichaMedica={fichaMedica} socio={socio} />
      )}
    </div>
  );
};

export default BuscarSocio;
