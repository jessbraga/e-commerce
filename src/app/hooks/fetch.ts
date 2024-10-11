import useSWR, { mutate, SWRConfiguration } from 'swr';
import { AxiosRequestConfig } from 'axios';
import { get } from '@/app/lib/api';


interface FetchError {
  message: string
  status?: number
}

export function useFetch<T>(url: string, config?: SWRConfiguration, requestConfig?: AxiosRequestConfig, ) {
  const { data, error, isLoading } = useSWR<T, FetchError>(url, () => get<T>(url, requestConfig), config)

  const reValidate = async () => {
    await mutate(url, data, false)
  }

  return {
    data,
    isLoading,
    isError: !!error,
    error,
    reValidate
  }
}
