import { useState } from 'react';
import { AxiosRequestConfig } from 'axios';
import { post, put } from '@/app/lib/api'

export function usePush<T,D>(url: string, requestType: string = "POST", config?: AxiosRequestConfig) {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const loadData = async (payload?: any) => {
    let response
    setIsLoading(true)
    try {
      if (requestType === "PUT") {
        response = await put<T,D>(url, payload, config)
      } else {
        response = await post<T,D>(url, payload, config)
      }
    } catch (error: any) {
      response = { error: error.message }
    }
    setIsLoading(false)
    return response
  }

  return { loadData, isLoading };
};
