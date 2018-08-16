document.addEventListener('DOMContentLoaded', () => {

fetchToys()
// FETCH
function fetchToys() {
  fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then(renderToys)
};

function createToy(toyObj){
  console.log(toyObj)
  const url = `http://localhost:3000/toys`
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(toyObj)
  })
    .then(res => res.json())
}

function updateLikes(id, likes){
  const url = `http://localhost:3000/toys/${id}`
  fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(likes)
  })
    .then(res => res.json())
}

function deleteToy(id){
  const url = `http://localhost:3000/toys/${id}`
  fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

// EVERYTHING ELSE
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
    const toyName = document.getElementById('new-toy-name')
    const toyImg = document.getElementById('new-toy-img')
    const submitBtn = document.getElementById('new-toy-submit')
    // Submit Procedure
    submitBtn.addEventListener('click', () => {
    const toyObj = {
      name: toyName.value,
      image: toyImg.value,
      likes: 0
    }
    createToy(toyObj)
    })
  } else {
    toyForm.style.display = 'none'
  }
})

// RENDER

function renderToys(toys) {
  const toyCollection = document.getElementById('toy-collection')
  toys.forEach(toy => {
    const cardDiv = document.createElement('div')
    cardDiv.className = "card"
    cardDiv.id = `toy-${toy.id}`
    const h = document.createElement('h2')
    h.innerHTML = toy.name
    const img = document.createElement('img')
    img.src = toy.image
    img.className = 'toy-avatar'
    const p = document.createElement('p')
    p.innerHTML = `${toy.likes} Likes!`
    const likeBtn = document.createElement('button')
    likeBtn.className = 'like-btn'
    likeBtn.innerHTML = 'like toy'
    likeBtn.addEventListener('click', () => {
      const likeValue = {
        likes: ++toy.likes
      }
      updateLikes(toy.id, likeValue)
      p.innerHTML = `${toy.likes} Likes!`
      console.log(toy.likes)
    })
    const deleteBtn = document.createElement('button')
    deleteBtn.id = 'delete-toy'
    deleteBtn.innerHTML = 'delete toy'
    deleteBtn.confirm
    deleteBtn.addEventListener('click', () => {
      deleteToy(toy.id)
      cardDiv.innerHTML = 'OOPS! Nothing exists!'
    })
    cardDiv.append(h, img, p, likeBtn, deleteBtn)
    toyCollection.append(cardDiv)
  })
}



// DOM end
})
// OR HERE!
