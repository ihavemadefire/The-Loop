import './App.css';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo'
import Places from './Places'
import Events from './Events';


const client = new ApolloClient({
  uri: "http://3.88.191.13:8000/___graphql"
});

const App = () => (
  <ApolloProvider client={client}>
    <div className="section">
      <div>
        <Places />
      </div>
      <div>
        <Events />
      </div>
    </div>
  </ApolloProvider>
)

export default App;
