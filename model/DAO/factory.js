import ModelMem from './modelMem.js'
import ModelMongoDB from './modelMongoDB.js'

class ModelFactory {

    static get(tipo) {
        switch (tipo) {
            case 'MEM':
                console.log('******* Persiste en Memoria***********')
                return new ModelMem()

            case 'MongoDB':
                console.log('******* Persiste en MONGODB***********')
                return new ModelMongoDB()

            default:
                console.log('******* Persiste por default en Memoria***********')
                return new ModelMem()

        }

    }

}

export default ModelFactory
