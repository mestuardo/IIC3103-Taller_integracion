import GridListTile from '@material-ui/core/GridListTile'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

    GridListTile: {
        width: '250px',
        

    },
    code :{
        color: '#0b7fab'
    },
    title:{
        color: '#0b7fab'
      }

    

}));

export default function flightCard({flight}) {
    const classes = useStyles();

    return(
        <GridListTile key={flight.code} className={classes.GridListTile}>
        <Card 
        
        key={flight.code}
        style={{width:'inherit',margin:'20px',textAlign:'center',backgroundColor:'#f4d75e'}}>
        <Typography className={classes.code} variant="h6" component="h1">
        {flight.code}
      </Typography>
      <Typography className={classes.code}  variant="body1" component="h2" gutterBottom>
        {flight.airline}
      </Typography>
      <Typography className={classes.code}  variant="body1" component="h2" gutterBottom>
        {flight.plane}
      </Typography>
      <Typography className={classes.title} variant="body1" component="h2" gutterBottom>
        Passengers
      </Typography>
      {flight.passengers.map((passenger)=>
      <Typography key={passenger.name} variant="caption" component="h2" gutterBottom>
        {passenger.name}, {passenger.age} años
      </Typography>
      
          )}
        <Typography className={classes.title} variant="body1" component="h2" gutterBottom>
        Origin
      </Typography>
      <Typography variant="caption" component="h2" gutterBottom>
        {flight.origin}
      </Typography>
      <Typography className={classes.title} variant="body1" component="h2" gutterBottom>
        Destination
      </Typography>
      <Typography variant="caption" component="h2" gutterBottom>
        {flight.destination}
      </Typography>
      <Typography className={classes.title} variant="body1" component="h2" gutterBottom>
        Seats
      </Typography>
      <Typography variant="caption" component="h2" gutterBottom>
        {flight.seats}
      </Typography>

        </Card>


        </GridListTile>
     
      
    )
}