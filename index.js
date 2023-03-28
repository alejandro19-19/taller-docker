const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const path = require('path');

// Define el esquema de GraphQL
const typeDefs = gql`
  type Query {
    hello(message: String!): String
    date(message:String!): String
    count(message: String!): String
    hour(message: String!): String
    reverse(message: String!): String
  }
`;

// Define los resolvers de GraphQL
const resolvers = {
  Query: {
    hello: (_, { message }) => {
        return `¡Hola, ${message}! Un saludo por parte del profe `;
      },
    date:(_, { message }) => {
      
      // crea un nuevo objeto `Date`
      var today = new Date();

      // `getDate()` devuelve el día del mes (del 1 al 31)
      var day = today.getDate();

      // `getMonth()` devuelve el mes (de 0 a 11)
      var month = today.getMonth() + 1;

      // `getFullYear()` devuelve el año completo
      var year = today.getFullYear();

      var formato = `${day}/${month}/${year}`
      // muestra la fecha de hoy en formato `MM/DD/YYYY`

      return `¡Hola, ${message}! hoy es ${formato}`;
    },
    count: (_, { message }) => {
      count = message.length
      return `¡Hola, ${message}! Tu nombre tiene ${count} caracteres`;
    },
    hour: (_, { message }) => {
      // crea un nuevo objeto `Date`
      var today = new Date();
      
      // obtener la hora en la configuración regional de EE. UU.
      var now = today.toLocaleTimeString('en-US');
      
      return `¡Hola, ${message}! La hora actual es ${now}`;
    },
    reverse: (_, { message }) => {
      let arrStr = (message).split("");
      let newWord = (arrStr.reverse().join("")).toUpperCase()
      return `¡Hola, ${message}! Tu nombre al revés es ${newWord}`;
    },
  },
};

async function startApolloServer() {
  // Crea la instancia de Apollo Server
  const server = new ApolloServer({ typeDefs, resolvers });

  // Inicia el servidor Apollo
  await server.start();

  // Crea la aplicación Express
  const app = express();

  // Aplica el middleware de Apollo Server a la aplicación Express
  server.applyMiddleware({ app, path: '/graphql' });

  // Sirve la aplicación de React desde la carpeta "saludofront-app"
  const reactAppPath = path.join(__dirname, 'saludofront-app', 'dist');
  app.use(express.static(reactAppPath));
  app.get('*', (req, res) => {
  res.sendFile(path.join(reactAppPath, 'index.html'));
  });

  // Inicia el servidor
  const PORT = 4000;
  app.listen(PORT, () => {
    console.log(`Servidor GraphQL ejecutándose en http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startApolloServer();
