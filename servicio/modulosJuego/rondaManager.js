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
  await persistencia.guardarSala(sala)
  return sala.resultado
}

export async function avanzarRonda(sala, persistencia, repartirCartas) {
  const [j1, j2] = sala.jugadores
  const ronda = sala.ronda

  j1.historial.push({ ronda, puntaje: sala.resultado[j1.id] })
  j2.historial.push({ ronda, puntaje: sala.resultado[j2.id] })

  if (ronda >= 3) {
    const totalJ1 = j1.historial.reduce((acc, r) => acc + r.puntaje, 0)
    const totalJ2 = j2.historial.reduce((acc, r) => acc + r.puntaje, 0)
    let ganador = 'empate'
    if (totalJ1 > totalJ2) ganador = j1.id
    else if (totalJ2 > totalJ1) ganador = j2.id

    sala.estado = 'juego-finalizado'
    sala.ganador = ganador
    sala.finalizada = true

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
