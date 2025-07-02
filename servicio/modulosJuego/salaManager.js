export async function inicializarSala(persistencia, constructor ) { //Constructor es true o false
  //para saber si es cuando se inicia el servidor o no.
  let sala;
  if(!constructor) sala = await persistencia.cargarSala()
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
