import express from 'express'
import Router from './router/usuarioRouter.js' 


class Server{
    #port
    #persistencia
    constructor (port, persistencia){
        this.#port=port
        this.#persistencia=persistencia
    }
start(){
const app= express()

//-------------------MIDDLEWARES EXPRESS---------------------
app.use('/', express.static('public'))// middleware para tomar los recursos estaticos de la carpeta public
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//--------------API RESTful de Productos-------es lo que pone en uso la carpeta vista----------------
app.use('/api/usuarios', new Router(this.#persistencia).start())

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
