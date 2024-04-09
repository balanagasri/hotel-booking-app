import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';

// Routes import...
import { hotelRoutes } from './routes/hotels.routes.js';
import { authRoutes } from './routes/auth.routes.js';
import { FRONTEND_URL, NODE_ENV } from './conf/index.js';
import { myBookingRoutes } from './routes/my-bookings.routes.js';

// import path from 'path';
// import { fileURLToPath } from 'url';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// app.use(express.static(path.join(__dirname, '../../Client/dist')));

const app = express();

const corsOptions = {
    origin: FRONTEND_URL,
    credentials: true,
    optionSuccessStatus: 200,
    Headers: true,
    exposedHeaders: 'Set-Cookie',
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Access-Control-Allow-Origin', 'Content-Type', 'Authorization'],
};

const sessionConfig = {
    secret: 'MYSECRET',
    name: 'appName',
    resave: false,
    saveUninitialized: false,
    cookie: {
        sameSite: 'none',
    },
};

if (NODE_ENV === 'production') {
    app.set('trust proxy', 1);
    sessionConfig.cookie.secure = true;
}

app.use(session(sessionConfig));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes declaration...
app.get('/', (_, res) => {
    res.status(200).json({
        status: 'ok',
        message: 'I am home route. Sever is live',
    });
});

app.use('/api/v1/user', authRoutes);
app.use('/api/v1/my-hotels', hotelRoutes);
app.use('/api/v1/my-bookings', myBookingRoutes);

export default app;
