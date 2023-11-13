import express, {Express, Request, Response} from 'express';

const app: Express = express();
const port: number = parseInt(process.env.APP_PORT);

function fibonacci(n: number): number[] {
    if (n <= 0) {
        return [];
    } else if (n === 1) {
        return [0];
    } else if (n === 2) {
        return [0, 1];
    } else {
        const fibArray: number[] = [0, 1];
        for (let i = 2; i < n; i++) {
            fibArray.push(fibArray[i - 1] + fibArray[i - 2]);
        }
        return fibArray;
    }
}

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

app.get('/fibonacci', (req: Request, res: Response) => {
    const n: number = parseInt(req.query.n as string, 10);
    const result: number[] = fibonacci(n);
    res.send(result);
});

app.listen(port, () => {
    console.log(`First exercise app listening on port ${port}`);
});
