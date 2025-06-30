import Joi from 'joi'

export const validar = (usuario) => {

    const usuarioEsquema = Joi.object({

        usuario: Joi.string().alphanum().min(5).max(18).required(),
        email: Joi.string().email({ tlds: { allow: false } }).required(),
        fechaNac: Joi.date().less('now').required(),
        contrasenia: Joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z0-9])(?=.{8,})'))
            .message('La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, una minúscula, un número y un carácter especial')
            .required(),
        wins: Joi.number().integer().min(0).default(0),
        losses: Joi.number().integer().min(0).default(0),
        draws: Joi.number().integer().min(0).default(0),
        pfp: Joi.string().optional().allow(null, '')
    })
    const { error } = usuarioEsquema.validate(usuario)
    if (error) {
        return { result: false, error }
    }
    else {
        return { result: true }
    }
}

export const validarActualizacion = (usuario) => {
    const usuarioEsquema = Joi.object({
        usuario: Joi.string().alphanum().min(5).max(18).optional(),
        email: Joi.string().email({ tlds: { allow: false } }).optional(),
        fechaNac: Joi.date().less('now').optional(),
        contrasenia: Joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z0-9])(?=.{8,})'))
            .message('La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, una minúscula, un número y un carácter especial')
            .optional(),
        wins: Joi.number().integer().min(0).optional(),
        losses: Joi.number().integer().min(0).optional(),
        draws: Joi.number().integer().min(0).optional(),
        pfp: Joi.string().optional()
    }).min(1);

    const { error } = usuarioEsquema.validate(usuario)
    if (error) {
        return { result: false, error }
    } else {
        return { result: true }
    }
};