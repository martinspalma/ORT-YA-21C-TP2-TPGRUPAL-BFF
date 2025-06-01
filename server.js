import express from 'express'
import UsuarioRouter from './router/usuarioRouter.js' 
import CartaRouter from './router/cartaRouter.js'


class Server{
    #port
    #persistenciaCartas
    #persistenciaUsuarios
    constructor (port, persistenciaCartas, persistenciaUsuarios){
        this.#port=port
        this.#persistenciaCartas=persistenciaCartas
        this.#persistenciaUsuarios=persistenciaUsuarios
    }
start(){
const app= express()

//-------------------MIDDLEWARES EXPRESS---------------------
app.use('/', express.static('public'))// middleware para tomar los recursos estaticos de la carpeta public
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//--------------API RESTful de Productos-------es lo que pone en uso la carpeta vista----------------
app.use('/api/usuarios', new UsuarioRouter(this.#persistenciaUsuarios).start())
app.use('/api/cartas', new CartaRouter(this.#persistenciaCartas).start())

//------------------ SECTOR LISTEN--------------------------
const port = this.#port 
const server= app.listen(port, () => { 
console.log(`Servidor escuchando en http://localhost:${port}`)})
server.on('error', (error)=>{
 console.log(`error en servidor: ${error.message}`)
})
}
}
export default Server
