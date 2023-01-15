import { NextApiRequest, NextApiResponse } from 'next'
import { isEmptyObj } from 'utils/isEmptyObj'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + '/v1/edits',
        {
          method: 'POST',
          body: isEmptyObj(req.body) ? null : JSON.stringify(req.body),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.API_KEY}`,
          },
        },
      )

      if (!response.ok) {
        throw new Error()
      }

      try {
        return res.json(await response.json())
      } catch (error) {
        throw new Error()
      }
    } catch (error) {
      return res.status(500).json({ massage: 'server error' })
    }
  }
}
