//MEM
import ModelMemUsuarios from './modelMemUsuarios.js'
import ModelMemCartas from './modelMemCartas.js'
//FILE
import ModelFileUsuarios from './modelFileUsuarios.js'
import ModelFileCartas from './modelFileCartas.js'
import ModelFileJuego from './modelFileJuego.js'
//MongoDB
import ModelMongoDBUsuarios from './modelMongoDBUsuarios.js'
import ModelMongoDBJuego from './modelMongoDBJuego.js'
import ModelMongoDBCartas from './modelMongoDBCartas.js'

class ModelFactory {
    static get(tipo, entidad) {
        switch (tipo) {
            case 'MEM':
                console.log(`******* Persistiendo en Memoria (${entidad}) ***********`)
                if (entidad === 'usuarios') return new ModelMemUsuarios()
                if (entidad === 'cartas') return new ModelMemCartas()
                //if (entidad === 'juego') return new ModelMemJuego()
                break

            case 'FILE':
                console.log(`******* Persistiendo en Archivo (${entidad}) ***********`)
                if (entidad === 'usuarios') return new ModelFileUsuarios()
                if (entidad === 'cartas') return new ModelFileCartas()
                if (entidad === 'juego') return new ModelFileJuego()
                break

                case 'MONGODB':
                console.log(`******* Persistiendo en MongoDB (${entidad}) ***********`)
                if (entidad === 'usuarios') return new ModelMongoDBUsuarios()
                if (entidad === 'cartas') return new ModelMongoDBCartas()
                if (entidad === 'juego') return new ModelMongoDBJuego()
                break

            default:
                console.log(`******* Persistiendo por default en Memoria (${entidad}) ***********`)
                if (entidad === 'usuarios') return new ModelMemUsuarios()
                if (entidad === 'cartas') return new ModelMemCartas()
                //if (entidad === 'juego') return new ModelMemJuego()
        }
    }
}

export default ModelFactory