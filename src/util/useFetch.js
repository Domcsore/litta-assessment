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
        const fetchResponse = await window.fetch(internalEndpoint, {method: 'get'});
        if (fetchResponse.status === 200) {
          const responseJson = await fetchResponse.json();
          console.log(responseJson);
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

export const useFetchCountryNames = () => {
  return useFetch('http://country.io/names.json');
}

export const useFetchCapitals = () => {
  return useFetch('http://country.io/capital.json');
}

export const useFetchPhoneCodes = () => {
  return useFetch('http://country.io/phone.json');
}

export const useFetchCurrencyCodes = () => {
  return useFetch('http://country.io/currency.json');
}