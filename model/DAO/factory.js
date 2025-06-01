import ModelMemUsuarios from './modelMemUsuarios.js'
import ModelMemCartas from './modelMemCartas.js'
import ModelFileUsuarios from './modelFileUsuarios.js'
import ModelFileCartas from './modelFileCartas.js'

class ModelFactory {
    static get(tipo, entidad) {
        switch (tipo) {
            case 'MEM':
                console.log(`******* Persistiendo en Memoria (${entidad}) ***********`)
                if (entidad === 'usuarios') return new ModelMemUsuarios()
                if (entidad === 'cartas') return new ModelMemCartas()
                break

            case 'FILE':
                console.log(`******* Persistiendo en Archivo (${entidad}) ***********`)
                if (entidad === 'usuarios') return new ModelFileUsuarios()
                if (entidad === 'cartas') return new ModelFileCartas()
                break

            default:
                console.log(`******* Persistiendo por default en Memoria (${entidad}) ***********`)
                if (entidad === 'usuarios') return new ModelMemUsuarios()
                if (entidad === 'cartas') return new ModelMemCartas()
        }
    }
}

export default ModelFactory