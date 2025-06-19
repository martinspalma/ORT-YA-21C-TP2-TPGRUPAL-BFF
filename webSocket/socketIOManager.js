import { obtenerPaisPorIP } from "../util/geolocalizacion.js";

export class SocketIOManager {
    #io;
    #juegoServicio;

    constructor(ioServer, juegoServicio) {
        this.#io = ioServer;
        this.#juegoServicio = juegoServicio;

        // Configura los listeners para el servidor Socket.IO
        this.#setupSocketIOListeners();
        this.#setupOyentesDelServicio();

        console.log('SocketIOManager inicializado y listo para manejar eventos.');
    }


    #setupSocketIOListeners() {
        this.#io.on('connection', async(socket) => {
            console.log(`Nuevo Cliente Socket.IO conectado. ID: ${socket.id}. Total conectados: ${this.#io.engine.clientsCount}`);

            //const ip = socket.handshake.address
            const ip = "8.8.8.8"
            const pais = await obtenerPaisPorIP(ip)

            console.log(`Cliente conectado desde ${pais.nombre}`)

            socket.pais = pais

            this.#juegoServicio.obtenerSala()
                .then(salaInicial => {
                    if (salaInicial) {
                        socket.emit('ESTADO_SALA_ACTUALIZADO', salaInicial);
                    }
                })
                .catch(error => {
                    console.error(`Error al enviar estado inicial al cliente ${socket.id}:`, error);
                    socket.emit('ERROR', { mensaje: 'Error al cargar estado inicial de la sala.' });
                });


            // --- Aca reemplaza el router y el controlador y pasa derecho al servicio ---
            
            socket.on('UNIRSE_JUEGO', async (data) => {
                console.log(`Evento UNIRSE_JUEGO recibido del cliente (${socket.id}):`, data);
                let parsedData = typeof data === 'string' ? JSON.parse(data) : data;

                if (!parsedData.usuario || !parsedData.usuario.id || !parsedData.usuario.usuario) {
                    socket.emit('ERROR', { mensaje: 'Datos de usuario incompletos para unirse (faltan id o nombre de usuario).' });
                    return;
                }
                try {
                    await this.#juegoServicio.unirseOSumarJugador(parsedData.usuario.id, parsedData.usuario, socket.id)

                } catch (e) {
                    console.error(`Error al procesar UNIRSE_JUEGO para ${socket.id}: ${e.message}`);
                    socket.emit('ERROR', { mensaje: `Error al unirse al juego: ${e.message}` });
                }
            });

            socket.on('ORDENAR_CARTAS', async (data) => {
                console.log(`Evento ORDENAR_CARTAS recibido del cliente (${socket.id}):`, data);
                let parsedData = typeof data === 'string' ? JSON.parse(data) : data;

                if (!parsedData.nuevoOrden || !Array.isArray(parsedData.nuevoOrden)) {
                    socket.emit('ERROR', { mensaje: 'Formato de orden de cartas inválido.' });
                    return;
                }
                if (!parsedData.id) {
                    socket.emit('ERROR', { mensaje: 'ID de usuario para ordenar cartas incompleto o inválido.' });
                    return;
                }
                try {
                    await this.#juegoServicio.registrarOrdenCartas(parsedData.id, parsedData.nuevoOrden);

                } catch (e) {
                    console.error(`Error al procesar ORDENAR_CARTAS para ${socket.id}: ${e.message}`);
                    socket.emit('ERROR', { mensaje: `Error al ordenar cartas: ${e.message}` });
                }
            });

            socket.on('ENFRENTAR_CARTAS', async () => {
                console.log(`Evento ENFRENTAR_CARTAS recibido del cliente (${socket.id})`);
                try {
                    await this.#juegoServicio.enfrentarCartas();

                } catch (e) {
                    console.error(`Error al procesar ENFRENTAR_CARTAS para ${socket.id}: ${e.message}`);
                    socket.emit('ERROR', { mensaje: `Error al enfrentar cartas: ${e.message}` });
                }
            });

            socket.on('AVANZAR_RONDA', async () => {
                console.log(`Evento AVANZAR_RONDA recibido del cliente (${socket.id})`);
                try {
                    await this.#juegoServicio.avanzarRonda();

                } catch (e) {
                    console.error(`Error al procesar AVANZAR_RONDA para ${socket.id}: ${e.message}`);
                    socket.emit('ERROR', { mensaje: `Error al avanzar de ronda: ${e.message}` });
                }
            });

            // --- Escucha cuando un cliente se desconecta ---
            socket.on('disconnect', (reason) => {
                console.log(`Cliente Socket.IO desconectado. ID: ${socket.id}. Razón: ${reason}`);

                this.#juegoServicio.manejarDesconexionJugador(socket.id)
                    .catch(error => {
                        console.error(`Error al manejar la desconexión del jugador ${socket.id}:`, error);
                    });
            });


        });


    }


    #setupOyentesDelServicio() {

        this.#juegoServicio.on('estadoActualizado', (sala) => {
            console.log(`Evento 'estadoActualizado', ${sala.estado}, recibido de JuegoServicio para sala ID: ${sala.id}`);
            this.#io.emit('ESTADO_SALA_ACTUALIZADO', sala);
        });

       
    }
}