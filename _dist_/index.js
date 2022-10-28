/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

const baseUrl = "https://platzi-avo.vercel.app"
/* Cambiamos la url que tenemos por una url base
y lo que hacemos es agregarle atraves de  un template string
el resto de la url que teniamos en el fetch*/

const appNode = document.querySelector('#app')
appNode.addEventListener('click', (event)=>{
    if(event.target.nodeName === "H2"){
        window.alert("Hola")
    }
})

// Intl
 // 1.- Format fechas
 // 2.- Format monedas

const formatPrice = (price) => {

   const newPrice = window.Intl.NumberFormat('en-EN', {
        style: "currency",
        currency: "USD"
    }).format(price)

    return newPrice
}



//Web API Fetch
// La utilizamos para traer recursos desde cualquier otro sitio web

 // Lo unico que tenemos que pasarle es nuestra url
 


//Conectarnos al server
window
.fetch(`${baseUrl}/api/avo`)
// Procesar la respuesta y despues la convertimos en JSON Fetch es algo que nos devuelve una promesa asi que trabajaremos con promesas para obtener la respuesta y transformarla en JSON
   
//procesar la respuesta y convertirla en JSON

.then((respuesta) => respuesta.json())
//JSON -> data -> renderizar info browser
.then((responseJson) => {
    const todosLosItems = []
    // recorremos cada uno de los elementos que estan en arrays con un forEach
    console.log(responseJson);
  
    responseJson.data.forEach(element => {
        //atraves del parametro de la funcion del forEach accedemos a los elementos de la respuesta json

        //crear nodos y mostrar en el DOM
        //crear imagen
        const imagen = document.createElement('img')
        /* Para asignar la url que obtenemos de la api
        a nuestra imagen lo hacemos en la propiedad src

        Si la agregaramos solo con lo que obtenemos de la API nos 
        daria un error ya que lo que obtenemos es una ruta obsuluta
        mas no una url por lo tanto nos dara error porque no
        encontraria la ruta de la imagen
        */
        imagen.src = `${baseUrl}${element.image}`
        imagen.className = "h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6"
       
        //crear titulo
        const title = document.createElement('h2')
        /* Le asignamos al texto del elemento precio que es un div
           la informacion que obtenemos de respuesta JSON Y atraves
           del parametro que tenemos en la funcion del forEach
           accederemos al precio 
        
        */
        title.className = "text-lg "
        title.textContent = element.name
       
        //crear precio
        const price = document.createElement('div')
        price.className = "text-gray-600"
        price.textContent = formatPrice(element.price)
        
         // Creamos un contenedor el título y el precio
         const priceAndTitle = document.createElement("div")
         priceAndTitle.className = "text-center md:text-left ";
         priceAndTitle.appendChild(title);
         priceAndTitle.appendChild(price);

         // Metemos todo dentro de una tarjeta contenedora
         const card = document.createElement("div");
         card.className = "md:flex bg-white rounded-lg p-6 hover:bg-gray-300";
         card.append(imagen, priceAndTitle);
         card.style.width = "60%";
      

        const container = document.createElement('div')
        container.append(card)

        todosLosItems.push(container)
    });

    appNode.append(...todosLosItems)
});
