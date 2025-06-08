import { EventEmitter } from 'events'

import { inicializarSala } from './modulosJuego/salaManager.js'
import { agregarJugador, ordenarCartas } from './modulosJuego/jugadoresManager.js'
import { repartirCartas } from './modulosJuego/cartasManager.js'
import { enfrentarCartas, avanzarRonda } from './modulosJuego/rondaManager.js'

class JuegoServicio extends EventEmitter {
  #persistencia
  #sala = null

  constructor(juegoPersistencia) {
    super()
    this.#persistencia = juegoPersistencia
  }

  async init() {
    this.#sala = await inicializarSala(this.#persistencia)
    this.emit('estadoActualizado', this.#sala) // Emitir al inicializar
  }


  async unirseOSumarJugador(id, usuario) {
    const resultado = await agregarJugador(this.#sala, id, usuario, this.#persistencia)
    this.emit('estadoActualizado', this.#sala)
    return resultado
  }

  async registrarOrdenCartas(id, nuevoOrden) {
    const resultado = await ordenarCartas(this.#sala, id, nuevoOrden, this.#persistencia)
    this.emit('estadoActualizado', this.#sala)
    return resultado
  }

  async enfrentarCartas() {
    if (this.#sala.estado !== 'cartas-ordenadas') {
      throw new Error('La sala no está lista para jugar')
    }

    const resultado = await enfrentarCartas(this.#sala, this.#persistencia)
    this.emit('estadoActualizado', this.#sala)
    return resultado
  }

  async avanzarRonda() {
    if (this.#sala.estado !== 'partida-finalizada') {
      throw new Error('No se puede avanzar: la partida no terminó.')
    }

    const resultado = await avanzarRonda(this.#sala, this.#persistencia, repartirCartas)
    this.emit('estadoActualizado', this.#sala)
    return resultado
  }

  async obtenerSala() {
    return this.#sala
  }
}

export default JuegoServicio

