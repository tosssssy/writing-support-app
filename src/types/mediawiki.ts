export type MediaWikiRequest = {
  title: string
}

export type MediaWikiResponse = {
  batchcomplete: string
  query: {
    normalized: {
      from: string
      to: string
    }[]
    redirects: {
      from: string
      to: string
    }[]
    pages: {
      [pageNo: string]: {
        pageid: number
        ns: number
        title: string
        extract: string
      }
    }
  }
}
