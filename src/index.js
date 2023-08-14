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
    plantListDiv.append(plantListName);
  });
}
