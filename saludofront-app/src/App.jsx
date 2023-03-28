import React, { useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, useLazyQuery, gql } from '@apollo/client';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

const HELLO_QUERY = gql`
  query Hello($message: String!) {
    hello(message: $message)
  }
`;
const DATE_QUERY = gql`
  query Date($message: String!) {
    date(message: $message)
  }
`;
const COUNT_QUERY = gql`
  query Count($message: String!) {
    count(message: $message)
  }
`;
const HOUR_QUERY = gql`
  query Hour($message: String!) {
    hour(message: $message)
  }
`;
const REVERSE_QUERY = gql`
  query Reverse($message: String!) {
    reverse(message: $message)
  }
`;

function Hello() {
  const [message, setMessage] = useState('');
  const [getGreeting, { loading, error, data }] = useLazyQuery(HELLO_QUERY);

  const handleSubmit = (e) => {
    e.preventDefault();
    getGreeting({ variables: { message } });
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formMessage">
          <Form.Control
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escribe tu mensaje"
          />
        </Form.Group>
        <Button className='mt-2' variant="primary" type="submit">
          Enviar
        </Button>
      </Form>
      {data && <h2 className='mt-3'>{data.hello}</h2>}
    </div>
  );
}

function Date() {
  const [message, setMessage] = useState('');
  const [getGreeting, { loading, error, data }] = useLazyQuery(DATE_QUERY);

  const handleSubmit = (e) => {
    e.preventDefault();
    getGreeting({ variables: { message } });
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formMessage">
          <Form.Control
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escribe tu mensaje"
          />
        </Form.Group>
        <Button className='mt-2' variant="primary" type="submit">
          Enviar
        </Button>
      </Form>
      {data && <h2 className='mt-3'>{data.date}</h2>}
    </div>
  );
}

function Count() {
  const [message, setMessage] = useState('');
  const [getGreeting, { loading, error, data }] = useLazyQuery(COUNT_QUERY);

  const handleSubmit = (e) => {
    e.preventDefault();
    getGreeting({ variables: { message } });
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formMessage">
          <Form.Control
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escribe tu mensaje"
          />
        </Form.Group>
        <Button className='mt-2' variant="primary" type="submit">
          Enviar
        </Button>
      </Form>
      {data && <h2 className='mt-3'>{data.count}</h2>}
    </div>
  );
}

function Hour() {
  const [message, setMessage] = useState('');
  const [getGreeting, { loading, error, data }] = useLazyQuery(HOUR_QUERY);

  const handleSubmit = (e) => {
    e.preventDefault();
    getGreeting({ variables: { message } });
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formMessage">
          <Form.Control
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escribe tu mensaje"
          />
        </Form.Group>
        <Button className='mt-2' variant="primary" type="submit">
          Enviar
        </Button>
      </Form>
      {data && <h2 className='mt-3'>{data.hour}</h2>}
    </div>
  );
}

function Reverse() {
  const [message, setMessage] = useState('');
  const [getGreeting, { loading, error, data }] = useLazyQuery(REVERSE_QUERY);

  const handleSubmit = (e) => {
    e.preventDefault();
    getGreeting({ variables: { message } });
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formMessage">
          <Form.Control
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escribe tu mensaje"
          />
        </Form.Group>
        <Button className='mt-2' variant="primary" type="submit">
          Enviar
        </Button>
      </Form>
      {data && <h2 className='mt-3'>{data.reverse}</h2>}
    </div>
  );
}

function App() {
  return (
    <ApolloProvider client={client}>
      <Container className="my-5">
        <Row>
          <Col xs={12} md={{ span: 6, offset: 3 }}>
            <h1>Aplicación React y GraphQL</h1>
            <div>
              <Hello />
            </div>
            <br></br>
            <h3>Feature de Alejandro Peñaranda</h3>
            <div>
              <Date />
            </div>
            <br></br>
            <h3>Feature de Alejandro Escobar</h3>
            <div>
              <Count />
            </div>
            <br></br>
            <h3>Feature de Juan Camilo Santa</h3>
            <div>
              <Hour />
            </div>
            <br></br>
            <h3>Feature de Diego Chaverra</h3>
            <div>
              <Reverse />
            </div>
          </Col>
        </Row>
      </Container>
    </ApolloProvider>
  );
}

export default App;