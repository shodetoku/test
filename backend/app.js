import express from 'express';

const app = express();

app.get('/', (req, res) => {
	res.send('Hello World');
})

app.listen(3000, () => {
	console.log('I am listening in port 3000')
})

export default app