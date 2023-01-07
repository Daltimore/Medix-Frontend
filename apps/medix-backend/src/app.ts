import Express from 'express';

const PORT = process.env.PORT || 4000;

const app = Express();

app.use('/', (_, res) => {
    res.send('Hello, from Medix');
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});