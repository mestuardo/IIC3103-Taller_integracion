import dbConnect from '../../../../../util/mongoose'
import Album from '../../../../../models/Album'
import Track from '../../../../../models/Track'


export default async function userHandler(req, res) {
  const {
    query: {artist_id},
    method,
  } = req
  
  await dbConnect()

  switch (method) {
    case 'PUT':
      try{ 
        var album_ids = [];
        const albums = await Album.find({artist_id: artist_id},{_id:0})
        albums.forEach(album => album_ids.push(album.id) )
        

        await Track.updateMany({album_id: {$in: album_ids}},{$inc: { times_played: 1 }})



      res.status(200).json('todas las canciones del artista fueron reproducidas')
    } catch(err){
      res.status(404).json('artista no encontrado')
    }
      break

    default:
      res.setHeader('Allow', ['PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
