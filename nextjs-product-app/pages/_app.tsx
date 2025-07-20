import type { AppProps } from 'next/app';
import '../styles/globals.css'; // Tailwind CSSを読み込み

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default App;