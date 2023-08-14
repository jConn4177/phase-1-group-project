//Initial GET request from db.json file
fetch("http://localhost:3000/plants")
  .then(response => response.json())
  .then(plants => createPlantList(plants));

const plantListDiv = document.getElementById("plant-list");

//createPlantList function creates a div for each plant
//Adds mouseover event to each plantListName div
function createPlantList(plants) {
  plants.forEach(plant => {
    const plantListName = document.createElement("div");
    plantListName.textContent = plant.name;
    plantListName.addEventListener("mouseover", event => {
      console.log("mouseover");
    });
    plantListName.addEventListener("click", event => {
      addPlantCard();
    });
    plantListDiv.append(plantListName);
  });
}

//addPlantCard function creates a card that is displayed when plant name is clicked
//Card contains plant name, plant imaage, and plant description
//Card has a form submission that edits information about the card
//Card has an Add to Favorites button
//Card has a Delete button
function addPlantCard() {}
