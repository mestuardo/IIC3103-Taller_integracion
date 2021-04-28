import dbConnect from '../../../util/mongoose'
import Album from '../../../models/Album'


export default async function handler(req, res) {  
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