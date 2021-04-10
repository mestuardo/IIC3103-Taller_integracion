Esta es la Tarea N°1 de la asignatura IIC3103 - Taller de integración

La URL de la API extraída es la siguiente:
    https://tarea-1-breaking-bad.herokuapp.com/

## Framework

Se utilizó Next.js,  un framework relativamente nuevo, que utiliza React como base
y además provee un servidor que permite hacer Server Side Rendering (SSR). Las principales librerías utilizadas fueron

```bash
React       -> Frontend
Material-UI -> Para los botones, tarjetas y buscadores estilosos
Node-fetch  -> Para recuperar datos de la API

```



## Consideraciones

Dentro del script seguramente te encontrarás con las siguientes funciones

```bash
getStaticProps -> Utilizado para que el servidor haga fetch de la api en el momento del Build, es decir
                    que al momento de subir la página todo el contenido queda como contenido estático
                ¿Pero qué pasa si la API se actualiza?
                    R: Para eso esta función tiene una opción que se llama "revalidate", en que uno puede 
                        colocar los segundos en que el servidor hace fetch de nuevo de los datos y revisa  
                        si es que hay información nueva. En este caso el fallback está puesto para 3600 
                        segundos.
                        Si específicamente se busca el URL pedido, la app irá a la API, lo buscará y 
                        mostará el contenido en cualquier momento.

                ¿Qué pasa si no existe la información pedida?
                    R: Se retorna una página 404 personalizada

getStaticPaths-> Aquí se le dice a la aplicación que haga fetch con cierto contenido y se generen los URL
                    estático de la aplicación cuando se hace el deploy.
                ¿Pero qué pasa si la API se actualiza?
                        R: Para eso esta función tiene una opción que se llama "fallback: true", en que uno
                        deja al servidor que se generen URL nuevas y verifique con getStaticProps si es que 
                        hay información nueva.
```
¿Para qué sirve esto?
1. Para tener contenido pre-cargado y no derivar el fetch al cliente
    para este caso es un overhead total, pero quería aprender a utilizarlo
2. Para el SEO. Como las páginas están pre-cargadas y no hacen render solo cuando el cliente ingresa,
    los crawlers de google detectan el contenido

Para el buscador de personajes se colocó un buscador para todas las páginas que hace un request cada vez 
que se ingresa un string de más de 2 caracteres :-)

## Host

```bash
Se utilizó Vercel porque es gratuito y permite SSR, por lo que se puede regenerar el sitio en el caso 
de que haya información nueva en la API.
- Como ya lo mencioné antes, el chequeo de datos nuevos se realiza cada 1 hora
- La generación de URLs nuevos en caso de existir se realiza en el momento que el cliente intenta ingresar el URL

```

Tengo claro que de repente hay problemas con los estilos de las tarjetas, pero es algo que tengo que estudiar
con más tiempo para poder saber solucionarlo
-> Tengo entendido que los estilos con SSR se des-inyectan y se re-inyectan para que funcionen bien
    pero aún no sé bien cómo se hace