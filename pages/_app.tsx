import { AppProps } from "next/app"
import "styles/globals.css"
import "styles/base.css"

import { AuthProvider } from "contexts/AuthContext"

const MyApp = ({ Component, pageProps }: AppProps) => (
  <AuthProvider>
    <Component {...pageProps} />
  </AuthProvider>
)

export default (MyApp )