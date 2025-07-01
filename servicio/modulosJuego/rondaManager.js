export function resultadoMano(c1, c2) {
  const reglas = { piedra: 'tijera', tijera: 'papel', papel: 'piedra' }
  if (c1 === c2) return 0
  if (reglas[c1] === c2) return 1
  return 2
}

export async function enfrentarCartas(sala, persistencia) {
  const [j1, j2] = sala.jugadores
  let puntajeJ1 = 0
  let puntajeJ2 = 0

  for (let i = 0; i < 9; i++) {
    const r = resultadoMano(j1.cartas[i].tipo, j2.cartas[i].tipo)
    if (r === 1) puntajeJ1++
    if (r === 2) puntajeJ2++
  }

  sala.resultado = { [j1.id]: puntajeJ1, [j2.id]: puntajeJ2 }
  sala.estado = 'partida-finalizada'
  let ganador = "empate"
  if(puntajeJ1 > puntajeJ2) ganador = j1.id
  else if(puntajeJ1 < puntajeJ2) ganador = j2.id
  sala.ganador = ganador; //Solución temporal para que sean una sola ronda
  console.log('Total J1: ', puntajeJ1, " - Total J2: ", puntajeJ2, " y - ", sala.ganador);
  await persistencia.guardarSala(sala)
  return sala.resultado
}

export async function avanzarRonda(sala, persistencia, repartirCartas) {
  const LIMITE_CANT_RONDAS = 3;
  const [j1, j2] = sala.jugadores
  const ronda = sala.ronda

  j1.historial.push({ ronda, puntaje: sala.resultado[j1.id] })
  j2.historial.push({ ronda, puntaje: sala.resultado[j2.id] })
  if (ronda >= LIMITE_CANT_RONDAS) {
    const totalJ1 = j1.historial.reduce((acc, r) => acc + r.puntaje, 0)
    const totalJ2 = j2.historial.reduce((acc, r) => acc + r.puntaje, 0)
    let ganador = 'empate'
    if (totalJ1 > totalJ2) ganador = j1.id
    else if (totalJ2 > totalJ1) ganador = j2.id
    
    sala.estado = 'juego-finalizado'
    sala.ganador = ganador
    sala.finalizada = true

    //bloque para persistir resultados de la partida segun nuevos atributos
    try {
      if (ganador === 'empate') {
        // Incrementa 'draws' para ambos jugadores
        await persistencia.actualizarEstadisticas(j1.id, { $inc: { draws: 1 } });
        await persistencia.actualizarEstadisticas(j2.id, { $inc: { draws: 1 } });
        console.log(`Juego finalizado: Empate. Estadísticas de draws actualizadas para ${j1.usuario} y ${j2.usuario}.`);
      } else {
        // Incrementa 'wins' para el ganador y 'losses' para el perdedor
        await persistencia.actualizarEstadisticas(winnerId, { $inc: { wins: 1 } });
        await persistencia.actualizarEstadisticas(loserId, { $inc: { losses: 1 } });
        console.log(`Juego finalizado: ${ganador} ganó. Estadísticas actualizadas para ${j1.usuario} y ${j2.usuario}.`);
      }
    } catch (error) {
      console.error(`Error al actualizar estadísticas del usuario al finalizar el juego:`, error);
    }


    await persistencia.guardarSala(sala)
    return {
      mensaje: 'Juego finalizado',
      ganador,
      historial: { [j1.id]: j1.historial, [j2.id]: j2.historial }
    }
  }

  sala.ronda += 1
  sala.resultado = null
  sala.comenzado = false
  sala.estado = 'esperando-orden'

  repartirCartas(sala)
  await persistencia.guardarSala(sala)

  return { mensaje: 'Ronda siguiente creada', ronda: sala.ronda }
}
