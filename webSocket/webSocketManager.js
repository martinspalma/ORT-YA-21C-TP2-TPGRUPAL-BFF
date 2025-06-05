
export class WebSocketManager {
  constructor(wsServer, juegoServicioWS) {
    this.wsServer = wsServer

    this.wsServer.on('connection', (ws) => {
      console.log('Cliente WebSocket conectado')

      ws.on('message', (data) => {
        try {
          const mensaje = JSON.parse(data)
          console.log('WS recibido:', mensaje)
          // manejar mensajes entrantes si hace falta
        } catch (e) {
          console.log('Error parsing mensaje WS:', e.message)
        }
      })

      ws.on('close', () => {
        console.log('Cliente desconectado')
      })
    })

    // escuchás los eventos emitidos desde juegoServicioWS
    juegoServicioWS.on('estadoActualizado', (sala) => {
      this.broadcast({ tipo: 'ESTADO_SALA_ACTUALIZADO', sala })
    })
  }

  broadcast(mensaje) {
    const data = JSON.stringify(mensaje)
    this.wsServer.clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(data)
      }
    })
  }
  
}
