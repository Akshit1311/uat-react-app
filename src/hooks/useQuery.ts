import { useState } from "react";
import axios from "axios";

const ERROR_INITIAL_STATE = { error: false, errorMessage: "" };

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export function useQuery(apiUrl: string, type: any = "get") {
  const [state, setState] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(ERROR_INITIAL_STATE);

  const fetch = async (url: string) => {
    setLoading(true);
    try {
      if (type === "post") {
        let apiURL = url ? url : apiUrl;
        const response = await axios.post(apiURL);
        if (response.data) {         
          setState(response.data);
        } else {
          setState([]);
        }
      } else {
        const response = await axios({
          url: url ? url : apiUrl,
        });
        if (response.data) {        
          setState(response.data);
        } else {
          setState([]);
        }
      }
    } catch (error) {
      setState([]);
      setError({ error: true, errorMessage: error });
    } finally {
      setLoading(false);
    }
  };
  return [fetch, state, loading, error];
}
