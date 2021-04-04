const express = require('express');
const app = express();
require('./config/env/config');

const docsRoutes = require('./routes/swagger');
const bookRouter = require('./routes/book_routes');
const documentRoutes = require('./routes/document_routes');
const requestRoutes = require('./routes/request_routes')
const userRoutes = require('./routes/user_routes');


//  Settings
app.set('PORT', process.env.PORT);
app.use(express.json());

app.use('/api/docs', docsRoutes);
app.use('/api/book', bookRouter);
app.use('/api/documents', documentRoutes)
app.use('/api/requests', requestRoutes);
app.use('/api/users', userRoutes);

app.get('*', (req, res) => {
  res.status(404).send({ error: 'Route not found' });
});

app.listen(app.get('PORT'), () => {
  console.log('server listening on port: ' + app.get('PORT'));
});
