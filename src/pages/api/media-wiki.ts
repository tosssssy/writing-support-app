import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    try {
      const response = await fetch(
        `https://ja.wikipedia.org/w/api.php?origin=*&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${req.query.title}&format=json`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      if (!response.ok) {
        return res.status(500).json({ massage: 'server error' })
      }
      return res.json(await response.json())
    } catch (error) {
      return res.status(500).json({ massage: 'server error' })
    }
  }
}
