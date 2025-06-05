import { EventEmitter } from 'events'
import ModelFactory from '../model/DAO/factory.js'
import { v4 as uuidv4 } from 'uuid'

class JuegoServicio extends EventEmitter {
  #persistencia
  #sala = null

  constructor(juegoServicio) {
    super()
    this.#persistencia = juegoServicio
  }

  async init() {
    this.#sala = await this.#persistencia.cargarSala()
    if (!this.#sala) {
      this.#sala = {
        id: 'sala-unica',
        jugadores: [],
        comenzado: false,
        ronda: 1,
        finalizada: false,
        resultado: null,
        estado: 'esperando-jugadores'
      }
      await this.#persistencia.guardarSala(this.#sala)
    }
    this.emit('estadoActualizado', this.#sala) // Emitir al inicializar
  }

  async unirseOSumarJugador(id, usuario) {
    const sala = this.#sala
    if (sala.jugadores.length >= 2) {
      throw new Error('La sala ya tiene dos jugadores')
    }

    const jugadorExistente = sala.jugadores.find(j => j.id === id)
    if (jugadorExistente) {
      return { mensaje: ` ${usuario} Ya estás en la sala`, sala }
    }

    sala.jugadores.push({
      id,
      usuario,
      cartas: [],
      ordenadas: false,
      historial: []
    })

    if (sala.jugadores.length === 2) {
      this.#repartirCartas(sala)
      sala.estado = 'esperando-orden'
    }

    await this.#persistencia.guardarSala(sala)
    this.emit('estadoActualizado', sala)
    return { mensaje: ` ${usuario} fue añadido a la sala`, sala }
  }

  #repartirCartas(sala) {
    const tipos = ['piedra', 'papel', 'tijera']
    const generarCartas = () => {
      const cartas = []
      for (let i = 0; i < 9; i++) {
        const tipo = tipos[Math.floor(Math.random() * tipos.length)]
        cartas.push({ id: uuidv4(), tipo })
      }
      return cartas
    }

    sala.jugadores.forEach(j => {
      j.cartas = generarCartas()
      j.ordenadas = false
    })
    sala.comenzado = false
  }

  async registrarOrdenCartas(id, nuevoOrden) {
    const sala = this.#sala
    const jugador = sala.jugadores.find(j => j.id === id)

    const idsOriginales = jugador.cartas.map(c => c.id)
    if (nuevoOrden.length !== idsOriginales.length) {
      throw new Error('Debe ordenar todas las cartas')
    }

    jugador.cartas = nuevoOrden.map(id => jugador.cartas.find(c => c.id === id))
    jugador.ordenadas = true

    if (sala.jugadores.every(j => j.ordenadas)) {
      sala.estado = 'cartas-ordenadas'
    }

    await this.#persistencia.guardarSala(sala)
    this.emit('estadoActualizado', sala)
    return { mensaje: 'Orden registrado correctamente', sala }
  }

  async enfrentarCartas() {
    const sala = this.#sala
    if (sala.estado !== 'cartas-ordenadas') {
      throw new Error('La sala no está lista para jugar')
    }

    const [j1, j2] = sala.jugadores
    let puntajeJ1 = 0
    let puntajeJ2 = 0

    for (let i = 0; i < 9; i++) {
      const c1 = j1.cartas[i].tipo
      const c2 = j2.cartas[i].tipo
      const resultado = this.#resultadoMano(c1, c2)
      if (resultado === 1) puntajeJ1++
      if (resultado === 2) puntajeJ2++
    }

    sala.resultado = { [j1.id]: puntajeJ1, [j2.id]: puntajeJ2 }
    sala.estado = 'partida-finalizada'
    await this.#persistencia.guardarSala(sala)
    this.emit('estadoActualizado', sala)

    return sala.resultado
  }

  #resultadoMano(c1, c2) {
    const reglas = { piedra: 'tijera', tijera: 'papel', papel: 'piedra' }
    if (c1 === c2) return 0
    if (reglas[c1] === c2) return 1
    return 2
  }

  async avanzarRonda() {
    const sala = this.#sala
    if (sala.estado !== 'partida-finalizada') {
      throw new Error('No se puede avanzar: la partida no terminó.')
    }

    const [j1, j2] = sala.jugadores
    const ronda = sala.ronda
    j1.historial.push({ ronda, puntaje: sala.resultado[j1.id] })
    j2.historial.push({ ronda, puntaje: sala.resultado[j2.id] })

    if (ronda >= 3) {
      const totalJ1 = j1.historial.reduce((acc, r) => acc + r.puntaje, 0)
      const totalJ2 = j2.historial.reduce((acc, r) => acc + r.puntaje, 0)
      let ganador = 'empate'
      if (totalJ1 > totalJ2) ganador = j1.id
      else if (totalJ2 > totalJ1) ganador = j2.id

      sala.estado = 'juego-finalizado'
      sala.ganador = ganador
      sala.finalizada = true

      await this.#persistencia.guardarSala(sala)
      this.emit('estadoActualizado', sala)

      return {
        mensaje: 'Juego finalizado',
        ganador,
        historial: { [j1.id]: j1.historial, [j2.id]: j2.historial }
      }
    }

    sala.ronda += 1
    sala.resultado = null
    sala.comenzado = false
    sala.estado = 'esperando-orden'

    this.#repartirCartas(sala)
    await this.#persistencia.guardarSala(sala)
    this.emit('estadoActualizado', sala)

    return { mensaje: 'Ronda siguiente creada', ronda: sala.ronda }
  }

  async obtenerSala() {
    return this.#sala
  }
}

export default JuegoServicio
