import CnxMongoDB from "../DBMongo.js"
import { UsuarioModel } from "./models/usuarios.js"

class ModelMongoDBUsuarios {
    constructor() { }

    obtenerUsuarios = async () => {
        if (!CnxMongoDB.connectionOK) throw new Error('ERROR CNX BASE DE DATOS!!!')

        const usuarios = await UsuarioModel.find()
        return usuarios
    }

    obtenerUsuario = async id => {
        if (!CnxMongoDB.connectionOK) throw new Error('ERROR CNX BASE DE DATOS!!!')
        const usuario = await UsuarioModel.findOne({ _id: id })
        return usuario
    }

    guardarUsuarios = async usuario => {
        if (!CnxMongoDB.connectionOK) throw new Error('ERROR CNX BASE DE DATOS!!!')

        const usuarioModel = new UsuarioModel(usuario)
        const guardado = await usuarioModel.save()
        return guardado
    }

    actualizarUsuarios = async (id, usuario) => {
        if (!CnxMongoDB.connectionOK) throw new Error('ERROR CNX BASE DE DATOS!!!')

        await UsuarioModel.updateOne({ _id: id }, { $set: usuario })
        const actualizado = await this.obtenerUsuario(id)
        return actualizado
    }

// --- NUEVO MÉTODO: Para incrementar estadísticas de usuario en MongoDB ---
    actualizarEstadisticas = async (id, updates) => {
         if (!CnxMongoDB.connectionOK) throw new Error('ERROR CNX BASE DE DATOS!!!')

        try {
            // Usamos UsuarioModel directamente para la operación atómica de incremento ($inc)
            // 'updates' contendrá { wins: 1 }, { losses: 1 }, o { draws: 1 }
            const updatedUser = await UsuarioModel.findByIdAndUpdate(
                id,
                { $inc: updates }, // Usa $inc para incrementar los campos
                { new: true } // Retorna el documento actualizado
            );

            if (!updatedUser) {
                console.warn(`[UsuarioServicio] Usuario con ID ${userId} no encontrado para actualizar estadísticas.`);
                return null;
            }
            console.log(`[UsuarioServicio] Estadísticas actualizadas para usuario ${userId}:`, updatedUser.wins, updatedUser.losses, updatedUser.draws);
            return updatedUser;

        } catch (error) {
            console.error(`[UsuarioServicio] Error al actualizar estadísticas del usuario ${userId}:`, error);
            
        }
    }
    

    borrarUsuarios = async id => {
        if (!CnxMongoDB.connectionOK) throw new Error('ERROR CNX BASE DE DATOS!!!')

        const borrado = await this.obtenerUsuario(id)
        await UsuarioModel.deleteOne({ _id: id })
        return borrado
    }
}

export default ModelMongoDBUsuarios