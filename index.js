document.addEventListener('DOMContentLoaded', () => {
    initialize();
})

function initialize() {
const newForm = document.querySelector('#new-plant')
newForm.addEventListener('submit', handleSubmit)

function handleSubmit(e) {
    e.preventDefault()
    const newPlant = {
    name: newForm.name
    image: newForm.url
    description: newForm.description
    }
    console.log('hi')
    console.log(newPlant)
}
}
console.log('hi')