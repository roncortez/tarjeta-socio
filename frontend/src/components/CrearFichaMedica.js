import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/crearFichaMedica.css'; // Asegúrate de que la ruta sea correcta

const CrearFichaMedica = ({ cedula, setShowCreateFicha, socio }) => {
  const [tiposSangre, setTiposSangre] = useState([]);
  const [factoresActividad, setFactoresActividad] = useState([]);
  const [tipoSangre, setTipoSangre] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [factorActividad, setFactorActividad] = useState('');
  const [diabetes, setDiabetes] = useState(false);
  const [hipertension, setHipertension] = useState(false);
  const [fracturas, setFracturas] = useState(false);
  const [hernias, setHernias] = useState(false);
  const [convulsiones, setConvulsiones] = useState(false);
  const [alergias, setAlergias] = useState('');
  const [medicamentos, setMedicamentos] = useState('');
  const [enfermedades, setEnfermedades] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [discapacidadFisica, setDiscapacidadFisica] = useState(false);
  const [atencionEspecial, setAtencionEspecial] = useState(false);
  const [calendarioVacunacionCompleto, setCalendarioVacunacionCompleto] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    switch (id) {
      case 'tipo_sangre':
        setTipoSangre(value);
        break;
      case 'peso':
        setPeso(value);
        break;
      case 'altura':
        setAltura(value);
        break;
      case 'factor_actividad':
        setFactorActividad(value);
        break;
      case 'diabetes':
        setDiabetes(checked);
        break;
      case 'hipertension':
        setHipertension(checked);
        break;
      case 'fracturas':
        setFracturas(checked);
        break;
      case 'hernias':
        setHernias(checked);
        break;
      case 'convulsiones':
        setConvulsiones(checked);
        break;
      case 'alergias':
        setAlergias(value);
        break;
      case 'medicamentos':
        setMedicamentos(value);
        break;
      case 'enfermedades':
        setEnfermedades(value);
        break;
      case 'observaciones':
        setObservaciones(value);
        break;
      case 'discapacidad_fisica':
        setDiscapacidadFisica(checked);
        break;
      case 'atencion_especial':
        setAtencionEspecial(checked);
        break;
      case 'calendario_vacunacion_completo':
        setCalendarioVacunacionCompleto(checked);
        break;
      default:
        break;
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/ficha`, {
        cedula,
        tipo_sangre: tipoSangre,
        peso,
        altura,
        factor_actividad: factorActividad,
        convulsiones,
        alergias,
        medicamentos,
        enfermedades,
        observaciones,
        discapacidad_fisica: discapacidadFisica,
        atencion_especial: atencionEspecial,
        calendario_vacunacion_completo: calendarioVacunacionCompleto,
        diabetes,
        hipertension,
        fracturas,
        hernias,
      });
      alert('Ficha médica creada exitosamente.');
      setShowCreateFicha(false);
    } catch (error) {
      console.error('Error al crear la ficha médica:', error);
      setError('No se pudo crear la ficha médica.');
    }
  };


  useEffect(() => {
    const fetchTiposSangre = async () => {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/tipos-sangre`);
      setTiposSangre(response.data);
    }

    fetchTiposSangre();
  }, [])

  useEffect(() => {
    const fetchFactoresActividad = async () => {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/factores-actividad`);
      setFactoresActividad(response.data);
    }

    fetchFactoresActividad();
  }, [])

  return (
    <div className="crear-ficha-medica">
      <h2 className='crear-ficha-medica__titulo'>CREAR FICHA MÉDICA</h2>
      <form className="crear-ficha-medica__form" onSubmit={handleSubmit}>
        <p>{socio.nombres}</p>
        <p>{socio.cedula}</p>
        {/* Información Básica */}
        <section className="crear-ficha-medica__seccion crear-ficha-medica__seccion--basica">
          <h4 className="crear-ficha-medica__subtitulo">Información Básica</h4>

          <div className="crear-ficha-medica__campo">
            <label htmlFor="tipo_sangre" className="crear-ficha-medica__label">Tipo de Sangre:</label>
            <select
              id="tipo_sangre"
              className='crear-ficha-medica__input'
              value={tipoSangre}
              onChange={handleChange} // Actualiza el estado con el valor seleccionado
              required
            >
              <option value=''>Seleccione el tipo de sangre</option>
              {tiposSangre.map(tipo => (
                <option key={tipo.id} value={tipo.tipo_sangre}>{tipo.tipo_sangre}</option>
              ))}
            </select>
          </div>

          <div className="crear-ficha-medica__campo">
            <label htmlFor="peso" className="crear-ficha-medica__label">Peso(lb):</label>
            <input
              type="number"
              id="peso"
              value={peso}
              onChange={handleChange}
              placeholder="Ingrese el peso. (Ejm: 165.2)"
              className="crear-ficha-medica__input"
              required
            />
          </div>

          <div className="crear-ficha-medica__campo">
            <label htmlFor="altura" className="crear-ficha-medica__label">Altura(m):</label>
            <input
              type="number"
              id="altura"
              value={altura}
              onChange={handleChange}
              placeholder="Ingrese altura. (Ejm: 1.65)"
              className="crear-ficha-medica__input"
              required
            />
          </div>
          <div className="crear-ficha-medica__campo">
            <label htmlFor="factor_actividad" className="crear-ficha-medica__label">Factor de actividad:</label>
            <select
              id="factor_actividad"  
              className='crear-ficha-medica__input'
              value={factorActividad}
              onChange={handleChange}
              required
            >
              <option value=''>Seleccione el factor de actividad</option>
              {factoresActividad.map(factor => (
                <option key={factor.id} value={factor.nombre}>{factor.nombre} - {factor.descripcion}</option>
              ))}
            </select>
          </div>
        </section>

        {/* Enfermedades y padecimientos */}
        <section className="crear-ficha-medica__seccion crear-ficha-medica__seccion--enfermedades">
          <h4 className="crear-ficha-medica__subtitulo">Enfermedades y padecimientos</h4>

          <div className="crear-ficha-medica__campo">
            <label htmlFor="diabetes" className="crear-ficha-medica__label">¿Diabetes?:</label>
            <input
              type="checkbox"
              id="diabetes"
              checked={diabetes}
              onChange={handleChange}
              className="crear-ficha-medica__checkbox"
            />
          </div>

          <div className="crear-ficha-medica__campo">
            <label htmlFor="hipertension" className="crear-ficha-medica__label">¿Hipertensión?:</label>
            <input
              type="checkbox"
              id="hipertension"
              checked={hipertension}
              onChange={handleChange}
              className="crear-ficha-medica__checkbox"
            />
          </div>

          <div className="crear-ficha-medica__campo">
            <label htmlFor="fracturas" className="crear-ficha-medica__label">¿Fracturas?:</label>
            <input
              type="checkbox"
              id="fracturas"
              checked={fracturas}
              onChange={handleChange}
              className="crear-ficha-medica__checkbox"
            />
          </div>

          <div className="crear-ficha-medica__campo">
            <label htmlFor="hernias" className="crear-ficha-medica__label">¿Hernias?:</label>
            <input
              type="checkbox"
              id="hernias"
              checked={hernias}
              onChange={handleChange}
              className="crear-ficha-medica__checkbox"
            />
          </div>

          <div className="crear-ficha-medica__campo">
            <label htmlFor="convulsiones" className="crear-ficha-medica__label">Convulsiones:</label>
            <input
              type="checkbox"
              id="convulsiones"
              checked={convulsiones}
              onChange={handleChange}
              className="crear-ficha-medica__checkbox"
            />
          </div>
        </section>

        {/* Alergias y Medicamentos */}
        <section className="crear-ficha-medica__seccion crear-ficha-medica__seccion--alergias">
          <h4 className="crear-ficha-medica__subtitulo">Alergias y Medicamentos</h4>

          <div className="crear-ficha-medica__campo">
            <label htmlFor="alergias" className="crear-ficha-medica__label">Alergias:</label>
            <input
              type="text"
              id="alergias"
              value={alergias}
              onChange={handleChange}
              placeholder="Ingrese alergias"
              className="crear-ficha-medica__input"
            />
          </div>

          <div className="crear-ficha-medica__campo">
            <label htmlFor="medicamentos" className="crear-ficha-medica__label">Medicamentos:</label>
            <input
              type="text"
              id="medicamentos"
              value={medicamentos}
              onChange={handleChange}
              placeholder="Ingrese medicamentos"
              className="crear-ficha-medica__input"
            />
          </div>
        </section>

        {/* Historial Médico */}
        <section className="crear-ficha-medica__seccion crear-ficha-medica__seccion--historial">
          <h4 className="crear-ficha-medica__subtitulo">Historial Médico</h4>

          <div className="crear-ficha-medica__campo">
            <label htmlFor="enfermedades" className="crear-ficha-medica__label">Enfermedades:</label>
            <input
              type="text"
              id="enfermedades"
              value={enfermedades}
              onChange={handleChange}
              placeholder="Ingrese enfermedades"
              className="crear-ficha-medica__input"
            />
          </div>

          <div className="crear-ficha-medica__campo">
            <label htmlFor="observaciones" className="crear-ficha-medica__label">Observaciones:</label>
            <input
              type="text"
              id="observaciones"
              value={observaciones}
              onChange={handleChange}
              placeholder="Ingrese observaciones"
              className="crear-ficha-medica__input"
            />
          </div>
        </section>

        {/* Condiciones Especiales */}
        <section className="crear-ficha-medica__seccion crear-ficha-medica__seccion--condiciones">
          <h4 className="crear-ficha-medica__subtitulo">Condiciones Especiales</h4>

          <div className="crear-ficha-medica__campo">
            <label htmlFor="discapacidad_fisica" className="crear-ficha-medica__label">¿Discapacidad Física?:</label>
            <input
              type="checkbox"
              id="discapacidad_fisica"
              checked={discapacidadFisica}
              onChange={handleChange}
              className="crear-ficha-medica__checkbox"
            />
          </div>

          <div className="crear-ficha-medica__campo">
            <label htmlFor="atencion_especial" className="crear-ficha-medica__label">¿Atención Especial?:</label>
            <input
              type="checkbox"
              id="atencion_especial"
              checked={atencionEspecial}
              onChange={handleChange}
              className="crear-ficha-medica__checkbox"
            />
          </div>

          <div className="crear-ficha-medica__campo">
            <label htmlFor="calendario_vacunacion_completo" className="crear-ficha-medica__label">¿Calendario de Vacunación Completo?:</label>
            <input
              type="checkbox"
              id="calendario_vacunacion_completo"
              checked={calendarioVacunacionCompleto}
              onChange={handleChange}
              className="crear-ficha-medica__checkbox"
            />
          </div>
        </section>

        <button type="submit" className="crear-ficha-medica__btn">Enviar</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default CrearFichaMedica;
