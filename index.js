import config from "./servicio/config.js"
import Server from "./server.js"

new Server(config.PORT, config.MODO_PERSISTENCIA_CARTAS, config.MODO_PERSISTENCIA_USUARIOS).start()
