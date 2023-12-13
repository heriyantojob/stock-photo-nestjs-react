import "dotenv/config"
import { logDebug } from "src/utils/base/logDebug"

// let   allowedOrigins = [
//     'http://localhost:3000',
//     'http://localhost:8000',
//     'http://192.168.100.3:8000',
//     'https://d03db11711bcc1.lhr.life',
//     // admin
//     "http://localhost:5173",
//     "http://127.0.0.1:5173"
// ]
const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS.split(",") || '';
logDebug(allowedOrigins)

 const corsOptions = {
    origin: (origin, callback) => {
    
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {

           
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
}
export default corsOptions
