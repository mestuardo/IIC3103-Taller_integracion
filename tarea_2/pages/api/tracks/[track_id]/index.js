import dbConnect from '../../../../util/mongoose'
import Track from '../../../../models/Track'


export default async function userHandler(req, res) {
  const {
    query: {track_id},
    method,
  } = req
  
  await dbConnect()

  switch (method) {
    case 'GET':
      try{ 
      const track = await Track.findOne({id: track_id},{_id:0})
      // Get data from your database
      
      if (!track){
        return res.status(400).json([])
      }
      res.status(200).json(track)
    } catch(err){
      res.status(400).json(err)
    }
      break
    case 'DELETE':
      // Update or create data in your database
      try {
        await Track.deleteOne({id:track_id})
        res.status(204).json('canción eliminada')
      }catch(err){
        rest.status(404).json('canción inexistente')
      }
      
      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
