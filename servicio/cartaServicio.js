import ModelFactory from '../model/DAO/factory.js'

class ServicioCartas {
    #model
     
    constructor(persistencia) {
        this.#model = ModelFactory.get(persistencia, 'cartas')

    }

    obtenerCartas = async (id) => {
        if (id) {
            const carta = await this.#model.obtenerCarta(id)
            return carta || {}
        }
        else {
            return await this.#model.obtenerCartas()
        }
    }

    guardarCarta = async (carta) => await this.#model.guardarCarta(carta)

    actualizarCarta = async (id, datos) => await this.#model.actualizarCarta(id, datos)

    borrarCarta = async (id) => await this.#model.borrarCarta(id)
}

export default ServicioCartas