import axios from "axios";

export const obtenerPaisPorIP = async(ip)=>{
    console.log('1 - IP recibido: ', ip);
    
    if (ip.startsWith('::ffff:')) {
        ip = ip.split(':').pop()
        console.log('2- IP resultante: ', ip);
    }
    
    try {
        console.log('3- IP recibido: ', ip);
        const {data} = await axios.get(`https://ipapi.co/${ip}/json/`) 

        return {
            nombre: data.country_name ?? "Argentina",
            codigo: data.country_code ?? "AR" 
        }
    } catch (error) {
        console.error('Error al obtener país:', error.message)
        return {
            nombre: "Desconocido",
            codigo: "XX"
        }
    }
}