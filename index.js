const app = require('./app');
const PORT = 3333;

app.listen(PORT, () => {
    console.log(`Server has been started. PORT - ${PORT}`);
});