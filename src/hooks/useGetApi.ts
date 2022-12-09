import { useCallback } from 'react'
import useSWR from 'swr'
import { Api } from 'types/apiSchema'
import {
  StrictPropertyCheck,
  fetchApi,
  ApiResponseError,
} from 'utils/apiClient'

export const useGetApi = async <
  Url extends keyof Api['GET'],
  Request extends Api['GET'][Url][0],
  Response extends Api['GET'][Url][1],
>(
  url: Url,
  ...args: Request extends undefined
    ? []
    : [StrictPropertyCheck<Request, Api['GET'][Url][0]>]
) => {
  const fetcher = useCallback(
    async () => await fetchApi<Response>(url, 'GET', args.at(0)),
    [args, url],
  )
  return useSWR<Response, ApiResponseError>(
    `${url}${JSON.stringify(args.at(0))}`,
    fetcher,
    { revalidateOnReconnect: false },
  )
}
