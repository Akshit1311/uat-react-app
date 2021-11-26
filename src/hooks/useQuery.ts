import React, { useState } from "react";
import axios from "axios";
import https from "https";

const ERROR_INITIAL_STATE = { error: false, errorMessage: "" };

export function useQuery(apiUrl: string) {
  const [state, setState] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(ERROR_INITIAL_STATE);

  const fetch = async (url: string) => {
    setLoading(true);
    try {
      const response = await axios({
        url: url ? url : apiUrl,
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      });
      if (response.data) {
        setState(response.data);
      } else {
        setState([])
      }
      // console.log(response.data);
    } catch (error) {
      setState([])
      setError({ error: true, errorMessage: error });
    } finally {
      setLoading(false);
      console.log(state);
    }
  };
  return [fetch, state, loading, error];
}
