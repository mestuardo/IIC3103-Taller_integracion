import { useRouter } from 'next/router'
import styles from '../../styles/Home.module.css'
import Head from 'next/head'
import fetch from 'node-fetch'

import CircularProgress from '@material-ui/core/CircularProgress';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';






const Personaje = ({personaje,quotes}) => {


const router = useRouter();

if (router.isFallback) {
  return   ( 
    <div className={styles.container}>
    <Head>
      <title>Cargando...</title>
 
    </Head>

    <main className={styles.main}>

  <CircularProgress color="primary" />

</main>
</div>
  )

}


  return (<div className={styles.container}>
<Head>
<title>{personaje.name}</title>
  <link rel="icon" href="/favicon.ico" />
</Head>

<main className={styles.main}>

<div style={{display:'grid',gridTemplateColumns: personaje.appearance.length>0 && personaje.better_call_saul_appearance.length>0 ? '1fr 1fr': '1fr',margin:0,padding:0}}>
     { personaje.appearance.length>0?
      <Link href={`/BB`}>
      <p className={styles.description}>
   <img style={{height:'72px'}}
          src="https://upload.wikimedia.org/wikipedia/commons/7/77/Breaking_Bad_logo.svg"/>
           
      </p>
      </Link>: null}
      { personaje.better_call_saul_appearance.length>0?
      <Link href={`/BCS`}>
      <p className={styles.description}>
   <img style={{height:'72px'}}
          src="https://www.dafont.com/forum/attach/orig/4/8/483649.png"/>
           
      </p>
      </Link>
    : null}
      </div>
  <h2>{personaje.name}</h2>


  <div className={styles.gridDetallesPsj} >
  

  <Card className={styles.imgDetalles} >
      <CardActionArea >
      <div style={{width:'300px',height:'400px',backgroundImage:"url("+personaje.img+")",backgroundSize:'cover'}}>
        </div>
      </CardActionArea>
    </Card>


    <Card style={{width:'300px',margin:'10px'}}>
     
        <CardContent>
          <Typography gutterBottom variant="h6" component="h6">
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

    <Card style={{width:'300px',height:'400px',textAlign:'-webkit-center'}} >
      {/* <div style={{width:'300px',height:'400px',textAlign:'center'}}> */}
      <CardContent style={{paddingBottom:0}}>
          <Typography gutterBottom variant="h6" component="h6">
          Citas
          </Typography>
          </CardContent>
          <CardContent style={{overflowY:'scroll',maxHeight:'330px',maxwidth:'300px',marginTop:'0',paddingTop:'0'}}>
          
      
          {quotes.length>0 ? quotes.map((cita) => (
          <Typography style={{width:'fit-content'}} gutterBottom key={cita.quote_id} variant="body2" color="textSecondary" component="p">
            "{cita.quote}"
          </Typography>)):   
          <Typography style={{width:'fit-content'}} gutterBottom variant="body2" color="textSecondary" component="p">Ninguna</Typography>
          }
          </CardContent>
        {/* </div> */}
    </Card>



  </div>


  </main>
  </div>


  )}

export default Personaje





export async function getStaticProps({ params }) {
    const res_00 = await fetch('https://tarea-1-breaking-bad.herokuapp.com/api/characters?name='+params.name)
   

    var pers = await res_00.json()


    const res_quotes = await fetch('https://tarea-1-breaking-bad.herokuapp.com/api/quote?author='+params.name)
    var quot = await res_quotes.json()


    if (pers.length==0){
      return {
        notFound: true
      }
    }


    return {
      props: {
          personaje: pers[0],
          quotes: quot
      },
      revalidate: 3600,
    };
  }



  export async function getStaticPaths() {
    const res_00 = await fetch('https://tarea-1-breaking-bad.herokuapp.com/api/characters?offset=0')

    var data = await res_00.json()



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




