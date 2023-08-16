//*Renders Plant Card Display
const displayPlantCard = (plant) => {
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
};
