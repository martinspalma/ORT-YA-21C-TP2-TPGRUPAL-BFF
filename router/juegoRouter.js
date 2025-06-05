import express from 'express'
import JuegoController from '../controlador/juegoController.js'

class JuegoRouter {
  #cb

  constructor(juegoServicio) {
    this.#cb = new JuegoController(juegoServicio)
  }

  start() {
    const router = express.Router()

    router.post('/unirse', this.#cb.unirseASala)
    router.post('/ordenar', this.#cb.ordenarCartas)
    router.post('/jugar', this.#cb.jugarRonda)
    router.post('/siguiente', this.#cb.siguienteRonda)
    router.get('/sala', this.#cb.obtenerSala)

    return router
  }
}

export default JuegoRouter
