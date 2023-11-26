import { useEffect, useState } from "react";
// import { ApiSearchRequest } from "@/types/api/request";
// import { ApiSearchResponse } from "@/types/api/response";
// import { DC_API_SEARCH_URL } from "@/lib/endpoints";
// import { UserFacets } from "@/types/search-context";
// import { buildQuery } from "@/lib/queries/builder";

type ApiData = Response | null;
type ApiError = string | null;
type Response = {
  data: ApiData;
  error: ApiError;
  loading: boolean;
};

const urlString = "http://localhost:3000";

function useFetch(url: string) {
  const [data, setData] = useState<ApiData>(null);
  const [loading, setLoading] = useState<null | boolean | string>(null);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    setLoading("loading...");
    setData(null);
    setError(null);
    //   const source = axios.CancelToken.source();
    // console.log("before the fetch", `${urlString}${url}`);
    fetch(`${urlString}${url}`)
      .then((res: any) => {
        setLoading(false);
        console.log("inside the fetch");
        // console.log(res);
        //checking for multiple responses for more flexibility
        //with the url we send in.
        res.data.content && setData(res.data.content);
        res.content && setData(res.content);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError("An error occurred. Awkward..");
      });
    return () => {
      //   source.cancel();
    };
  }, [url]);

  return { data, loading, error };
}

// export default useFetch;
