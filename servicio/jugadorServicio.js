import ModelFactory from '../model/DAO/factory.js'
import { validar, validarActualizacion } from './validaciones/jugadores.js'


class Servicio{
#model
constructor(persistencia){
    this.#model = ModelFactory.get(persistencia)
    
}
 

obtenerJugadores = async (id) => {
    if(id) {
        const jugador = await this.#model.obtenerJugador(id)
        return jugador || {}
    }
    else {
        return await this.#model.obtenerJugadores()
    }
}

guardarJugador = async (jugador) => {
    jugador.fecha= new Date (jugador.fecha)
    
    const val= validar(jugador)
    if(val.result){
    const jugadorNuevo= await this.#model.guardarJugador(jugador)
    return jugadorNuevo
    }
    else{
        throw new Error(val.error.details[0].message)
    }
 }


actualizarJugadores = async (id, jugador) => {
    const val= validarActualizacion(jugador)
    if(val.result){
    const jugadorActualizado= await this.#model.actualizarjugadores(id, jugador)
    return jugadorActualizado
    }
    else{
        throw new Error(val.error.details[0].message)
    }
 }


borrarJugadores = async (id) => {
        const eliminado = await this.#model.borrarJugadores(id)
        
      return eliminado
    } 
   


}

export default Servicio