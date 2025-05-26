import dotenv from 'dotenv';

dotenv.config();

const MODO_PERSISTENCIA =process.env.MODO_PERSISTENCIA //process.env.MODO_PERSISTENCIA
const PORT = process.env.PORT || 8080


export default { PORT, MODO_PERSISTENCIA }
