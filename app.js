var corsApiUrl = "https://cors-anywhere.herokuapp.com/";
var apiToken = "?token=YLcORs_GvdneK_n5WVoAShvt2_tsaOpkpNPysYrfY4c";

// CORS stands for "cross origin resource sharing" -- you'll be making http requests in order
// DON'T CHANGE THIS: fetches the data from the API endpoint
const doCORSRequest = (options) => {
  var x = new XMLHttpRequest(); 
  x.open("GET", corsApiUrl + options.url);
  x.send(options.data);
  return x;
};

const corsPromise = () =>
  new Promise((resolve, reject) => { 
    const request = doCORSRequest({
      url: "https://trefle.io/api/v1/plants" + apiToken,
    });
    resolve(request);
  });

const addPlants = (plantData) => {
  plantData.forEach(plant => {
    const card = createCard(plant); 
    document.getElementById('plants').appendChild(card);
  });
};

const createCard = (plant) => {
  const card = document.createElement('div');
  card.setAttribute('class', 'card');

  const image = document.createElement('img');
  image.src = plant.image_url;
  image.setAttribute('class', 'image');

  const name = document.createElement('h2');
  name.innerHTML = plant.common_name;
  name.setAttribute('class', 'h-2');

  const scientificName = document.createElement('h3');
  scientificName.innerHTML = plant.scientific_name;
  scientificName.setAttribute('class', 'h-3');
  
  card.appendChild(image);
  card.appendChild(name);
  card.appendChild(scientificName);

  return card;
}

corsPromise().then(
  (request) =>
    (request.onload = request.onerror = () => { 
      const plantData = JSON.parse(request.response).data;
      const myPlantData = plantData.filter(plant_instance => plant_instance.year == 1753);
      console.log(myPlantData);
      addPlants(myPlantData);
    })
);