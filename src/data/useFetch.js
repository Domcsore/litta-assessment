import React from 'react';


// useFetch hook takes a string 'endpoint' and fetched data using a get request.
export const useFetch = (endpoint) => {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async (internalEndpoint) => {
      setLoading(true);
      try {
        const fetchResponse = await window.fetch(internalEndpoint);
        // TODO handle response data;
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