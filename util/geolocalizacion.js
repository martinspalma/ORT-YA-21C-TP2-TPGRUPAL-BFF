import axios from "axios";

export const obtenerPaisPorIP = async(ip)=>{
    if (ip.startsWith('::ffff:')) {
        ip = ip.split(':').pop()
    }
    
    try {
        const {data} = await axios.get(`http://ip-api.com/json/${ip}`) 

        return {
            nombre: data.country,
            codigo: data.countryCode
        }
    } catch (error) {
        console.error('Error al obtener país:', error.message)
        return {
            nombre: "Desconocido",
            codigo: "XX"
        }
    }
}