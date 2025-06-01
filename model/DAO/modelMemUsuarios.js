class ModelMem {
    #usuarios

    constructor() {

        this.#usuarios = [
            { id: '1', usuario: 'player1', email: 'player1@gmail.com', fechaNac: "17/10/2000", contrasenia: "1234" },
            { id: '2', usuario: 'player100', email: 'player100@gmail.com', fechaNac: "11/10/2000", contrasenia: "1234" },
            { id: '3', usuario: 'player2001', email: 'player2001@gmail.com', fechaNac: "1/10/2000", contrasenia: "1234" },
        ]
    }

    obtenerUsuario = async (id) => {
        const usuarioBuscado = this.#usuarios.find(u => u.id === id)
        return usuarioBuscado || {}
    }

    obtenerUsuarios = async () => {
        return this.#usuarios
    }

    guardarUsuarios = async (usuario) => {
        usuario.id = String(parseInt(this.#usuarios[this.#usuarios.length - 1]?.id || 0) + 1)
        this.#usuarios.push(usuario)
        return usuario
    }

    actualizarUsuarios = async (id, usuario) => {
        const index = this.#usuarios.findIndex(u => u.id === id)

        if (index != -1) {
            const usuarioAnterior = this.#usuarios[index]
            const usuarioActualizado = { ...usuarioAnterior, ...usuario }
            this.#usuarios.splice(index, 1, usuarioActualizado)
            return usuarioActualizado
        }
        else {
            let mensaje = "error en la actualizacion del perfil del usuario"
            return mensaje
        }
    }

    borrarUsuarios = async (id) => {
        const index = this.#usuarios.findIndex(u => u.id === id)
        if (index != -1) {
            const usuarioEliminado = this.#usuarios.splice(index, 1)[0]

            return usuarioEliminado
        }
        else {
            let mensaje = "error al eliminar el usuario"
            return mensaje
        }
    }


}
export default ModelMem 