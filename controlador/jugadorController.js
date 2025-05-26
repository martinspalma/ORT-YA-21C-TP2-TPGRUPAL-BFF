import Servicio from '../servicio/jugadorServicio.js'


class Controlador{
#servicio
constructor(persistencia){
this.#servicio= new Servicio(persistencia)
}

obtenerJugadores = async (req,res) => {
const { id } = req.params
const jugador = await this.#servicio.obtenerJugadores(id)
res.json(jugador)
}

guardarJugadores = async (req,res) => {

const jugador = req.body
const jugadorGuardado = await this.#servicio.guardarJugador(jugador)
res.json(jugadorGuardado)
}


actualizarJugadores = async (req,res) => {
const {id} = req.params
const jugador = req.body
const jugadorModificado = await this.#servicio.actualizarJugador(id, producto)
res.json(jugadorModificado)
}


borrarJugadores = async (req,res) => {
const {id} = req.params
const eliminado = await this.#servicio.borrarJugadores(id)
res.json(eliminado)
}

porError =(req, res)=>{
const {url:ruta, method: metodo}= req
res.status(404).send(`<h1 style= "color:purple;"> Error:  ${metodo} ${ruta} no encontrada</h1>`)
}

}

export default Controlador
