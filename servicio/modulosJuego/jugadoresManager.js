import { repartirCartas } from './cartasManager.js'

export async function agregarJugador(sala, id, usuario, socketId, persistencia) {
  if (sala.jugadores.length >= 2) {
    throw new Error('La sala ya tiene dos jugadores')
  }

  const jugadorExistente = sala.jugadores.find(j => j.id === id)
  if (jugadorExistente) {
    jugadorExistente.socketId = socketId;    
    return { mensaje: ` ${usuario} Ya estás en la sala`, sala }
  }

  sala.jugadores.push({
    id,
    usuario,
    socketId,
    cartas: [],
    ordenadas: false,
    historial: []
    
  })

  if (sala.jugadores.length === 2) {
    repartirCartas(sala)
    sala.comenzado = true
    sala.estado = 'esperando-orden'
  }

  await persistencia.guardarSala(sala)
  return { mensaje: ` ${usuario} fue añadido a la sala`, sala }
}

export async function ordenarCartas(sala, id, nuevoOrden, persistencia) {
  const jugador = sala.jugadores.find(j => j.id === id)
  //const idsOriginales = jugador.cartas.map(c => c.id)

  /* if (nuevoOrden.length !== idsOriginales.length) {
    throw new Error('Debe ordenar todas las cartas')
  } */

  //jugador.cartas = nuevoOrden.map(id => jugador.cartas.find(c => c.id === id))
  jugador.cartas = nuevoOrden;
  jugador.ordenadas = true

  if (sala.jugadores.every(j => j.ordenadas)) {
    sala.estado = 'cartas-ordenadas'
  }
  //console.log("Nuevo orden de jugador: ", jugador.cartas);
  
  await persistencia.guardarSala(sala)
  return { mensaje: 'Orden registrado correctamente', sala }
}
