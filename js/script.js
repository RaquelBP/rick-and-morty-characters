const displayArea = document.getElementById("character-list")
const nextPage = document.getElementById("next-page")
const prevPage = document.getElementById("prev-page")
const currentPage = document.getElementById("current-page")

let numeroPagina = 1
//Ejecuta la función busqueda al cargar la web para que aparezca la página 1 del api
busqueda(numeroPagina)


//Evento de página siguiente
nextPage.addEventListener("click", () => {
    numeroPagina++
    currentPage.innerHTML = "Página " + numeroPagina
    //Vuelve a ejecutar la función búsqueda cuando se haga click en el botón para que se actualice todo para la siguieente página del api
    busqueda(numeroPagina)
})

//Evento de página anterior
prevPage.addEventListener("click", () => {
    if (numeroPagina>1){
        numeroPagina--
        currentPage.innerHTML = "Página " + numeroPagina
        //Vuelve a ejecutar la función búsqueda cuando se haga click en el botón para que se actualice todo para la anterior página del api
        busqueda(numeroPagina)
    }
})



//Función para conseguir la información del api
function busqueda(pageNumber){
    fetch("https://rickandmortyapi.com/api/character/?page=" + pageNumber)
    .then((response) => {
        if (!response.ok) {
            throw new Error("La solicitud no fue exitosa")
        }
        return response.json()
    })
    .then((data) => {
        const dataResults = data.results

        //Declara la variables de las listas fuera de la función organizarListas con los valores que ha resultado de la función para que el resto del código pueda utilizar estas variables fuera de la función
        const { listaPersonajes, listaImagenes, listaEspecies } = organizarListas(data);
        
        //Llama a la función para organizar todos los elementos en listas
        organizarListas(data)

        //Llama a la función para integrar todos los elementos
        organizaHTML(dataResults, displayArea, listaPersonajes, listaImagenes, listaEspecies)
        
    })
    
    .catch((error) => {
        displayArea.innerText = "Error: No se pudo obtener la información"
    })    
}



//Función para organizar los datos en listas
//Añade cada elemento a su correspondiente lista para más tarde organizarla.
function organizarListas(data){
    const dataResults = data.results
    //Declara las variables de la lista aquí para que cuando se vuelva a ejecutar (cuando se haga el previous o next page) se limpien también como los li
    const listaPersonajes = []
    const listaImagenes = []
    const listaEspecies = []

    
    //Iterar sobre los resultados y agregar datos a las listas correspondientes
    dataResults.forEach((element) => {
        listaPersonajes.push(element.name)
        listaImagenes.push(element.image)
        listaEspecies.push(element.species)
    })
    // Devuelve un objeto con las listas organizadas
    return {listaPersonajes, listaImagenes, listaEspecies}
}




//Función para organizar las listas con los datos en el HTML
//Organiza cada nombre y avatar en un li y colócalo dentro del ul character-list
function organizaHTML(dataResults, lista, elementos, poster, especies) {
    lista.innerHTML = "";

    // Iterar sobre los elementos con forEach. El for each tiene hasta 3 argumentos. Elemento, Indice y Array. Normalmente se usa el primero o los dos primeros.
    dataResults.forEach((element, i) => {
        // Crear las variables para los elementos dentro de la lista
        let lItem = document.createElement("li");
        let pNameElement = document.createElement("p");
        let bNameElement = document.createElement("b");
        let pSpeciesElement = document.createElement("p");
        let bSpeciesElement = document.createElement("b");
        let img = document.createElement("img");

        // Poner la ruta del póster en el src de la imagen
        img.src = poster[i];

        // Colocar todos los elementos creados: Dentro de la lista habrá un li por cada personaje. Dentro de cada li habrá una imagen y dos párrafos. Dentro de cada párrafo habrá un título en negrita "Name" y "Species", y fuera de las negritas, el nombre y la especie correspondiente.
        lItem.appendChild(img);

        bNameElement.appendChild(document.createTextNode("Name: "));
        pNameElement.appendChild(bNameElement);
        pNameElement.appendChild(document.createTextNode(elementos[i]));
        lItem.appendChild(pNameElement);

        bSpeciesElement.appendChild(document.createTextNode("Species: "));
        pSpeciesElement.appendChild(bSpeciesElement);
        pSpeciesElement.appendChild(document.createTextNode(especies[i]));
        lItem.appendChild(pSpeciesElement);

        lista.appendChild(lItem);
    });
}