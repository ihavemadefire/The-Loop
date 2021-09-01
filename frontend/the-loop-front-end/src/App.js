import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo'
import { Box, Container, ButtonGroup, Button } from '@material-ui/core';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';

import { theme } from './styles/theme.js';
//import { Chip } from './components/Chip.js'
import Footer from './components/Footer.js';
import LogoWithCatchphrase from './components/logos/logoWithCatchphrase.js';


const client = new ApolloClient({
	uri: "http://3.88.191.13:8000/___graphql"
});

function App() {
	const classes = useStyles();
  
	return (
		<ApolloProvider client={client}>
			<ThemeProvider theme={theme}>
				<Container maxWidth="sm">
					<Box className={classes.box} color="primary">
						<LogoWithCatchphrase />
						<ButtonGroup variant="text" size="large" color="primary" aria-label="large outlined primary button group">
							<Button className={classes.chips}>now</Button>
							<Button className={classes.chips}>later</Button>
						</ButtonGroup>
						<Button className={classes.mainButton} variant="contained" color="primary">loop me in</Button>
					</Box>
				</Container>
				<Footer />
			</ThemeProvider>
		</ApolloProvider>
	)
};

const useStyles = makeStyles({
	box: {
		display: 'flex',
		flexDirection: 'column',
		alignItems:'center'
	},
	mainButton: {
		marginTop: '2rem',
		fontWeight: 700,
		fontSize: '1.5rem',
		width: '80vw',
		maxWidth: '325px'
	},
	chips: {
		fontWeight: 500,
		fontSize: '1.2rem',
	}
});


export default App;