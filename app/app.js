const express = require('express');
const app = express();
const port = process.env.APP_PORT;

function fibonacci(n) {
    if (n <= 0) {
        return [];
    } else if (n === 1) {
        return [0];
    } else if (n === 2) {
        return [0, 1];
    } else {
        const fibArray = [0, 1];
        for (let i = 2; i < n; i++) {
            fibArray.push(fibArray[i - 1] + fibArray[i - 2]);
        }
        return fibArray;
    }
}

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.get('/fibonacci', (req, res) => {
    const result = fibonacci(req.query.n);
    res.send(result);

    // http://localhost:3000/fibonacci?n=10
});

app.listen(port, () => {
    console.log(`First exercise app listening on port ${port}`)
});