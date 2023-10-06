import { AppProps } from "next/app"
import "styles/globals.css"
import "styles/base.css"

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
)

export default (MyApp )