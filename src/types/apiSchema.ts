import { EditsRequest, EditsResponse } from './edits'
import { MediaWikiRequest, MediaWikiResponse } from './mediawiki'
import { HttpMethod } from 'utils/apiClient'

type Schema<
  T extends Record<
    HttpMethod,
    { [url: string]: [object | undefined, object | undefined] }
  >,
> = T

export type Api = Schema<{
  // メソッド名: {
  //   url: [リクエストの型、レスポンスの型]
  // }
  GET: {
    '/api/media-wiki': [MediaWikiRequest, MediaWikiResponse]
  }
  POST: {
    '/api/edits': [EditsRequest, EditsResponse]
  }
  PUT: {}
  DELETE: {}
}>
