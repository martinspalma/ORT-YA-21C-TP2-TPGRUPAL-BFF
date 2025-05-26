import express from 'express'
import Controlador from '../controlador/jugadorController.js'

class Router {
#cb=null
constructor (persistencia){
    this.#cb = new Controlador(persistencia)
}

start (){
    const router = express.Router()
//GET
router.get('/:id?', this.#cb.obtenerJugadores)
//POST
router.post('/', this.#cb.guardarJugadores)
//PUT
router.put('/:id', this.#cb.actualizarJugadores)
//DELETE
router.delete('/:id', this.#cb.borrarJugadores)
//------------------ SECTOR endpoint por default--------------------------
router.use(this.#cb.porError)

return router
}
}
export default Router
