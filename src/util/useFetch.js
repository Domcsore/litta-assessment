import React from 'react';

// useFetch hook takes a string 'endpoint' and fetches data using a get request.
// Note - I would have used a more granular error state for better consumption.
export const useFetch = (endpoint) => {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async (internalEndpoint) => {
      setLoading(true);
      try {
        const fetchResponse = await window.fetch(internalEndpoint);
        if (fetchResponse.status === 200) {
          const responseJson = await fetchResponse.json();
          setData(responseJson);
        } else {
          setError('Could not fetch request');
        }
      } catch(e) {
        // Option to handle different error responses.
        if (e instanceof DOMException) {
          setError(e.message);
        } else if (e instanceof TypeError) {
          setError(e.message)
        } else {
          setError(e.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData(endpoint);
  }, [endpoint]);

  return [data, loading, error];
}