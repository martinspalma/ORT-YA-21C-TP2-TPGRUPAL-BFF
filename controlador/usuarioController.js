import Servicio from '../servicio/usuarioServicio.js'
import { obtenerPaisPorIP } from '../util/geolocalizacion.js'

class Controlador {
    #servicio
    constructor(usuarioServicio, persistencia) {
        this.#servicio = usuarioServicio
    }

    obtenerUsuarios = async (req, res) => {
        const { id } = req.params
        const usuario = await this.#servicio.obtenerUsuarios(id)
        res.json(usuario)
    }

    guardarUsuarios = async (req, res) => {
        try {
            const usuario = req.body
            const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.connection.remoteAddress
            const pais = await obtenerPaisPorIP(ip)
            usuario.pais = pais.nombre;
            usuario.codigoPais = pais.codigo;
    //console.log(`[usuarioController] País detectado:`, pais)
            const usuarioGuardado = await this.#servicio.guardarUsuarios(usuario)
            res.json(usuarioGuardado)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    actualizarUsuarios = async (req, res) => {
        try {
            const { id } = req.params
            const usuario = req.body
            const usuarioModificado = await this.#servicio.actualizarUsuarios(id, usuario)
            res.json(usuarioModificado)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    borrarUsuarios = async (req, res) => {
        const { id } = req.params
        const eliminado = await this.#servicio.borrarUsuarios(id)
        res.json(eliminado)
    }

    loginUsuario = async (req, res) => {
        try {
            const { usuario, contrasenia } = req.body
            const usuarioAutenticado = await this.#servicio.loginUsuario(usuario, contrasenia)
            res.json(usuarioAutenticado)
        } catch (error) {
            res.status(401).json({ error: error.message })
        }
    }


porError = (req, res) => {
    const { url: ruta, method: metodo } = req
    res.status(404).send(`<h1 style= "color:purple;"> Error:  ${metodo} ${ruta} no encontrada</h1>`)
}

}

export default Controlador
