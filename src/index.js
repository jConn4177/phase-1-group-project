// Add plant form with even listener
const newForm = document.querySelector('#new-plant')
newForm.addEventListener('submit', handleSubmit)

// Create object for new plants
function handleSubmit(e) {
    e.preventDefault()
    const newPlant = {
    name: newForm.name.value,
    image: newForm.image.value,
    description: newForm.description.value,
    favorite: document.querySelector('#new-favorite').checked
    }

    //postJSON(newPlant)
    console.log(newPlant)
    newForm.reset()
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