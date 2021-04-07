import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import styles from '../styles/Home.module.css'
import Head from 'next/head'
import fetch from 'node-fetch'


import CircularProgress from '@material-ui/core/CircularProgress';


import Link from '@material-ui/core/Link';

const useStyles = makeStyles({
    option: {
      fontSize: 15,
      '& > span': {
        marginRight: 10,
        fontSize: 18,
      },
    },
  });


  

export default function Layout({children}) {
    

  function handleClick(nombre) {
    location.href='/personajes/'+nombre
  
  }
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const response = await fetch('https://tarea-1-breaking-bad.herokuapp.com/api/characters?offset=0');
      // await sleep(1e3); // For demo purposes.
      var personajes = await response.json();
  
      var i
  
      for (i = 10; i < 100; i=i+10) {
        var res = await fetch('https://tarea-1-breaking-bad.herokuapp.com/api/characters?offset='+i)
        var data_1 = await res.json()
        if (data_1.length==0) { break; 
        }else{
          personajes = personajes.concat(data_1);
        }
     
      }

 

      if (active) {
        setOptions(personajes);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);



  
    
    return     <div className={styles.container}>
    <Head>
      <title>Tarea 1 Taller de Integración - Maximiliano Stuardo</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className={styles.main}>

    <Link href={`/`}>  <h1 className={styles.title} style={{fontSize:'1.5rem'}}>
        Tarea 1 Taller de integración - Maximiliano Stuardo 
      </h1></Link>


     
  <Autocomplete
      id="personajes"
      style={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name}
      onChange={(e,op) => handleClick(op.name)}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Buscar personaje"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
        )}
        />

        
        {children}
        
        </main>
      </div>
  }



