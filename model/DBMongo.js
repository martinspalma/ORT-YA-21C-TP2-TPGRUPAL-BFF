import config from '../config.js'
import mongoose from "mongoose"
class CnxMongoDB {

    static connectionOK = false 


    static conectar = async () => {
        try {
            
            //console.log(config.STRCNX + '/' + config.BASE)
            await mongoose.connect(config.STRCNX + '/' + config.BASE)
            console.log('conectado a la base de datos')

            CnxMongoDB.connectionOK = true
        }
        catch (error) {
            console.log('error al conectar a la Base de Datos', error)
        }
    }
}
export default CnxMongoDB