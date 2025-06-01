import ModelMem from './modelMem.js'
import ModelFile from './modelFile.js'

class ModelFactory {

    static get(tipo) {
        switch (tipo) {
            case 'MEM':
                console.log('******* Persiste en Memoria***********')
                return new ModelMem()

            case 'FILE':
                console.log('******* Persiste en File***********')
                return new ModelFile()

            default:
                console.log('******* Persiste por default en Memoria***********')
                return new ModelMem()

        }

    }

}

export default ModelFactory
