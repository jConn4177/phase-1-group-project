const url = "http://localhost:3000/plants"; //*Sets url
let isFavoriteTrue; //* necessary for favorite button function
let currentPlant; //* necessary for patch

//*Initial GET request from db.json file
fetch(url)

  .then(response => response.json())
  .then((plants) => {
    isFavoriteTrue = plants[0].favorite; //* Sets favorite button default
    updateButtonDisplay(isFavoriteTrue); //*Sets favorite button
    displayPlantCard(plants[0]); //*Sets first plant as default card
    createPlantList(plants);
    currentPlant = plants[0];
  })
  .catch(error => alert("You forgot to set up your server!"));

const plantListDiv = document.getElementById("plant-list");

//*createPlantList function creates a div for each plant
//*Adds mouseover event to each plantListName div
//*Adds click event to each plantListName div
function createPlantList(plants) {
  plants.forEach(plant => {
    const plantListName = document.createElement("div");
    plantListName.textContent = plant.name;
    plantListName.classList.add("list-style");
    plantListName.addEventListener("mouseover", event => {
      plantListName.classList.add("list-style-hover");
    });
    plantListName.addEventListener("mouseleave", event => {
      plantListName.classList.remove("list-style-hover");
    });
    plantListName.addEventListener("click", (event) => {
      isFavoriteTrue = plant.favorite; //* sets favorite button textContent
      currentPlant = plant;
      displayPlantCard(plant);
    });
    plantListDiv.append(plantListName);
  });
}

//*Renders Plant Card Display
const displayPlantCard = plant => {
  const plantName = document.querySelector("#plant-name");
  plantName.textContent = plant.name;
  const plantImage = document.querySelector("#plant-image");
  plantImage.src = plant.image;
  const plantDescription = document.querySelector("#plant-description");
  plantDescription.textContent = plant.description;
  const favoriteButton = document.querySelector("#favorite-btn");
  isFavoriteTrue = plant.favorite;
  updateButtonDisplay(isFavoriteTrue);
  favoriteButton.removeEventListener("click", favoriteButtonClickHandler); //*Remove existing event listener before adding a new one
  favoriteButton.addEventListener("click", favoriteButtonClickHandler); //*Add event listener with a named function
  const deleteButton = document.querySelector("#delete");
  deleteButton.addEventListener("click", () => {
    deletePlant(plant);
  });
  //*Note/comment
  // const plantNote = document.querySelector("#plant-note");
  // const addNote = document.querySelector("#note");
  // addNote.addEventListener("click", () => {});
};

//* Add plant form with event listener
const newForm = document.querySelector("#new-plant");
newForm.addEventListener("submit", handleSubmit);

//* Create object for new plants
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

// Post new plant to server
// const postJSON = (data, url = 'http://localhost:3000/plants/') => {
//     return fetch(url, {
//       method: "POST",
//       headers: { "Content-Type": "application/json", Accept: "application/json" },
//       body: JSON.stringify(data),
//     }).then((response) => {
//       if (!response.ok) {
//         throw response.statusText;
//       }
//       return response.json();
//     });
//   };

//*function to change favorite button depending on favorite.ifTrue
function updateButtonDisplay(isTrue) {
  const button = document.getElementById("favorite-btn");
  if (isTrue) {
    button.textContent = "Remove from Favorites";
  } else {
    button.textContent = "Add to Favorites";
  }
}

//* Updates the favorite
const updateFavorite = plantObj => {
  const updatedPlant = { ...plantObj };
  updatedPlant.favorite = !updatedPlant.favorite;
  patchJSON(url + `/${plantObj.id}`, { favorite: updatedPlant.favorite }).then(
    () => {
      currentPlant.favorite = updatedPlant.favorite;
      updateButtonDisplay(updatedPlant.favorite);
    }
  );
};

//* Deletes a plant from db.json
const deletePlant = plantObj => {
  getJSON(url).then(plants => {
    deleteJSON(url + `/${plantObj.id}`);
    const plantIndex = plants.findIndex(plant => plant.id === plantObj.id);
    if (plantIndex !== -1 && plantIndex < plants.length - 1) {
      currentPlant = plants[plantIndex + 1];
      displayPlantCard(plants[plantIndex + 1]);
    } else {
      //* Display a default state if there is no next plant
      displayPlantCard({
        name: "",
        image: "",
        description: "",
        favorite: false,
      });
    }
  });
};

//* Named function for the "Add to Favorites" button click event
const favoriteButtonClickHandler = () => {
  isFavoriteTrue = !isFavoriteTrue;
  updateButtonDisplay(isFavoriteTrue);
  updateFavorite(currentPlant);
};
