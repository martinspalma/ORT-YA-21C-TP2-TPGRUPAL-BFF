import express from 'express'
import Controlador from '../controlador/usuarioController.js'

class UsuarioRouter {
    #cb = null
    constructor(usuarioServicio, persistencia) {
        this.#cb = new Controlador(usuarioServicio, persistencia)
    }

    start() {
        const router = express.Router()
        //GET
        router.get('/:id?', this.#cb.obtenerUsuarios)
        //POST
        router.post('/', this.#cb.guardarUsuarios)
        router.post('/login', this.#cb.loginUsuario)
        //PUT
        router.put('/:id', this.#cb.actualizarUsuarios)
        //DELETE
        router.delete('/:id', this.#cb.borrarUsuarios)
        //------------------ SECTOR endpoint por default--------------------------
        router.use(this.#cb.porError)

        return router
    }
}
export default UsuarioRouter
