import { useRouter } from 'next/router'
import styles from '../../styles/Home.module.css'
import Head from 'next/head'
import fetch from 'node-fetch'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));


const Post = ({personaje}) => {

const classes = useStyles();
const router = useRouter();

if (router.isFallback) {
  try {
  return   ( 
    <div className={styles.container}>
      <main className={styles.main}>
  <Backdrop className={classes.backdrop}>
  <CircularProgress color="primary" />
</Backdrop>
</main>
</div>)
}catch(error){
  return <div>Error :D</div>
}
}

  return (<div className={styles.container}>
<Head>
<title>{personaje.name}</title>
  <link rel="icon" href="/favicon.ico" />
</Head>

<main className={styles.main}>


      {/* <Link href={`/BB`}>
      <p className={styles.description}>
   <img style={{height:'72px'}}
          src="https://upload.wikimedia.org/wikipedia/commons/7/77/Breaking_Bad_logo.svg"/>
           
      </p>
      </Link> */}
  <h3>{personaje.name}</h3>


  <div className={styles.gridDetalles}>
  

  <Card className={styles.imgDetalles} >
      <CardActionArea >
      <div style={{width:'300px',height:'400px',backgroundImage:"url("+personaje.img+")",backgroundSize:'cover'}}>
        </div>
      </CardActionArea>
    </Card>


    <Card style={{width:'300px',margin:'10px'}}>
     
        <CardContent>
          <Typography gutterBottom variant="body1" component="h6">
          "{personaje.nickname}"
          </Typography>
          <Typography variant="body1" component="h3">Status</Typography>
          <Typography variant="body2" color="textSecondary" component="h3"> {personaje.status}</Typography>
          <Typography  variant="body1" component="h2">
            Ocupación
          </Typography>
          {personaje.occupation.map((occu) => (
          <Typography key={occu} variant="body2" color="textSecondary" component="p">
           {occu}
          </Typography>
          ))}
          <Typography variant="body1" component="p">
            Actor
          </Typography>
          <Typography gutterBottom variant="body2" color="textSecondary" component="p">
           {personaje.portrayed}
          </Typography>
          <Typography  variant="body1" component="h2">
            Temporadas aparición BB
          </Typography>
          {personaje.appearance.map((temporada) => (
          <Typography key={temporada} variant="body2" color="textSecondary" component="p">
           <Link href={"/BB/"+temporada} >Temporada {temporada} </Link>
          </Typography>
          ))}
                    <Typography  variant="body1" component="h2">
            Temporadas aparición BCS
          </Typography>
          {personaje.better_call_saul_appearance.map((temporada) => (
          <Typography key={temporada} variant="body2" color="textSecondary" component="p">
           <Link href={"/BCS/"+temporada} >Temporada {temporada} </Link>
          </Typography>
          ))}
        </CardContent>

    </Card>



  </div>


  </main>
  </div>


  )}

export default Post





export async function getStaticProps({ params }) {
    const res_00 = await fetch('https://tarea-1-breaking-bad.herokuapp.com/api/characters?offset=0')
   

    var data = await res_00.json()

    var i

    for (i = 10; i < 100; i=i+10) {
      var res = await fetch('https://tarea-1-breaking-bad.herokuapp.com/api/characters?offset='+i)
      var data_1 = await res.json()
      if (data_1.length==0) { break; 
      }else{
        data = data.concat(data_1);
      }
   
    }

    let pers = data.filter(x => x.name.toString() == params.name);  
    
    

  

    // let psj = data.filter(x => x.name.toString() == params.name);    
  
    return {
      props: {
          personaje: pers[0]
      },
      revalidate: 3600, 
    };
  }


  function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [day, month, year].join('/');
}

  export async function getStaticPaths() {
    const res_00 = await fetch('https://tarea-1-breaking-bad.herokuapp.com/api/characters?offset=0')
    // const res_01 = await fetch('https://tarea-1-breaking-bad.herokuapp.com/api/characters?offset=10')
    // const res_02 = await fetch('https://tarea-1-breaking-bad.herokuapp.com/api/characters?offset=20')
    // const res_03 = await fetch('https://tarea-1-breaking-bad.herokuapp.com/api/characters?offset=30')
    

    var data = await res_00.json()
    // const data_01 = await res_01.json()
    // const data_02 = await res_02.json()
    // const data_03 = await res_03.json()

    // var data = data_00.concat(data_01,data_02,data_03)
    


    var i

    for (i = 10; i < 30; i=i+10) {
      var res = await fetch('https://tarea-1-breaking-bad.herokuapp.com/api/characters?offset='+i)
      var data_1 = await res.json()
      if (data_1.length==0) { break; 
      }else{
        data = data.concat(data_1);
      }
   
    }


    // Get the paths we want to pre-render based on posts
    const paths = data.map(character => ({
        params: {name: character.name.toString() },
    }));

    // We'll pre-render only these paths at build time.
    return {paths, fallback: true}
}




