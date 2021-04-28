import dbConnect from '../../../../../util/mongoose'
import Track from '../../../../../models/Track'
import Album from '../../../../../models/Album'


export default async function userHandler(req, res) {
  const {
    query: {album_id},
    method,
  } = req
  
  await dbConnect()

  switch (method) {
    case 'GET':
    try {
      const track = await Track.find({album_id: album_id},{_id:0})
      // Get data from your database
      res.status(200).json(track)
    } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      // Update or create data in your database
      const buff  = Buffer.from(req.body.name, 'utf-8')
      const IDbase64 = buff.toString('base64');
      try {
        const album = await Album.findOne({id: album_id},{_id:0})
        const track = await Track.create(
          {id: IDbase64,
          album_id: album_id,
          name: req.body.name,
          duration: req.body.duration,
          times_played: 0,
          artist: (req.connection && req.connection.encrypted ? 'https' : 'http')+ '://'+ req.headers.host +'/api/artists/' + album.artist_id  ,
          album: (req.connection && req.connection.encrypted ? 'https' : 'http')+ '://'+ req.headers.host +'/api/albums/' + album_id ,
          self: (req.connection && req.connection.encrypted ? 'https' : 'http')+ '://'+ req.headers.host +'/api/tracks/' + IDbase64  
        
        }
        
        ) /* create a new model in the database */
        res.status(201).json(track.slice(1,artist.length-1))
      } catch (error) {
        const track = await Track.findOne({album_id: album_id},{_id:0})
        res.status(400).json(track)
      }
      break

    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}