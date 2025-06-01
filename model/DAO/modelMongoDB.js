class ModelMongoDB {
    #jugadores

    constructor() {

        this.#jugadores = [
            { id: '1', usuario: 'player1', email: 'player1@gmail.com', fechaNac: "17/10/2000",  contrasenia: "1234"},
            { id: '2', usuario: 'player100', email: 'player100@gmail.com', fechaNac: "11/10/2000",  contrasenia: "1234"},
            { id: '3', usuario: 'player2001', email: 'player2001@gmail.com', fechaNac: "1/10/2000",  contrasenia: "1234" },
        ]
    }

    obtenerJugador = async (id) => {

        const jugadorBuscado = this.#jugadores.find(l => l.id === id)
        return jugadorBuscado || {}
    }

    obtenerJugadores = async () => {
        return this.#jugadores
    }

    guardarJugador = async (jugador) => {
        jugador.id = String(parseInt(this.#jugadores[this.#jugadores.length - 1]?.id || 0) + 1)
        this.#jugadores.push(jugador)

        return jugador
    }

    actualizarUsuarios = async (id, jugador) => {
        const index = this.#jugadores.findIndex(j => j.id === id)

        if (index != -1) {
            const jugadorAnterior = this.#jugadores[index]
            const jugadorActualizado = { ...jugadorAnterior, ...jugador }
            this.#jugadores.splice(index, 1, jugadorActualizado)
            return jugadorActualizado
        }
        else {
            let mensaje = "error en la actualizacion del perfil del usuario"
            return mensaje
        }
    }

    eliminarJugador = async (id) => {
        const index = this.#jugadores.findIndex(j => j.id === id)
        if (index != -1) {
            const jugadorEliminado = this.#jugadores.splice(index, 1)[0]

            return jugadorEliminado
        }
        else {
            let mensaje = "error al eliminar el jugador"
            return mensaje
        }
    }


}
export default ModelMongoDB 