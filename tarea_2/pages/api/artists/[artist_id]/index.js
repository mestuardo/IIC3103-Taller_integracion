import dbConnect from '../../../../util/mongoose'
import Artist from '../../../../models/Artist'
import Album from '../../../../models/Album'
import Track from '../../../../models/Track'


export default async function userHandler(req, res) {
  const {
    query: {artist_id},
    method,
  } = req
  
  await dbConnect()

  switch (method) {
    case 'GET':
      try{ 
      const artist = await Artist.findOne({id: artist_id},{_id:0})
      // Get data from your database
      
      if (!artist){
        return res.status(400).json([])
      }
      res.status(200).json(artist)
    } catch(err){
      res.status(400).json(err)
    }
      break
    case 'DELETE':
      // Update or create data in your database
      try {
        var album_ids = [];
        const albums = await Album.find({artist_id: artist_id},{_id:0})
        albums.forEach(album => album_ids.push(album.id) )
        await Artist.deleteOne({id:artist_id})        
        await Album.deleteMany({artist_id:artist_id})
        await Track.deleteMany({album_id:{$in:album_ids }})

        res.status(204).json('artista eliminado')
      }catch(err){
        rest.status(404).json('artista inexistente')
      }
      break
    default:
      res.setHeader('Allow', ['GET', 'DELETE'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
