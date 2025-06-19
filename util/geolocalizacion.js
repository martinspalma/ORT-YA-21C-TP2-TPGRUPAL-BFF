import axios from "axios";

export const obtenerPaisPorIP = async(ip)=>{
    if (ip.startsWith('::ffff:')) {
        ip = ip.split(':').pop()
    }
    
    try {
        const {data} = await axios.get(`https://ipapi.co/${ip}/json/`) 

        return {
            nombre: data.country_name,
            codigo: data.country_code
        }
    } catch (error) {
        console.error('Error al obtener país:', error.message)
        return {
            nombre: "Desconocido",
            codigo: "XX"
        }
    }
}