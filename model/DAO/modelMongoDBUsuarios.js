import CnxMongoDB from "../DBMongo.js"
import { UsuarioModel } from "./models/usuarios.js"

class ModelMongoDBUsuarios {
    constructor() {}

    obtenerUsuarios = async () => {
        if(!CnxMongoDB.connectionOK) throw new Error('ERROR CNX BASE DE DATOS!!!')

        const usuarios = await UsuarioModel.find()
        return usuarios
    }

    obtenerUsuario = async id => {
        if(!CnxMongoDB.connectionOK) throw new Error('ERROR CNX BASE DE DATOS!!!')

        const usuario = await UsuarioModel.findOne({_id:id})
        return usuario
    }

    guardarUsuarios = async usuario => {
        if(!CnxMongoDB.connectionOK) throw new Error('ERROR CNX BASE DE DATOS!!!')
        
        const usuarioModel = new UsuarioModel(usuario)
        const guardado = await usuarioModel.save()
        return guardado
    }

    actualizarUsuarios = async (id, usuario) => {
        if(!CnxMongoDB.connectionOK) throw new Error('ERROR CNX BASE DE DATOS!!!')

        await UsuarioModel.updateOne({_id:id}, {$set: usuario})
        const actualizado = await this.obtenerUsuario(id)
        return actualizado
    }

    borrarUsuarios = async id => {
        if(!CnxMongoDB.connectionOK) throw new Error('ERROR CNX BASE DE DATOS!!!')

        const borrado = await this.obtenerUsuario(id)
        await UsuarioModel.deleteOne({_id: id})
        return borrado
    }
}

export default ModelMongoDBUsuarios