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

      console.log(response.ok)
      if (!response.ok) {
        return res.status(400).json({ massage: 'server error' })
      }
      return res.json(await response.json())
    } catch (error) {
      return res.status(400).json({ massage: 'server error' })
    }
  }
}
