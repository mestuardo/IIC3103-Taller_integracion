import dbConnect from '../../../../util/mongoose'
import Album from '../../../../models/Album'
import Track from '../../../../models/Track'


export default async function userHandler(req, res) {
  const {
    query: {album_id},
    method,
  } = req
  
  await dbConnect()

  switch (method) {
    case 'GET':
      try{ 
      const album = await Album.findOne({id: album_id},{_id:0})
      // Get data from your database
      
      if (!album){
        return res.status(400).json([])
      }
      res.status(200).json(album)
    } catch(err){
      res.status(400).json(err)
    }
      break
    case 'DELETE':
      // Update or create data in your database
      try {
        await Album.deleteOne({id:album_id})
        await Track.deleteMany({album_id:album_id})
        res.status(204).json('álbum eliminado')
      }catch(err){
        rest.status(404).json('álbum no encontrado')
      }
      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
