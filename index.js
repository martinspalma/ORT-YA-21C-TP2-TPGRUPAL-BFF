import config from "./config.js"
import Server from "./server.js"
import CnxMongoDB from "./model/DBMongo.js"

if(config.MODO_PERSISTENCIA_JUEGO == 'MONGODB'|| config.MODO_PERSISTENCIA_CARTAS == 'MONGODB' || config.MODO_PERSISTENCIA_CARTAS == 'MONGODB' ) {
    await CnxMongoDB.conectar()
}

new Server(config.PORT, config.MODO_PERSISTENCIA_CARTAS, config.MODO_PERSISTENCIA_USUARIOS, config.MODO_PERSISTENCIA_JUEGO).start()
