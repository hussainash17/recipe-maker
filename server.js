const express = require('express');
const mongoose = require('mongoose');

const Recipe = require('./models/Recipe');
const User = require('./models/User');

const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();

require('dotenv').config({
  path: 'variables.env',
});

const { graphiqlExpress, graphqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

const { resolvers } = require('./resolvers');
const { typeDefs } = require('./schema');

const schema = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers,
});

const corsOption = {
  origin: "http://localhost:3000",
  credentials: true
}

app.use(cors(corsOption))

app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql',
  })
);

app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress({
    schema,
    context: {
      Recipe,
      User,
    },
  })
);

mongoose
  .connect(process.env.MONGO_URI, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('DB connected successfully');
  })
  .catch((err) => {
    console.log(err);
  });

app.get('/', (req, res) => {
  res.send('Hello');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started at PORT ${PORT}`);
});
