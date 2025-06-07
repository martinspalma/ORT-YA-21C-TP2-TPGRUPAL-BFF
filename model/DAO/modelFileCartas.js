import ArchivoPersistencia from './archivoPersistencia.js'

class ModelFileCartas extends ArchivoPersistencia {
    #cartasRuta = 'cartas.json'

    constructor() {

       super('./data/cartas.json')
    }

    
    obtenerCartas = async () => await this.leer()

    obtenerCarta = async (id) => {
        const cartas = await this.leer()
        return cartas.find(c => c.id === id)
    }

    guardarCarta = async (carta) => {
        const cartas = await this.leer()
        carta.id = String(parseInt(cartas.at(-1)?.id || 0) + 1)
        cartas.push(carta)
        await this.escribir(cartas)
        return carta
    }

    actualizarCarta = async (id, datos) => {
        const cartas = await this.leer()
        const index = cartas.findIndex(c => c.id === id)
        if (index !== -1) {
            cartas[index] = { ...cartas[index], ...datos }
            await this.escribir(cartas)
            return cartas[index]
        }
        return null
    }

    borrarCarta = async (id) => {
        const cartas = await this.leer()
        const index = cartas.findIndex(c => c.id === id)
        if (index !== -1) {
            const eliminada = cartas.splice(index, 1)[0]
            await this.escribir(cartas)
            return eliminada
        }
        return null
    }
}

export default ModelFileCartas