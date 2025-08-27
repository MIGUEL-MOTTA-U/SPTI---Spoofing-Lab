import express, { json } from 'express';
import { join, dirname } from 'node:path';
// ...existing code...
import { config } from 'dotenv';
import cors from 'cors';
import { fileURLToPath } from 'node:url';
import Joi from 'joi';
import helmet from 'helmet';
config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// ...existing code...
const app = express();
const PORT = process.env.PORT || 3000;
const corOptions = {
    origin: '*',
    methods: ['GET', 'POST'],
};
app.use(helmet())
app.use(cors(corOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname)));
app.use((err, _req, _res, _next) => {
    console.error(err.stack);
})
app.get('/', (_req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});
const loginSchema = Joi.object({
    userid: Joi.string().max(100).required(),
    password: Joi.string().required(),
});
app.post('/login', async (req, res) => {
    const { error } = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).send('Validation error');
    }
    res.status(200).send('Login recibido');
});

app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});