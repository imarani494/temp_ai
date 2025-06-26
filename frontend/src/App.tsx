import { Auth0Provider } from '@auth0/auth0-react';
import AuthWrapper from './components/AuthWrapper';
import authConfig from './authConfig';

function App() {
  return (
    <Auth0Provider
      domain={authConfig.domain}
      clientId={authConfig.clientId}
      authorizationParams={{
        redirect_uri: authConfig.redirectUri,
        audience: authConfig.audience,
        scope: authConfig.scope
      }}
    >
      <AuthWrapper />
    </Auth0Provider>
  );
}

export default App;