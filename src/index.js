//*Global Declarations
const imageUrl =
  "https://images.unsplash.com/photo-1502810365585-56ffa361fdde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHBsYW50JTIwZHJhd2luZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60";
const url = "http://localhost:3000/plants"; //*Sets url -Jason
let isFavoriteTrue; //* necessary for favorite button function -Jason
let currentPlant; //* necessary for patch -Jason
let showButtons = true;
let faveArr = [];

//*HTML Selectors
const plantImage = document.querySelector("#plant-image");
const plantName = document.querySelector("#plant-name");
const plantDescription = document.querySelector("#plant-description");
const cardButtons = document.querySelector("#btn-container");

//*Delete Button functions
const deleteButton = document.querySelector("#delete");
deleteButton.addEventListener("click", () => {
  deletePlant(currentPlant);
});

//*Favorites Button functions
const favoriteButton = document.querySelector("#favorite-btn");
const favoriteButtonClickHandler = () => {
  isFavoriteTrue = !isFavoriteTrue;
  updateButtonDisplay(isFavoriteTrue);
  updateFavorite(currentPlant);
};
favoriteButton.addEventListener("click", favoriteButtonClickHandler);

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
  isFavoriteTrue = plant.favorite;
  updateButtonDisplay(isFavoriteTrue);
  seekButton();
  //Each time the plant card renders, it hides the updateDescriptionForm - VJ
  updateDescriptionForm.setAttribute("hidden", "");
  descriptionButton.textContent = "Update Description";
  //*Note/comment
  // const plantNote = document.querySelector("#plant-note");
  // const addNote = document.querySelector("#note");
  // addNote.addEventListener("click", () => {});
};

//Click event listener for Update Description Button on plant card triggers toggleDescriptionForm function - VJ
const descriptionButton = document.querySelector("#update-description");
descriptionButton.addEventListener("click", () => {
  toggleDescriptionForm();
});

//toggleDescriptionForm function changes visibility of updateDescriptionForm - VJ
//function also changes text of Update Description Button - VJ
//function also autopopulates fields with currentPlant description which is set on click of plant card and when PATCH is successful - VJ
const updateDescriptionForm = document.querySelector(
  "#update-description-form"
);
const updateDescriptionText = document.querySelector(
  "#update-description-text"
);
function toggleDescriptionForm() {
  if (updateDescriptionForm.getAttribute("hidden") === "") {
    updateDescriptionForm.removeAttribute("hidden");
    descriptionButton.textContent = "Do Not Update Description";
    updateDescriptionText.textContent = currentPlant.description;
  } else {
    updateDescriptionForm.setAttribute("hidden", "");
    descriptionButton.textContent = "Update Description";
  }
}

//Event listener for UpdateDeescriptionForm submission calls updateDescription function and calls displayPlantCard function on currentPlant. - VJ
updateDescriptionForm.addEventListener("submit", event => {
  event.preventDefault();
  updateDescription();
  updateDescriptionForm.reset();
});

//updateDescription function sends PATCH request to db.json file to update description - VJ
//Upon response return it calls displayPlantCard function and resets currentPlant to reflect updated description - VJ
function updateDescription() {
  currentPlant.description = updateDescriptionText.value;
  fetch(`http://localhost:3000/plants/${currentPlant.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(currentPlant),
  })
    .then(response => response.json())
    .then(plant => {
      displayPlantCard(currentPlant);
    });
}

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

  const favorite = document.querySelector("#new-favorite").checked;

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
    .then(newPlant => {
      createPlantDiv(newPlant);
      displayPlantCard(newPlant);
      currentPlant = newPlant;
      // Automatically add plant to favorites bar if selected
      if (favorite) {
        renderFave(newPlant);
      }
    });
  newForm.reset();
}

//*function to change favorite button depending on favorite.ifTrue -Jason
function updateButtonDisplay(isTrue) {
  if (isTrue) {
    favoriteButton.textContent = "Remove from Favorites";
  } else {
    favoriteButton.textContent = "Add to Favorites";
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
      // Updates favorite bar - KL
      if (updatedPlant.favorite) {
        faveArr.push(updatedPlant);
        renderFave(updatedPlant);
      } else {
        const removeImg = document.querySelector(`#fave-${plantObj.id}`);
        removeImg.remove();
        keepPlaceholder(updatedPlant);
      }
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
  // If plant was marked as favorite, remove the image
  if (plantObj.favorite) {
    const removeImg = document.querySelector(`#fave-${plantObj.id}`);
    removeImg.remove();
    keepPlaceholder(currentPlant);
  }
  //Deletes same plant from plant list - VJ
  document.getElementById(`${plantObj.id}`).remove();
};

function keepPlaceholder(plantObj) {
  // Update faveArr
  faveArr = faveArr.filter(function (obj) {
    return obj.name !== plantObj.name;
  });
  // If no favorites, show placeholder image
  if (document.querySelectorAll("#favorite-container > img").length === 0) {
    const favePlaceholder = document.querySelector("#fave-placeholder");
    favePlaceholder.style.display = "block";
  }
}

function favoritePlant(plants) {
  for (let i = 0; i < plants.length; i++) {
    if (plants[i].favorite === true) {
      faveArr.push(plants[i]);
    }
  }
  faveArr.forEach(plant => renderFave(plant));
}

//Add favorite plants to top bar
function renderFave(plant) {
  const favePlaceholder = document.querySelector("#fave-placeholder");
  // Hides placeholder image and caption when a favorite exists
  favePlaceholder.style.display = "none";
  const favoriteContainer = document.getElementById("favorite-container");
  const img = document.createElement("img");
  img.src = plant.image;
  img.id = `fave-${plant.id}`;
  favoriteContainer.append(img);

  //Set for when favorite is clicked to do an action
  img.addEventListener("click", e => {
    isFavoriteTrue = plant.favorite; //* sets favorite button textContent
    currentPlant = plant;
    displayPlantCard(plant);
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
