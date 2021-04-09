
import styles from '../styles/Home.module.css'
import Head from 'next/head'
import fetch from 'node-fetch'


import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';

import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';



export default function Portada() {

  return (<div>


      <div className={styles.listaPortada}>

    
              
   <li >
   <p className={styles.description}>
          <img style={{height:'72px'}}
          src="https://upload.wikimedia.org/wikipedia/commons/7/77/Breaking_Bad_logo.svg"/>
      </p>

    <Link href={`BB/`}>
   <Card className={styles.tarjetaPortada} >
      <CardActionArea className={styles.imgCardPortada}>
        <div className={styles.imgCardPortada} style={{backgroundImage:"url(https://gcdn.emol.cl/mitos-y-enigmas/files/2019/09/breaking-bad.jpg)",backgroundSize:'cover'}}>
        {'Temporadas'}
        </div>

      </CardActionArea>

    </Card>
    </Link>

    </li>
    <li >
    <p className={styles.description}>
          <img style={{width:'150px'}}
          src="https://www.dafont.com/forum/attach/orig/4/8/483649.png"/>
      </p>

    <Link href={`BCS/`}>
   <Card className={styles.tarjetaPortada} >
      <CardActionArea className={styles.imgCardPortada}>
        <div className={styles.imgCardPortada} style={{backgroundImage:"url(https://img.cinemablend.com/filter:scale/quill/4/c/5/9/8/c/4c598cd1e251c4600b7240ada3a534b41703d5c6.jpg)",backgroundSize:'cover'}}>
        {'Temporadas'}
        </div>
      </CardActionArea>

    </Card>
    </Link>

    </li>


    </div>

    
  
    <Link href={`/personajes`}>
   <Card className={styles.tarjetaPortada} >
      <CardActionArea className={styles.imgCardPortada}>
        <div className={styles.imgCardPortada} style={{backgroundImage:"url(https://images2.minutemediacdn.com/image/upload/c_crop,h_1150,w_2044,x_156,y_0/f_auto,q_auto,w_1100/v1582478973/shape/mentalfloss/546287-james_minchinamc.jpg)",backgroundSize:'cover'}}>
        {'Personajes'}
        </div>

      </CardActionArea>

    </Card>
    </Link>
</div>
   

  )
}

