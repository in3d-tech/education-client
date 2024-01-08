import { useEffect, useState } from "react";

type FetchObj = {
  method: string | undefined;
  headers: { [key: string]: string };
  body?: any;
};

const baseUrl = "http://localhost:3000";

export const useFetch = (
  endpoint: string,
  body?: any,
  method: string = "POST",
  contentType: string = "application/json"
) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const url = `${baseUrl}${endpoint}`;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const fetchObj: FetchObj = {
          method,
          headers: { "Content-Type": contentType },
          body: body,
        };
        const res = await fetch(url, fetchObj);
        const data = await res.json();
        setResponse(data);
        setIsLoading(false);
      } catch (error: any) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, method, contentType, body]); // dependency array

  return { response, error, isLoading };
};

// export const useFetch = (
//   endpoint: string,
//   body: any,
//   method?: string | null,
//   contentType?: string | null
// ) => {
//   const [response, setResponse] = useState(null);
//   const [error, setError] = useState(null);
//   const url = `${baseUrl}${endpoint}`;

//   const fetchObj: FetchObj = {
//     method: method || "POST",
//     headers: {
//       "Content-Type": contentType || "application/json",
//     },
//   };
//   if (body) {
//     fetchObj.body = body;
//   }

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await fetch(url, fetchObj);
//         const data = await res.json();
//         setResponse(data);
//       } catch (error: any) {
//         setError(error);
//       }
//     };

//     fetchData();
//   }, [url]);

//   return { response, error };
// };
