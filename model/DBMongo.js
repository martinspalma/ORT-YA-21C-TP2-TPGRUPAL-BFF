import config from '../servicio/config.js'
import mongoose from "mongoose"
class CnxMongoDB {

    static connectionOK = false // indica el estado de conexion de la base

    static conectar = async () => {
        try {
            await mongoose.connect(config.STRCNX + '/' + config.BASE)
            console.log('conectado a la base de datos')

            CnxMongoDB.connectionOK = true

        }
        catch (error) {
            console.log('error al conectar a la Base de Datos')
        }
    }
}
export default CnxMongoDB