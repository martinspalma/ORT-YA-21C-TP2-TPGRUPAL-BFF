import JuegoServicio from './juegoServicio.js'
import persistenciaJuego from '../persistencias/modelFileJuego.js' // o como la instancies

const juegoServicio = new JuegoServicio(persistenciaJuego)

export default juegoServicio
