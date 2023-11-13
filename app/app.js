const express = require('express');
const app = express();
const port = process.env.APP_PORT;

function calculator(operator, ...numbers) {
    if (operator === 'add') {
        return numbers.reduce((acc, num) => acc + num, 0);
    } else if (operator === 'subtract') {
        return numbers.reduce((acc, num) => acc - num);
    } else {
        return 'Unsupported operator';
    }
}

app.get('/', (req, res) => {
    res.send('Go to calculator by clicking <a href="/calculator?operator=add&numbers=1,12,123">here</a>.');
});

app.get('/calculator', (req, res) => {
    const operator = req.query.operator;
    const numbers = req.query.numbers.split(',').map(Number);

    if (operator && numbers && numbers.length > 0) {
        const result = calculator(operator, ...numbers);
        res.send(result.toString()); // Convert the result to a string before sending
    } else {
        res.status(400).send('Invalid input');
    }

    // http://localhost:3000/calculator?operator=subtract&numbers=3,4,123
});

app.listen(port, () => {
    console.log(`First exercise app listening on port ${port}`);
});