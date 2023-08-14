//Initial GET request from db.json file
fetch("http://localhost:3000/plants")
  .then(response => response.json())
  .then(plants => createPlantList(plants))
  .catch(error => alert("You forgot to set up your server!"));

const plantListDiv = document.getElementById("plant-list");

//createPlantList function creates a div for each plant
//Adds mouseover event to each plantListName div
//Adds click event to each plantListName div
function createPlantList(plants) {
  plants.forEach(plant => {
    const plantListName = document.createElement("div");
    plantListName.textContent = plant.name;
    plantListName.addEventListener("mouseover", event => {
      console.log("mouseover");
    });
    plantListName.addEventListener("click", event => {
      displayPlantCard();
    });
    plantListDiv.append(plantListName);
  });
}

//addPlantCard function creates a card that is displayed when plant name is clicked
//Card contains plant name, plant imaage, and plant description
//Card has a form submission that edits information about the card
//Card has an Add to Favorites button
//Card has a Delete button
function displayPlantCard() {}

// Add plant form with event listener
const newForm = document.querySelector("#new-plant");
newForm.addEventListener("submit", handleSubmit);

// Create object for new plants
function handleSubmit(e) {
  e.preventDefault();
  const newPlant = {
    name: newForm.name.value,
    image: newForm.image.value,
    description: newForm.description.value,
    favorite: document.querySelector("#new-favorite").checked,
  };

  //postJSON(newPlant)
  console.log(newPlant);
  newForm.reset();
}

/*
// Post new plant to server
const postJSON = (data, url = 'http://localhost:3000/plants/') => {
    return fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(data),
    }).then((response) => {
      if (!response.ok) {
        throw response.statusText;
      }
      return response.json();
    });
  };
  */
