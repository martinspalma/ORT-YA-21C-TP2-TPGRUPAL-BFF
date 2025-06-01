import express from 'express'
import CartaController from '../controlador/cartaController.js'

class CartaRouter {
    #cb = null
    
     constructor(persistencia) {
        this.#cb = new CartaController(persistencia)
    }


    start() {
        const router = express.Router()
        router.get('/:id?', this.#cb.obtenerCartas)
        router.post('/', this.#cb.guardarCarta)
        router.put('/:id', this.#cb.actualizarCarta)
        router.delete('/:id', this.#cb.borrarCarta)
        return router
    }
}

export default CartaRouter