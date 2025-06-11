import fetch from "node-fetch";

export const obtenerPaisPorIP = async(ip)=>{
    if (ip.startsWith('::ffff:')) {
        ip = ip.split(':').pop()
    }
    
    try {
        const resApi = await fetch(`http://ip-api.com/json/${ip}`)
        const data = await resApi.json()

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