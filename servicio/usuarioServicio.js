import ModelFactory from '../model/DAO/factory.js'
import { validar, validarActualizacion } from './validaciones/usuarios.js'


class Servicio {
   
    #model
    constructor(persistencia) {
        this.#model = ModelFactory.get(persistencia, 'usuarios')

    }

    obtenerUsuarios = async (id) => {
        if (id) {
            const usuario = await this.#model.obtenerUsuario(id)
            return usuario || {}
        }
        else {
            return await this.#model.obtenerUsuarios()
        }
    }

    guardarUsuarios = async (usuario) => {   
        
        const val = validar(usuario)
        if (val.result) {
            const usuarioNuevo = await this.#model.guardarUsuarios(usuario)
            return usuarioNuevo
        }
        else {
            throw new Error(val.error.details[0].message)
        }
    }

    actualizarUsuarios = async (id, usuario) => {
        const val = validarActualizacion(usuario)
        if (val.result) {
            const usuarioActualizado = await this.#model.actualizarUsuarios(id, usuario)
            return usuarioActualizado
        }
        else {
            throw new Error(val.error.details[0].message)
        }
    }

    borrarUsuarios = async (id) => {
        const eliminado = await this.#model.borrarUsuarios(id)

        return eliminado
    }
loginUsuario = async (usuarioIngresado, contraseniaIngresada) => {
    const usuarios = await this.#model.obtenerUsuarios()

    const usuarioEncontrado = usuarios.find(u => u.usuario === usuarioIngresado)

    if (!usuarioEncontrado) {
        throw new Error('Usuario no encontrado')
    }

    if (usuarioEncontrado.contrasenia !== contraseniaIngresada) {
        throw new Error('Contraseña incorrecta')
    }

    const { contrasenia, ...datosPublicos } = usuarioEncontrado
    return datosPublicos
}


}

export default Servicio