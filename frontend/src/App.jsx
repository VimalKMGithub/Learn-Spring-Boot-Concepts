import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [csrfToken, setCsrfToken] = useState(null)
  const [testResponse, setTestResponse] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const init = async () => {
      try {
        // 1. Fetch CSRF Token
        const csrfRes = await axios.get('/csrf');
        const data = csrfRes.data;
        console.log('CSRF Data:', data);
        setCsrfToken(data);

        // 2. Set default Axios header
        // The token is usually in 'token' field, and header name in 'headerName'
        // We explicitly set it on the config to ensure it overrides any default cookie behavior
        const headerName = data.headerName;
        const token = data.token;

        axios.defaults.withCredentials = true;
        axios.defaults.headers.common[headerName] = token;

        // 3. Call /test endpoint with explicit header to be sure
        const config = {
          headers: {
            [headerName]: token
          },
          withCredentials: true
        };

        console.log('Sending request to /test with header:', config.headers);
        const testRes = await axios.post('/test', {}, config);
        console.log('Test Response:', testRes.data);
        setTestResponse(testRes.data);

      } catch (err) {
        console.error('Error:', err);
        setError(err.message || 'An error occurred');
      }
    };

    init();
  }, [])

  return (
    <div className="app-container">
      <h1>CSRF Token Fetcher</h1>
      <div className="card">
        {error && <p className="error">Error: {error}</p>}
        {csrfToken ? (
          <div className="csrf-info">
            <h3>CSRF Info</h3>
            <p><strong>Header Name:</strong> <span>{csrfToken.headerName}</span></p>
            <p><strong>Parameter Name:</strong> <span>{csrfToken.parameterName}</span></p>
            <p><strong>Token:</strong> <span className="token">{csrfToken.token}</span></p>
          </div>
        ) : (
          !error && <p>Loading CSRF token...</p>
        )}
      </div>

      <div className="card" style={{ marginTop: '20px' }}>
        <h3>Test Endpoint Response</h3>
        {testResponse ? (
          <p className="success-msg">{testResponse}</p>
        ) : (
          !error && csrfToken && <p>Calling /test...</p>
        )}
      </div>
    </div>
  )
}

export default App
