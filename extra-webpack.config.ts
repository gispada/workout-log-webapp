import { EnvironmentPlugin, Configuration } from 'webpack'
import 'dotenv/config'

const webpackConfig: Configuration = {
  resolve: {
    // No polyfills
    fallback: {
      crypto: false,
      stream: false
    }
  },
  plugins: [new EnvironmentPlugin(['REALM_APP_ID', 'MONGO_DB_NAME'])]
}

export default webpackConfig
