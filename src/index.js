const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = 'https://dog.ceo/api/breeds/list/all';



fetch(imgUrl)
    .then(response => response.json()) // converts to JSON object
    .then(json => renderImages(json)); // passes the JSON object to renderImages function 

fetch(breedUrl)
    .then(response => response.json())
    .then(json => renderBreeds(json))

function renderImages(dogArray) {
    const urlArray = dogArray.message; 
    // console.log(urlArray); // confirms that we have an array of urls (located in message key in JSON object)
    const dogContainer = document.getElementById('dog-image-container') 
    urlArray.forEach(url => { // for each of the URLs, creates and populate img elements with the source being each element in the URL array
       const img = document.createElement('img');
       img.src = url;
       dogContainer.append(img); 
    })
}

function renderBreeds(breedJSON) {
    const breedObj = breedJSON.message;
    // console.log(breedObj); // confirms that have object of breeds to work with
    const breedContainer = document.getElementById('dog-breeds');
    for (const breed in breedObj) { // iterates through each higher level key in the object of breeds
        // console.log(breed);
        const li = document.createElement('li')
        li.textContent = breed
        breedContainer.append(li)
    }
    
    const breedArray = document.querySelectorAll('li') //makes a node list of all the li's of dog breeds
    for (breed of breedArray) {
        breed.addEventListener('click', breed => addFontColorListener(breed))
    }

    filter(breedArray);
}

function addFontColorListener(breed) {
    const breedNode = breed.target;
    breedNode.style.color = 'red'
}

function filter(breedArray){
    const dropDown = document.getElementById('breed-dropdown');
    dropDown.addEventListener('change', e => {
        let selectedValue = e.target.value
        if (selectedValue === 'a') {
            filterByLetter(selectedValue, breedArray)
        } else if (selectedValue === 'b') {
            filterByLetter(selectedValue, breedArray)
        } else if (selectedValue === 'c') {
            filterByLetter(selectedValue, breedArray)
        } else if (selectedValue === 'd') {
            filterByLetter(selectedValue, breedArray)
        }
    })
}

function filterByLetter(selectedValue, breedArray) {
    let BreedNameArray = []
    for (const node of breedArray) {
        BreedNameArray.push(node.textContent)
    }

    const aBreeds = BreedNameArray.filter(breed => breed[0] === selectedValue)

    document.querySelector('ul').remove()
    const ul = document.createElement('ul')
    document.body.append(ul)
    for (const breed of aBreeds) {
        const li = document.createElement('li')
        li.textContent = breed
        ul.append(li)
    }
}






