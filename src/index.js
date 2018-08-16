document.addEventListener("DOMContentLoaded", () => {
  renderToys()
})

const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE
async function fetchAllToys() {
  const response = await fetch("http://localhost:3000/toys")
  const data = await response.json()
  return data
}

async function postToy(toy) {
  const data = toy
  const response = await fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
    "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(data)
  })
  renderToys()
  return response.json()
}

async function updateToy(id, likes) {
  const data = likes
  const response = await fetch(`http://localhost:3000/toys/${id}`, {
    method: "PATCH",
    headers: {
    "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({
      likes: data
    })
  })
  renderToys()
  return response.json()
}

function renderToys() {
  const toyCollection = document.getElementById("toy-collection")
  toyCollection.innerHTML = ""
  const toyList = fetchAllToys()
  toyList.then(toys => {
    toys.forEach(toy => {
      const cardDiv = document.createElement("div")
      cardDiv.classList.add("card")
      const h2 = document.createElement("h2")
      const img = document.createElement("img")
      img.classList.add("toy-avatar")
      const p = document.createElement("p")
      const likeButton = document.createElement("button")
      likeButton.classList.add("like-btn")
      h2.innerText = toy.name
      img.src = toy.image
      p.innerText = toy.likes
      likeButton.innerText = "Like"
      likeButton.addEventListener("click", () => {
        const likes = parseInt(toy.likes) + 1
        const id = toy.id
        likeToy(id, likes)
      })
      cardDiv.append(h2, img, p, likeButton)
      toyCollection.append(cardDiv)
    })
  })
}

function createToy(toy) {
  postToy(toy)
}

function likeToy(id, likes) {
  updateToy(id, likes)
}

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    const toySubmit= document.getElementById("add-toy-form")
    toySubmit.addEventListener("submit", (e) => {
      e.preventDefault()
      const toyName = document.getElementById("toyName")
      const toyImg = document.getElementById("toyImg")
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


// OR HERE!
