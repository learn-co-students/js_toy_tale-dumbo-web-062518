
// YOUR CODE HERE
const BASE_URL = `http://localhost:3000`
const TOYS_URL = `${BASE_URL}/toys`

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  let addToy = false

  renderToys()

  const submitBtn = document.querySelector(".add-toy-form .submit")
  submitBtn.onclick = (e) => {
    e.preventDefault()
    submitNewToyForm()
  }

  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
      // submit listener here
    } else {
      toyForm.style.display = 'none'
    }
  })
})

async function fetchToys() {
  const resp = await fetch(TOYS_URL)
  return resp.json()
}

async function fetchToy(id) {
  const resp = await fetch(`${TOYS_URL}/${id}`)
  return resp.json()
}

async function fetchPostToy(body) {
  // console.log(body)
  await fetch(TOYS_URL, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(body)
  }).then(resp => {
    // console.log(resp.json())
    resp.json().then(toy => {
      addRenderToy(toy)
    })
  })
}

async function fetchUpdateToy(body) {
  await fetch(`${TOYS_URL}/${body.id}`, {
    method: "PATCH",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(body)
  }).then(() => updateRenderToy(body.id))
}

function renderToys() {
  const toysData = fetchToys()
  const toyCollection = document.querySelector("#toy-collection")
  toyCollection.innerHTML = ""

  toysData.then(toys => {
    toys.forEach(toy => {
      addRenderToy(toy)
    })
  })
}

function addRenderToy(toy) {
  const toyCollection = document.querySelector("#toy-collection")

  const divCard = document.createElement("div")
  divCard.classList.add("card")
  divCard.classList.add(`card-${toy.id}`)

  const h2 = document.createElement("h2")
  h2.innerText = toy.name

  const img = document.createElement("img")
  img.src = toy.image
  img.classList.add("toy-avatar")

  const p = document.createElement("p")
  p.innerText = `${toy.likes} Likes`

  const likeBtn = document.createElement("button")
  likeBtn.innerText = "Like <3"
  likeBtn.classList.add("like-btn")
  likeBtn.dataset.id = toy.id
  likeBtn.onclick = () => incrementLikes(toy.id)

  divCard.append(h2, img, p, likeBtn)

  toyCollection.append(divCard)
}

function updateRenderToy(id) {
  const card = document.querySelector(`.card-${id}`)
  const h2 = document.querySelector(`.card-${id} h2`)
  const img = document.querySelector(`.card-${id} img`)
  const p = document.querySelector(`.card-${id} p`)

  fetchToy(id).then(toy => {
    h2.innerText = toy.name
    img.src = toy.image
    p.innerText = `${toy.likes} Likes`
  })
}

function submitNewToyForm() {
  const inputName = document.querySelector(`[name="name"]`)
  const inputImage = document.querySelector(`[name="image"]`)
  const body = {
    name: inputName.value,
    image: inputImage.value,
    likes: 0
  }

  // fetchPostToy(body)

  fetchPostToy(body).then(() => {
    inputName.value = ""
    inputImage.value = ""
  })
}

function incrementLikes(id) {
  fetchToy(id).then(toy => {
    ++toy.likes

    const body = {
      id: id,
      likes: toy.likes
    }

    fetchUpdateToy(body, id)
  })
}


// OR HERE!
