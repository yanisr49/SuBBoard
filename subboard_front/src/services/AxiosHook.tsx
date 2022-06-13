import axios from 'axios';
import React, { useState, useEffect } from 'react';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

const useAxios = (url: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', body?: string) => {
  const [response, setResponse] = useState<any>();
  const [error, setError] = useState('');
  const [loading, setloading] = useState(true);

  const fetchData = React.useCallback(() => {
    let call;

    if (method === 'POST') {
      call = axios.post(url, body);
    } else if (method === 'PUT') {
      call = axios.put(url, body);
    } else if (method === 'DELETE') {
      call = axios.delete(url);
    } else {
      call = axios.get(url);
    }

    call.then((res) => {
      setResponse(res.data);
    })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setloading(false);
      });
  }, [url, method, body]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return [response, error, loading, fetchData];
};

export default useAxios;
