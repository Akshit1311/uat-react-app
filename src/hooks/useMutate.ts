import React, { useState } from "react";
import axios from "axios";
import https from "https";

const ERROR_INITIAL_STATE = { error: false, errorMessage: "" };

export function useMutate(apiUrl: string, initialState: any) {
  const [state, setState] = useState<any>(initialState ? initialState : []);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(ERROR_INITIAL_STATE);

  const fetch = async (body: any) => {
    setLoading(true);
    try {
      const config = {
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      };
      
     
      const response = await axios.post(apiUrl, body);
      setState(response.data);

      // if (response.data) {
      //   ("Filter", response.data);
      // } else {
      //   setState([]);
      // }
      // (response.data);
    } catch (error) {
      setState([]);
      setError({ error: true, errorMessage: error });
    } finally {
      setLoading(false);
      // ("Filter",state);
    }
  };
  return [fetch, state, loading, error];
}
