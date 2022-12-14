import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import Head from 'next/head';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import './PopOver.css';

const theme = createMuiTheme({
	palette: {
		background: {
			default: '#EEE',
		},
		primary: {
			main: '#673ab7',
		},
	},
});

const MyApp = ({ Component, pageProps }) => {
	useEffect(() => {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector('#jss-server-side');
		if (jssStyles) {
			jssStyles.parentElement.removeChild(jssStyles);
		}
	}, []);

	return (
		<>
			<Head>
				<title>Pokedex App</title>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			</Head>
			<ThemeProvider theme={theme}>
				<CssBaseline>
					<Component {...pageProps} />
				</CssBaseline>
			</ThemeProvider>
		</>
	);
};

export default MyApp;
