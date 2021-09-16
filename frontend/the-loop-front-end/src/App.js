import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo'
import { ThemeProvider } from '@material-ui/core/styles';
import { Route } from "react-router-dom";

import { theme } from './styles/theme.js';
import LandingForm from './components/LandingForm.js';
import MainApp from './components/MainApp.js';
import Footer from './components/Footer.js';


const client = new ApolloClient({
  uri: "http://44.198.144.202:8000/___graphql"
});

function App() {
  
	return (
		<ApolloProvider client={client}>
			<ThemeProvider theme={theme}>
				<Route exact path='/'><LandingForm /></Route>
				<Route exact path='/app'><MainApp /></Route>
				<Footer />
			</ThemeProvider>
		</ApolloProvider>
	)
};

export default App;