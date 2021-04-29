import dbConnect from '../../../../util/mongoose'
import Artist from '../../../../models/Artist'
import Album from '../../../../models/Album'
import Track from '../../../../models/Track'

import Cors from 'cors'
import initMiddleware from '../../../../util/init-middleware'


const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ['GET', 'POST','PUT','DELETE'],
  })
)


export default async function userHandler(req, res) {
  await cors(req, res)
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
        return res.status(404).json('artista no encontrado')
      }
      res.status(200).json(artist)
    } catch(err){
      res.status(400).json(err)
    }
      break
    case 'DELETE':
      // Update or create data in your database
        const artist = await Artist.findOne({id:artist_id},{_id:0})
        var album_ids = [];
        const albums = await Album.find({artist_id: artist_id},{_id:0})        
        

        if (artist){
        await Artist.deleteOne({id:artist_id}, function(err,obj){
          if (err) {return res.status(404).json(err)} 
        })  
      } else {
        return res.status(404).json('artista inexistente')
      }     

        if (albums.length>0){
        albums.forEach(album => album_ids.push(album.id) )
        await Album.deleteMany({artist_id:artist_id},function(err,res){
          if (err) { } });

        const tracks = await Track.find({album_id: {$in:album_ids}},{_id:0})
          if (tracks.length>0){
        await Track.deleteMany({album_id:{$in:album_ids }},function(err,res){
          if (err) { } });
        }
        }
      
        res.status(204).json('artista eliminado')

        

      break
    default:
      res.setHeader('Allow', ['GET', 'DELETE'])
      res.status(405).end(`Method ${method} Not Allowed`)
      break
  }
}
