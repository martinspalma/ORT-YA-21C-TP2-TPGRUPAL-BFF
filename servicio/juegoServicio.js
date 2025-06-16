import { EventEmitter } from 'events'
//import ModelFactory from '../model/DAO/factory.js'
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
    this.#emitirEstadoActualizado()
  }


  async unirseOSumarJugador(id, usuario, socketId) {
    const resultado = await agregarJugador(this.#sala, id, usuario, socketId, this.#persistencia)
    this.#emitirEstadoActualizado()
    return resultado
  }

  async registrarOrdenCartas(id, nuevoOrden) {
    const resultado = await ordenarCartas(this.#sala, id, nuevoOrden, this.#persistencia)
    this.#emitirEstadoActualizado()
    return resultado
  }

  async enfrentarCartas() {
    if (this.#sala.estado !== 'cartas-ordenadas') {
      throw new Error('La sala no está lista para jugar')
    }

    const resultado = await enfrentarCartas(this.#sala, this.#persistencia)
    this.#emitirEstadoActualizado()
    return resultado
  }

  async avanzarRonda() {
    if (this.#sala.estado !== 'partida-finalizada') {
      throw new Error('No se puede avanzar: la partida no terminó.')
    }

    const resultado = await avanzarRonda(this.#sala, this.#persistencia, repartirCartas)
    this.#emitirEstadoActualizado()
    return resultado
  }

  async obtenerSala() {
    return this.#sala
  }

  //metodo modularizado para emitir el estado
  #emitirEstadoActualizado() {

    this.emit('estadoActualizado', this.#sala);
    console.log(`JuegoServicio emitió 'estadoActualizado'. Estado actual: ${this.#sala.estado}`);
  }

  async manejarDesconexionJugador(disconnectedSocketId) {
    const jugadorDesconectado = this.#sala.jugadores.find(j => j.socketId === disconnectedSocketId);

    if (jugadorDesconectado) {
      console.log(`Jugador ${jugadorDesconectado.usuario} se ha desconectado.`);


      if (this.#sala.jugadores.length === 2 && this.#sala.estado !== 'juego-finalizado') {
        const jugadorRestante = this.#sala.jugadores.find(j => j.id !== jugadorDesconectado.id);
        if (jugadorRestante) {
          this.#sala.estado = 'juego-finalizado';
          this.#sala.ganador = jugadorRestante.id;
          this.#sala.finalizada = true;
          console.log(`El jugador ${jugadorRestante.usuario}  ha ganado por desconexión.`);
        }
      }
      this.#sala.jugadores = this.#sala.jugadores.filter(j => j.id !== jugadorDesconectado.id);
      console.log(`Jugador ${jugadorDesconectado.usuario} removido de la sala.`);

      await this.#persistencia.guardarSala(this.#sala);
      this.#emitirEstadoActualizado();
    } else {
      console.log(`Socket ID ${disconnectedSocketId} desconectado, pero no corresponde a un jugador activo en la sala.`);
    }
  }
}

export default JuegoServicio

