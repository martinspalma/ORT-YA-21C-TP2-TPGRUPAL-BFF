import Servicio from '../servicio/usuarioServicio.js'


class Controlador {
    #servicio
    constructor(persistencia) {
        this.#servicio = new Servicio(persistencia)
    }

    obtenerUsuarios = async (req, res) => {
        const { id } = req.params
        const usuario = await this.#servicio.obtenerUsuarios(id)
        res.json(usuario)
    }

    guardarUsuarios = async (req, res) => {
        try{
        const usuario = req.body
        const usuarioGuardado = await this.#servicio.guardarUsuarios(usuario)
        res.json(usuarioGuardado)
        }catch(error){
        res.status(500).json({error: error.message})
    }
    }

    actualizarUsuarios = async (req, res) => {
        try{
        const { id } = req.params
        const usuario = req.body
        const usuarioModificado = await this.#servicio.actualizarUsuarios(id, usuario)
        res.json(usuarioModificado)
        }catch(error){
        res.status(500).json({error: error.message})
    }
    }

    borrarUsuarios = async (req, res) => {
        const { id } = req.params
        const eliminado = await this.#servicio.borrarUsuarios(id)
        res.json(eliminado)
    }

    porError = (req, res) => {
        const { url: ruta, method: metodo } = req
        res.status(404).send(`<h1 style= "color:purple;"> Error:  ${metodo} ${ruta} no encontrada</h1>`)
    }

}

export default Controlador
