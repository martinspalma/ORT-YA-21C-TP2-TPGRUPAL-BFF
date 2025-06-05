
import JuegoServicio from '../servicio/juegoServicio.js'

class JuegoController {
  #servicio

  constructor(juegoServicio) {
    this.#servicio = juegoServicio
    this.#servicio.init()
  }

  unirseASala = async (req, res) => {
    try {
      const { id, usuario } = req.body
      const resultado = await this.#servicio.unirseOSumarJugador(id, usuario)
      res.json(resultado)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  ordenarCartas = async (req, res) => {
    try {
      const { id, nuevoOrden } = req.body
      const resultado = await this.#servicio.registrarOrdenCartas(id, nuevoOrden)
      res.json(resultado)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }

  jugarRonda = async (req, res) => {
    try {
      const resultado = await this.#servicio.enfrentarCartas()
      res.json(resultado)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }

  siguienteRonda = async (req, res) => {
    try {
      const resultado = await this.#servicio.avanzarRonda()
      res.json(resultado)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }

  obtenerSala = async (req, res) => {
    try {
      const sala = this.#servicio.obtenerSala()
      res.json(sala)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}

export default JuegoController
