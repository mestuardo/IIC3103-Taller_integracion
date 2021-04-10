  
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import fetch from 'node-fetch'


import Head from 'next/head'

import styles from '../../styles/Home.module.css'
import ButtonBase from '@material-ui/core/ButtonBase';




  const useStyles = makeStyles({
    root: {
      maxWidth: '230px',
      margin: '10px',
      textAlign:'center',
      height:'380px',
      opacity: '0.9',
      transition: '0.3s',
      "&:hover":{
        opacity: '1',
      },
    },
    media: {
      maxWidth: '230px',
      textAlign:'center',
      height:'380px',
      transition: '0.3s',
  },
  });
  

// posts will be populated at build time by getStaticProps()
export default function Personajes( {personajes,error} ) {

  const classes = useStyles();
  

    // var temp_4 = episodios.filter( element => element.season =="5")

  return (

    <div className={styles.container}>
    <Head>
      <title>Personajes</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className={styles.main}>


      <Link href={`/BB`}>
      <p className={styles.description}>
   <img style={{height:'72px'}}
          src="https://upload.wikimedia.org/wikipedia/commons/7/77/Breaking_Bad_logo.svg"/>
           
      </p>
      </Link>

      <h3>Personajes Series</h3>
  
  
  
    <div className={styles.listaItems}>

    

    {personajes.map((pers) => (

        
              
   <li key={pers.char_id} >
   <Link href={`personajes/`+pers.name}>
    <Card className={classes.root} key={pers.char_id} >
      <CardActionArea className={classes.media}  >
        <div className={styles.imgCard} style={{backgroundImage:"url(" + pers.img + ")",backgroundSize:'cover'}}>
        </div>
        
        <CardContent >
          <Typography gutterBottom variant="h6" component="h2">
          {pers.name}
          </Typography>
          <Typography  variant="body2" component="p">
          Actor: {pers.portrayed}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
         Click para ver más detalles
       </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </Link>

    </li>

    

          ))}



    </div>

   
      </main>
      </div>
  )
}



export const getStaticProps = async () => {
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

    
  
    return {
      props: {
        personajes: data,
    },
    revalidate: 3600,
    };
  }
