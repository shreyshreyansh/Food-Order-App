import { useCallback, useState } from "react";

import HttpMethodTypes from "../enums/http-method-types";

const useApi = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = useCallback(async (request) => {
    setIsLoading(true);
    try {
      console.log("API CALLED!!!");
      const response = await fetch(request.url, {
        method: request.method ?? HttpMethodTypes.GET,
        headers: request.headers ?? {},
        body: request.body ? JSON.stringify(request.body) : null
      });
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const json = await response.json();
      setData(json);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    data,
    error,
    isLoading,
    sendRequest
  };
};

export default useApi;
