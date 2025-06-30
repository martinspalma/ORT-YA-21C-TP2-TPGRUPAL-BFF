import mongoose from "mongoose"
import bcrypt from "bcrypt"

const usuarioSchema = mongoose.Schema({
    usuario: {
type: String,
match: /^[a-zA-Z0-9]+$/, // alphanum

},
email: {
type: String,

match: /^[^\s@]+@[^\s@]+.[^\s@]+$/,

},
fechaNac: {
type: Date,

set: (fecha) => {
if (!fecha) return fecha;
const fechaTruncada = new Date(fecha);
fechaTruncada.setUTCHours(0, 0, 0, 0);
return fechaTruncada;
}

},
contrasenia: {
type: String,

//match: /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[^A-Za-z0-9])(?=.{8,})/

},

wins: { 
    type: Number, default: 0, min: 0
 }, 

losses: {
     type: Number, default: 0, min: 0
     }, 
draws: { 
    type: Number, default: 0 , min: 0
},  

    pfp: { 
        type: String, default: 'https://placehold.co/100x100/CCCCCC/FFFFFF?text=PFPI'
     }
}, {versionKey: false})

// Formateo JSON para mostrar fecha como 'YYYY-MM-DD'
usuarioSchema.set('toJSON', {
transform: (doc, ret) => {
if (ret.fechaNac) {
const fecha = new Date(ret.fechaNac);
const anio = fecha.getFullYear();
const mes = String(fecha.getMonth() + 1).padStart(2, '0');
const dia = String(fecha.getDate()).padStart(2, '0');
ret.fechaNac = `${anio}-${mes}-${dia}`;
}
return ret;
}
});

// // Middleware: hashea la contraseña antes de guardar
// UsuarioSchema.pre("save", async function (next) {
// if (!this.isModified("contrasenia")) return next();

// try {
// const salt = await bcrypt.genSalt(10);
// this.contrasenia = await bcrypt.hash(this.contrasenia, salt);
// next();
// } catch (err) {
// next(err);
// }
// });

export const UsuarioModel = mongoose.model('usuarios', usuarioSchema)