import dbConnect from '../../../../../util/mongoose'
import Album from '../../../../../models/Album'


export default async function userHandler(req, res) {
  const {
    query: {artist_id},
    method,
  } = req
  
  await dbConnect()

  switch (method) {
    case 'GET':
    try {
      const album = await Album.find({artist_id: artist_id},{_id:0})
      // Get data from your database
      res.status(200).json(album)
    } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      // Update or create data in your database
      const buff  = Buffer.from(req.body.name, 'utf-8')
      const IDbase64 = buff.toString('base64');
      try {
        const album = await Album.create(
          {id: IDbase64,
        artist_id: artist_id,
          name: req.body.name,
          genre: req.body.genre,
          artist: (req.connection && req.connection.encrypted ? 'https' : 'http')+ '://'+ req.headers.host +'/api/artists/' + artist_id  ,
          tracks: (req.connection && req.connection.encrypted ? 'https' : 'http')+ '://'+ req.headers.host +'/api/albums/' + IDbase64 +'/tracks' ,
          self: (req.connection && req.connection.encrypted ? 'https' : 'http')+ '://'+ req.headers.host +'/api/albums/' + IDbase64  
        
        }
        
        ) /* create a new model in the database */
        res.status(201).json(album.slice(1,artist.length-1))
      } catch (error) {
        const album = await Album.find({artist_id: artist_id},{id:0})
        res.status(400).json(album)
      }
      break

    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}