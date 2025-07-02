import ArchivoPersistencia from './archivoPersistencia.js'

class ModelFileUsuarios extends ArchivoPersistencia{
    

    constructor() {

        super('./data/usuarios.out')
    }

    obtenerUsuario = async (id) => {

        const usuarios = await this.leer()
        const usuarioBuscado = usuarios.find(u => u.id === id)
        return usuarioBuscado || {}
    }

    obtenerUsuarios = async () => {
        return await this.leer() || {}
    }

    guardarUsuarios = async (usuario) => {
        const usuarios = await this.leer()
        usuario.id = String(parseInt(usuarios[usuarios.length - 1]?.id || 0) + 1)
        usuarios.push(usuario)
        await this.escribir(usuarios)
        return usuario
    }

    actualizarUsuarios = async (id, usuario) => {
        const usuarios = await this.leer()
        const index = usuarios.findIndex(u => u.id === id)

        if (index != -1) {
            const usuarioAnterior = usuarios[index]
            const usuarioActualizado = { ...usuarioAnterior, ...usuario }
            usuarios.splice(index, 1, usuarioActualizado)
            await this.escribir(usuarios)
            return usuarioActualizado
        }
        else {
            let mensaje = "error en la actualizacion del usuario"
            return mensaje
        }
    }
// --- NUEVO MÉTODO: Para incrementar estadísticas ---
    actualizarEstadisticas = async (id, updates) => {
        const usuarios = await this.leer() || [];
        const index = usuarios.findIndex(u => u.id === id);

        if (index !== -1) {
            const usuarioExistente = usuarios[index];
            // Incrementa los campos especificados en 'updates'
            if (updates.wins) usuarioExistente.wins = (usuarioExistente.wins || 0) + updates.wins;
            if (updates.losses) usuarioExistente.losses = (usuarioExistente.losses || 0) + updates.losses;
            if (updates.draws) usuarioExistente.draws = (usuarioExistente.draws || 0) + updates.draws;

            usuarios.splice(index, 1, usuarioExistente); // Reemplaza el usuario actualizado
            await this.escribir(usuarios);
            console.log(`[ModelFileUsuarios] Estadísticas actualizadas para ID ${id}:`, usuarioExistente.wins, usuarioExistente.losses, usuarioExistente.draws);
            return usuarioExistente;
        } else {
            console.warn(`[ModelFileUsuarios] Usuario con ID ${id} no encontrado para incrementar estadísticas.`);
            return null;
        }
    }


    borrarUsuarios = async (id) => {
        const usuarios = await this.leer()
        const index = usuarios.findIndex(u => u.id === id)

        if (index != -1) {
            const usuarioEliminado = usuarios.splice(index, 1)[0]
            await this.escribir(usuarios)
            return usuarioEliminado
        }
        else {
            let mensaje = "error al eliminar el usuario"
            return mensaje
        }
    }


}
export default ModelFileUsuarios 