import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo'
import { ThemeProvider } from '@material-ui/core/styles';

import { theme } from './styles/theme.js';
import LandingForm from './components/LandingForm.js';
import MainApp from './components/MainApp.js';
import Footer from './components/Footer.js';


const client = new ApolloClient({
	//uri: "http://3.88.191.13:8000/___graphql"
  uri: "http://44.198.144.202:8000/___graphql"
});

function App() {
  
	return (
		<ApolloProvider client={client}>
			<ThemeProvider theme={theme}>
				<LandingForm />
				<MainApp />
				<Footer />
			</ThemeProvider>
		</ApolloProvider>
	)
};

export default App;