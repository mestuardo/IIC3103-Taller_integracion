import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import styles from '../styles/Home.module.css'
import Head from 'next/head'
import fetch from 'node-fetch'


import CircularProgress from '@material-ui/core/CircularProgress';


import Link from '@material-ui/core/Link';
import { unstable_renderSubtreeIntoContainer } from 'react-dom';

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
    // Se bloquea el boton para evitar que el usuario 
    // manipule el input cuando está cargando la página
    
    location.href='/personajes/'+nombre
    setDisabled(true)
    
  
  }
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [busqueda,setBusqueda] = React.useState([])
  const [disabled,setDisabled] = React.useState(false)
  const [loading,setLoading] = React.useState(false)




  React.useEffect(() =>{
  // Si el usuario borra lo que ingresa, se cierra el tray y se borra el contenido
    if (busqueda==''){
      setOpen(false)
  // Se dejó una restricción de al menos 2 caracteres para que se realizara la búsqueda
  // Ya que la api arroja hasta 10 resultados máximo
    }else if(busqueda.length>2){
      // Se abre el tray
      setOpen(true)
      // Se deja la opción en el Autocomplete para que espere la carga de resultados
      setLoading(true)
    }

  }
  
  ,[busqueda])

  React.useEffect(() =>{
    setOpen(false)    
    }
    
    ,[disabled])

  React.useEffect(() => {
    let active = true;

    if (!loading){
      // Se cierra el tray cuando se elige al personaje
      // Útil para cuando se clickeal el nombre y se redirige

      return undefined
    }

    (async () => {
       
      const response = await fetch('https://tarea-1-breaking-bad.herokuapp.com/api/characters?name='+busqueda);

      var personajes = await response.json(); 
      console.log(personajes)
      if (active) {
        setOptions(personajes);
        setLoading(false);
     
        }
        
     
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
      setLoading(false)
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
      disabled={disabled}
      open={open}
      noOptionsText={'El personaje no existe'}
      loadingText={'Buscando personaje...'}
      closeText={'Cerrar'}
      // onOpen={() => {
      //   setOpen(true);
      // }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name}
      inputValue={busqueda}
      onInputChange={(e,value)=>setBusqueda(value)}
      onChange={(e,op) => {handleClick(op.name)}}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Buscar personaje"
          placeholder='Escribe un nombre...'
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



