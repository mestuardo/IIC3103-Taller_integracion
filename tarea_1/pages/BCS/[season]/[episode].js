import { useRouter } from 'next/router'
import styles from '../../../styles/Home.module.css'
import Head from 'next/head'
import fetch from 'node-fetch'


import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import DefaultErrorPage from 'next/error'

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



function caratulas(temporada){
  if (temporada==1){
    return "https://upload.wikimedia.org/wikipedia/en/f/f2/Better_Call_Saul_Season_1.png"
  }
  else if (temporada==2) {
    return "https://upload.wikimedia.org/wikipedia/en/1/19/Better_Call_Saul_Season_2.jpg"
  }
  else if (temporada==3) {
    return "https://upload.wikimedia.org/wikipedia/en/a/a0/Better_Call_Saul_Season_3.jpg"
  }
  else if (temporada==4) {
    return "https://upload.wikimedia.org/wikipedia/en/c/cc/Better_Call_Saul_Season_4.jpg"
  }
}


const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: 'white',
  },
}));


const Post = ({episodio}) => {

const classes = useStyles();

const router = useRouter()

if (router.isFallback) {
  return   (    <div className={styles.container}>
    <Head>
      <title>Cargando...</title>
 
    </Head>

    <main className={styles.main}>
  <Backdrop className={classes.backdrop} open={true}>
  <CircularProgress color="primary" />
</Backdrop>
</main>
</div>)
}

if(!episodio) {
  return (<>
    <Head>
      <meta name="robots" content="noindex"></meta>
    </Head>
    <DefaultErrorPage statusCode={404} />
  </>)
}

  return (<div className={styles.container}>
<Head>
  <title>Episodio N° {episodio.episode} - Temporada {episodio.season} - Better Call Saul</title>
  <link rel="icon" href="/favicon.ico" />
</Head>

<main className={styles.main}>


      <Link href={`/BCS`}>
      <p className={styles.description}>
   <img style={{width:'150px'}}
          src="https://www.dafont.com/forum/attach/orig/4/8/483649.png"/>
           
      </p>
      </Link>

  <h3>Episodio N° {episodio.episode}</h3>



  <div className={styles.gridDetalles} key={episodio.episode_id}>
  

  <Card className={styles.imgDetalles}>
      <CardActionArea>
      <div className={styles.imgDetalles} style={{backgroundImage:"url("+caratulas(episodio.season)+ ")",backgroundSize:'cover'}}>
          {episodio.episode}
        </div>

      </CardActionArea>
    </Card>


    <Card style={{width:'300px',margin:'10px'}}>
     
        <CardContent>
        <Typography gutterBottom variant="h6" component="h2">
          {episodio.title}
          </Typography>
          <Typography variant="body1"  component="p">Salida al aire</Typography>
          <Typography gutterBottom variant="body2" color="textSecondary">{formatDate(episodio.air_date)}</Typography>
          <Typography variant="body2"component="p">
            Temporada N°
          </Typography>
          <Typography gutterBottom variant="body2" color="textSecondary" component="p">
           {episodio.season}
          </Typography>
          <Typography variant="h6" component="h2">
            Personajes
          </Typography>
          {episodio.characters.map((personaje) => (
          <Typography key={personaje} variant="body2" color="textSecondary" component="p">
           <Link href={"/personajes/"+personaje} >{personaje} </Link>
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
  const res = await fetch('https://tarea-1-breaking-bad.herokuapp.com/api/episodes?series=Better+Call+Saul')
  const data = await res.json()
  let temp = data.filter(x => x.season.toString() == params.season);    
  let episodios = temp.filter(x => x.episode.toString() == params.episode);    



  return {
    props: {
        episodio: episodios.length==0 ? null : episodios[0]
    },
    revalidate: 3600
  };
}



export async function getStaticPaths() {
  const res = await fetch('https://tarea-1-breaking-bad.herokuapp.com/api/episodes?series=Better+Call+Saul')
  const data = await res.json()

  // var temp_1 = data.filter( element => element.season =="1")


  // Get the paths we want to pre-render based on posts
  const paths = data.map(episode => ({
      params: {
        season: episode.season.toString(),
        episode: episode.episode.toString() },
  }));

  // We'll pre-render only these paths at build time.
  return {paths, fallback: true}
}