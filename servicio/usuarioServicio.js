import ModelFactory from "../model/DAO/factory.js";
import { validar, validarActualizacion } from "./validaciones/usuarios.js";
import config from "../config.js";
import jwt from "jsonwebtoken";

class Servicio {
  #model;
  #persistenciaType;
  
  
  constructor(persistencia, typePersistencia) {
    this.#model = persistencia;
    this.#persistenciaType=typePersistencia;
    
  }

  obtenerUsuarios = async (id) => {
    if (id) {
      const usuario = await this.#model.obtenerUsuario(id);
      return usuario || {};
    } else {
      return await this.#model.obtenerUsuarios();
    }
  };

  guardarUsuarios = async (usuario) => {
    const val = validar(usuario);
    if (val.result) {
      const usuarioNuevo = await this.#model.guardarUsuarios(usuario);
      return usuarioNuevo;
    } else {
      throw new Error(val.error.details[0].message);
    }
  };

  actualizarUsuarios = async (id, usuario) => {
    const val = validarActualizacion(usuario);
    if (val.result) {
      const usuarioActualizado = await this.#model.actualizarUsuarios(
        id,
        usuario
      );

      const token = jwt.sign(
      {
        id: usuarioActualizado.id,
        usuario: usuarioActualizado.usuario,
        email: usuarioActualizado.email,
        pfp: usuarioActualizado.pfp,
        wins: usuarioActualizado.wins,
        losses: usuarioActualizado.losses,
        draws: usuarioActualizado.draws,
        pais: usuarioActualizado.pais,
        codigoPais: usuarioActualizado.codigoPais,
       
      }, config.CLAVETOKEN)
       console.log(usuario);

      return { token };
      //return usuarioActualizado;
    } else {
      throw new Error(val.error.details[0].message);
    }
  };

  borrarUsuarios = async (id) => {
    const eliminado = await this.#model.borrarUsuarios(id);

    return eliminado;
  };

  loginUsuario = async (usuarioIngresado, contraseniaIngresada) => {
    const usuarios = await this.#model.obtenerUsuarios();

    const usuarioEncontrado = usuarios.find(
      (u) => u.usuario === usuarioIngresado
    );

    if (!usuarioEncontrado) {
      throw new Error("Usuario no encontrado");
    }

    if (usuarioEncontrado.contrasenia !== contraseniaIngresada) {
      throw new Error("Contraseña incorrecta");
    }
    //porque no encontraba el id en front si persisto en file
    let userIdToSign;
    // Determinar qué ID usar basado en el tipo de persistencia
    if (this.#persistenciaType === "MONGODB") {
      userIdToSign = usuarioEncontrado._id; // Para MongoDB, el ID es '_id'
    } else if (this.#persistenciaType === "FILE") {
      userIdToSign = usuarioEncontrado.id;
    }
    // EL TOKEN
    const token = jwt.sign(
      {
        id: userIdToSign,
        usuario: usuarioEncontrado.usuario,
        email: usuarioEncontrado.email,
        pfp: usuarioEncontrado.pfp,
        wins: usuarioEncontrado.wins,
        losses: usuarioEncontrado.losses,
        draws: usuarioEncontrado.draws,
        pais: usuarioEncontrado.pais,
        codigoPais: usuarioEncontrado.codigoPais,
      },
      config.CLAVETOKEN,
      //{ expiresIn: "1h" }
    );

    return { token };
  };
  actualizarEstadisticas = async (id, updates) => {
    return await this.#model.actualizarEstadisticas(id, updates);
  };
}

export default Servicio;
