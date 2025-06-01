import fs from 'fs'

class ModelFile {
    #usuarios

    constructor() {

        this.#usuarios = 'usuarios.json'
    }

    #leerArchivoUsuarios = async ruta => {
        let archivo = []
        try {
            archivo = JSON.parse(await fs.promises.readFile(ruta, 'utf-8'))
        } catch { }
        return archivo
    }

    #escribirArchivoUsuarios = async (ruta, texto) => {
        await fs.promises.writeFile(ruta, JSON.stringify(texto, null, '\t'))
    }
//-----------------------------------------------------------------------
    obtenerUsuario = async (id) => {

        const usuarios = await this.#leerArchivoUsuarios(this.#usuarios)
        const usuarioBuscado = usuarios.find(u => u.id === id)
        return usuarioBuscado || {}
    }

    obtenerUsuarios = async () => {
        return await this.#leerArchivoUsuarios(this.#usuarios) || {}
    }

    guardarUsuarios = async (usuario) => {
        const usuarios = await this.#leerArchivoUsuarios(this.#usuarios)
        usuario.id = String(parseInt(usuarios[usuarios.length - 1]?.id || 0) + 1)
        usuarios.push(usuario)
        await this.#escribirArchivoUsuarios(this.#usuarios, usuarios)
        return usuario
    }

    actualizarUsuarios = async (id, usuario) => {
        const usuarios = await this.#leerArchivoUsuarios(this.#usuarios)
        const index = usuarios.findIndex(u => u.id === id)

        if (index != -1) {
            const usuarioAnterior = usuarios[index]
            const usuarioActualizado = { ...usuarioAnterior, ...usuario }
            usuarios.splice(index, 1, usuarioActualizado)
            await this.#escribirArchivoUsuarios(this.#usuarios, usuarios)
            return usuarioActualizado
        }
        else {
            let mensaje = "error en la actualizacion del usuario"
            return mensaje
        }
    }

    borrarUsuarios = async (id) => {
        const usuarios = await this.#leerArchivoUsuarios(this.#usuarios)
        const index = usuarios.findIndex(u => u.id === id)

        if (index != -1) {
            const usuarioEliminado = usuarios.splice(index, 1)[0]
            await this.#escribirArchivoUsuarios(this.#usuarios, usuarios)
            return usuarioEliminado
        }
        else {
            let mensaje = "error al eliminar el usuario"
            return mensaje
        }
    }


}
export default ModelFile 