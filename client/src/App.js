import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import BookList from './components/BookList';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddBook from './components/AddBook';
const client = new ApolloClient({
  uri:'http://localhost:4000/graphql'
});
class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
          <div className="App">
              <h2>Graphqlapp</h2>
              <BookList/>
              <AddBook/>
          </div>
      </ApolloProvider>  
    );
  }
}

export default App;
