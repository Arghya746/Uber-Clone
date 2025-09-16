const http = require('http');
const app = require('./app');
const cors = require('cors');

const port = process.env.PORT || 4000;

// Enable CORS for frontend
app.use(cors({
    origin: "http://localhost:5173", // your frontend
    credentials: true
}));

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
