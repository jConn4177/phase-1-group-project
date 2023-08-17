//*Global Declarations
const imageUrl =
  "https://images.unsplash.com/photo-1502810365585-56ffa361fdde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHBsYW50JTIwZHJhd2luZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60";
const url = "http://localhost:3000/plants"; //*Sets url -Jason
let isFavoriteTrue; //* necessary for favorite button function -Jason
let currentPlant; //* necessary for patch -Jason
let showButtons = true;

//*HTML Selectors
const plantImage = document.querySelector("#plant-image");
const plantName = document.querySelector("#plant-name");
const plantDescription = document.querySelector("#plant-description");
const cardButtons = document.querySelector("#btn-container");

//* Callback Functions
const seekButton = () => {
  showButtons = true;
  if (showButtons) {
    cardButtons.style.display = "block";
  }
};
const hideButtons = () => {
  showButtons = false;
  if (!showButtons) {
    cardButtons.style.display = "none";
  }
};

//Initial GET request from db.json file sent to createPlantList function w/ error catch - VJ
fetch("http://localhost:3000/plants")
  .then(response => response.json())
  .then(plants => {
    hideButtons();
    createPlantList(plants);
    currentPlant = plants;
    favoritePlant(plants);
  })
  .catch(error => alert("You likely forgot to set up your server!"));

const plantListDiv = document.getElementById("plant-list-container");

//createPlantList function passes each plant to createPlantDiv function - VJ
function createPlantList(plants) {
  plants.forEach(plant => createPlantDiv(plant));
}

//createPlantDiv function creates a div for each plant - VJ
//Sets div ID to plant ID to assist with delete function - VJ
//Adds mouseover event to each plantListName div - VJ
//Adds mouseleave event to each plantListName div - VJ
//Adds click event to each plantListName div - VJ
//Appends each plantListName div to plantListDiv - VJ
function createPlantDiv(plant) {
  const plantListName = document.createElement("div");
  plantListName.textContent = plant.name;
  plantListName.setAttribute("id", `${plant.id}`);
  plantListName.classList.add("list-style");
  plantListName.addEventListener("mouseover", event => {
    plantListName.classList.add("list-style-hover");
  });
  plantListName.addEventListener("mouseleave", event => {
    plantListName.classList.remove("list-style-hover");
  });
  plantListName.addEventListener("click", event => {
    isFavoriteTrue = plant.favorite; //* sets favorite button textContent
    currentPlant = plant;
    displayPlantCard(plant);
  });
  plantListDiv.append(plantListName);
}

//*Renders Plant Card Display
const displayPlantCard = plant => {
  plantName.textContent = plant.name;
  plantImage.src = plant.image;
  plantDescription.textContent = plant.description;
  const favoriteButton = document.querySelector("#favorite-btn");
  isFavoriteTrue = plant.favorite;
  updateButtonDisplay(isFavoriteTrue);
  seekButton();
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

// Add plant form with event listener - KL
const newForm = document.querySelector("#new-plant");
newForm.addEventListener("submit", handleSubmit);

// Create object for new plants from form submission - KL
function handleSubmit(e) {
  e.preventDefault();
  const newPlant = {
    name: newForm.name.value,
    image: newForm.image.value,
    description: newForm.description.value,
    favorite: document.querySelector("#new-favorite").checked,
  };

  // Automatically add plant to favorites bar if selected
  if (document.querySelector("#new-favorite").checked) {
    renderFave(newPlant);
  }

  //POST request that adds new plant to db.json file - VJ
  //Newly created plant passed to createPlantDiv function - VJ
  fetch("http://localhost:3000/plants", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(newPlant),
  })
    .then(response => response.json())
    .then(newPlant => createPlantDiv(newPlant));
  newForm.reset();
}

//*function to change favorite button depending on favorite.ifTrue -Jason
function updateButtonDisplay(isTrue) {
  const button = document.getElementById("favorite-btn");
  if (isTrue) {
    button.textContent = "Remove from Favorites";
  } else {
    button.textContent = "Add to Favorites";
  }
}

//* Updates the favorite -Jason
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

//* Deletes a plant from db.json -Jason
const deletePlant = plantObj => {
  deleteJSON(url + `/${plantObj.id}`);
  plantImage.src = imageUrl;
  plantName.textContent = "Plant Babies";
  plantDescription.textContent =
    "lorem ipsum dolor sit amet, consectetur adipiscing";
  hideButtons();
  //Deletes same plant from plant list - VJ
  document.getElementById(`${plantObj.id}`).remove();
};

//* Named function for the "Add to Favorites" button click event -Jason
const favoriteButtonClickHandler = () => {
  isFavoriteTrue = !isFavoriteTrue;
  updateButtonDisplay(isFavoriteTrue);
  updateFavorite(currentPlant);
};

const faveArr = [];

function favoritePlant(plants) {
  for (let i = 0; i < plants.length; i++) {
    if (plants[i].favorite === true) {
      faveArr.push(plants[i]);
    }
  }
  faveArr.forEach(plant => renderFave(plant));
}

let selectedFave; // Global variable

//Add favorite plants to top bar
function renderFave(plant) {
  const favePlaceholder = document.querySelector("#fave-placeholder");
  // Hides placeholder image and caption when a favorite exists
  favePlaceholder.style.display = "none";
  const favoriteContainer = document.getElementById("favorite-container");
  const img = document.createElement("img");
  img.src = plant.image;
  favoriteContainer.append(img);

  //Set for when favorite is clicked to do an action
  img.addEventListener("click", e => {
    selectedFave = plant;
    console.log(selectedFave);
  });
}

// Toggle Add New form
let showAddForm = false; // Set to false for use in toggling

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#addBtn");
  const formContainer = document.querySelector("#new-plant");
  addBtn.addEventListener("click", () => {
    // Upon clicking showAddForm is now set to true
    showAddForm = !showAddForm;
    if (showAddForm) {
      formContainer.style.display = "block";
      addBtn.textContent = "Done adding";
    } else {
      formContainer.style.display = "none";
      addBtn.textContent = "Add New Plant";
    }
  });
});
