import ServicioCartas from '../servicio/cartaServicio.js'

class CartaController {
 #servicio

    constructor(persistencia) {
        this.#servicio = new ServicioCartas(persistencia)
    }


    obtenerCartas = async (req, res) => {
        const { id } = req.params
        const data = id
            ? await this.#servicio.obtenerCarta(id)
            : await this.#servicio.obtenerCartas()
        res.json(data)
    }

    guardarCarta = async (req, res) => {
        const carta = req.body
        const nueva = await this.#servicio.guardarCarta(carta)
        res.json(nueva)
    }

    actualizarCarta = async (req, res) => {
        const { id } = req.params
        const datos = req.body
        const actualizada = await this.#servicio.actualizarCarta(id, datos)
        res.json(actualizada)
    }

    borrarCarta = async (req, res) => {
        const { id } = req.params
        const borrada = await this.#servicio.borrarCarta(id)
        res.json(borrada)
    }
}

export default CartaController