//Initial GET request from db.json file
fetch("http://localhost:3000/plants")
  .then(response => response.json())
  .then(plants => createPlantList(plants));

//createPlantList function creates a div for each plant
function createPlantList(plants) {
  console.log("plants");
}
