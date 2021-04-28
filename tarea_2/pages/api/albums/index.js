import dbConnect from '../../../util/mongoose'
import Album from '../../../models/Album'

const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ['GET', 'POST'],
  })
)


export default async function handler(req, res) {  
  await cors(req, res)
  const { method } = req



  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const albums = await Album.find({},{_id:0}) /* find all the data in our database */
        res.status(200).json(albums)
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    default:
      res.status(400).json('METHOD NOT ALLOWED')
      break
  }
}