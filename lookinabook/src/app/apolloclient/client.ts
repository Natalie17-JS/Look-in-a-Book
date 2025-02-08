import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
    link: new HttpLink({
      uri: '/api/graphql',  // Путь, по которому доступен ваш GraphQL сервер
      credentials: 'same-origin',  // Чтобы использовать cookies (если нужно)
    }),
    cache: new InMemoryCache(),
  });


export default client;
