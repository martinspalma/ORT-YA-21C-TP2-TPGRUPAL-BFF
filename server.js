import express from 'express'
import http from 'http'
import { Server as SocketIOServer } from 'socket.io'
import { SocketIOManager } from './webSocket/socketIOManager.js'
//import { WebSocketServer } from 'ws'
//import { WebSocketManager } from './webSocket/webSocketManager.js'
import { UsuarioRouter, CartaRouter, JuegoRouter } from './router/index.js'
import JuegoServicio from './servicio/juegoServicio.js'
import ModelFactory from './model/DAO/factory.js'
import cors from 'cors'


class Server {
  #port
  #persistenciaCartas
  #persistenciaUsuarios
  #persistenciaJuego
  #io
  #socketIOManager

  constructor(port, persistenciaCartas, persistenciaUsuarios, persistenciaJuego) {
    this.#port = port
    this.#persistenciaCartas = persistenciaCartas
    this.#persistenciaUsuarios = persistenciaUsuarios
    this.#persistenciaJuego = persistenciaJuego
  }
  async start() {
    const app = express()
    const server = http.createServer(app)


    //-------------------MIDDLEWARES EXPRESS---------------------
    app.use('/', express.static('public'))// middleware para tomar los recursos estaticos de la carpeta public
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(cors({
      //origin: ['http://localhost:8081'],
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization']
    }))

    // INSTANCIO ACA JUEGOSERVICIO PARA USAR EL SOCKET.IO------------
    const juegoPersistencia = ModelFactory.get(this.#persistenciaJuego, 'juego');
    const juegoServicio = new JuegoServicio(juegoPersistencia);

    //--------------API RESTful de Productos-------es lo que pone en uso la carpeta vista----------------
    app.use('/api/usuarios', new UsuarioRouter(this.#persistenciaUsuarios).start())
    app.use('/api/cartas', new CartaRouter(this.#persistenciaCartas).start())
    app.use('/api/juego', new JuegoRouter(juegoServicio).start())

    //----------instancio Socket.IO Server--------------
    this.#io = new SocketIOServer(server, {
      cors: {
        origin: '*', //['http://localhost:8081'], // hay que probar origin: '*', que permitiria todo
        methods: ["GET", "POST"]
      }
    })

    console.log('Servidor Socket.IO iniciado.')
  
//----------instancio SocketIOManager--------------

this.#socketIOManager = new SocketIOManager(this.#io, juegoServicio)

//------------------ SECTOR LISTEN--------------------------
server.listen(this.#port, () => {
  console.log(`Servidor escuchando en http://localhost:${this.#port}`)
})

server.on('error', (error) => {
  console.log(`Error en servidor: ${error.message}`)
})

}
}

export default Server
