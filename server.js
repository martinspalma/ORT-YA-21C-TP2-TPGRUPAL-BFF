import express from 'express'
import http from 'http'
import { WebSocketServer } from 'ws'
import { WebSocketManager } from './webSocket/webSocketManager.js'
import { UsuarioRouter, CartaRouter, JuegoRouter } from './router/index.js'


class Server{
    #port
    #persistenciaCartas
    #persistenciaUsuarios
    #persistenciaJuego
    #wsServer
    #websocketManager

    constructor (port, persistenciaCartas, persistenciaUsuarios, persistenciaJuego){
        this.#port=port
        this.#persistenciaCartas=persistenciaCartas
        this.#persistenciaUsuarios=persistenciaUsuarios
        this.#persistenciaJuego = persistenciaJuego
    }
start(){
const app= express()
const server = http.createServer(app)


//-------------------MIDDLEWARES EXPRESS---------------------
app.use('/', express.static('public'))// middleware para tomar los recursos estaticos de la carpeta public
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//--------------API RESTful de Productos-------es lo que pone en uso la carpeta vista----------------
app.use('/api/usuarios', new UsuarioRouter(this.#persistenciaUsuarios).start())
app.use('/api/cartas', new CartaRouter(this.#persistenciaCartas).start())
app.use('/api/juego', new JuegoRouter(this.#persistenciaJuego).start())

//------------------ SECTOR LISTEN--------------------------
server.listen(this.#port, () => {
  console.log(`Servidor escuchando en http://localhost:${this.#port}`)
})

server.on('error', (error) => {
  console.log(`Error en servidor: ${error.message}`)
})

this.#wsServer = new WebSocketServer({ server })
console.log('Servidor WebSocket iniciado')
this.#websocketManager = new WebSocketManager(this.#wsServer)


}
}

export default Server
