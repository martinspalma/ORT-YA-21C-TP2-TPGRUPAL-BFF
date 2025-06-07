export async function inicializarSala(persistencia) {
  let sala = await persistencia.cargarSala()
  if (!sala) {
    sala = {
      id: 'sala-unica',
      jugadores: [],
      comenzado: false,
      ronda: 1,
      finalizada: false,
      resultado: null,
      estado: 'esperando-jugadores'
    }
    await persistencia.guardarSala(sala)
  }
  return sala
}
