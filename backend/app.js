import express from 'express';

const app = express();

//sending a request in the server
app.get('/', (req, res) => {
	res.send('Hello World');
})

//setting up a listening port, this is only static, we can set this up dynamically later using .env dependencies
app.listen(3000, () => {
	console.log('I am listening in port 3000')
})

export default app