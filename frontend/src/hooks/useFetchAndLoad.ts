import { AxiosCall } from 'src/models/axios-call.model';
import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

const useFetchAndLoad = () => {
  const [loading, setLoading] = useState(false);
  let controller: AbortController;

  const callEndpoint = async (axiosCall: AxiosCall<any>) => {
    if (axiosCall.controller) controller = axiosCall.controller;
    setLoading(true);
    let result = {} as AxiosResponse<any>;
    try {
      result = await axiosCall.call;
    } catch (err: any) {
      setLoading(false);
      if (err?.message !== 'canceled') {
        throw err;
      }
    }

    setLoading(false);
    return result;
  };

  const cancelEndpoint = () => {
    setLoading(false);
    controller && controller.abort();
  };

  useEffect(
    () => () => {
      cancelEndpoint();
    },
    []
  );

  return { loading, setLoading, callEndpoint };
};

export default useFetchAndLoad;
