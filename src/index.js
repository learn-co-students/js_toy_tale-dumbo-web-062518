document.addEventListener("DOMContentLoaded", init)

function init(){
  toggleViewForm()
  renderToysIndex()
  submitButton()
}

function renderToysIndex(){
  const toyCollectionDiv = document.querySelector("#toy-collection")
  const toysData = fetchToys()
  toysData.then(toys => {
    toys.forEach(toy => {
      const cardDiv = document.createElement("div")
      cardDiv.class = "card"
      const toyNameH2 = document.createElement("h2")
      toyNameH2.innerText = `${toy.name}`
      const avatarImage = document.createElement("img")
      avatarImage.src = `${toy.image}`
      avatarImage.width = "200"
      const toyLikes = document.createElement("p")
      toyLikes.innerText = `${toy.likes}`
      const likeBtn = document.createElement("button")
      // likeBtn.class = "like-btn"
      likeBtn.innerText = `Like ${toy.name}`
      likeBtn.addEventListener("click", () => {
        const likes = toy.likes + 1
        toyLikes.innerText = `${likes}`
        likeBtnAction(toy.id, likes)
        // likeBtn.class = "disabled"
        likeBtn.disabled = "true"
        likeBtn.innerText = "Liked!"
      })
      cardDiv.append(toyNameH2, avatarImage, toyLikes, likeBtn)
      toyCollectionDiv.append(cardDiv)
    })
  })
}


function likeBtnAction(id, likesUpOne){
  const likesObject = {likes: likesUpOne}
  addLike(id, likesObject)
}

function toggleViewForm(){
  const toyForm = document.querySelector('#toy-form-container')
  const addBtn = document.querySelector('#new-toy-btn')
  let addToy = false
  addBtn.addEventListener('click', () => {
    // toggle view
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
      // submit listener here
    } else {
      toyForm.style.display = 'none'
    }
  })
}

function submitButton(){
  const inputName = document.querySelector('#input-name')
  const inputImgUrl = document.querySelector('#input-img-url')
  const submitBtn = document.querySelector('#createToyBtn')
  submitBtn.addEventListener("click", () => submitBtnAction(inputName.value, inputImgUrl.value))
}

function submitBtnAction(toyName, imgUrl){
  const body = {
    name: toyName,
    image: imgUrl,
    likes: 0
  }
  postToy(body).then(() => renderNewToy(body))
}

function renderNewToy(toy){
  const toyCollectionDiv = document.querySelector("#toy-collection")
  const cardDiv = document.createElement("div")
  cardDiv.class = "card"
  const toyNameH2 = document.createElement("h2")
  toyNameH2.innerText = `${toy.name}`
  const avatarImage = document.createElement("img")
  avatarImage.src = `${toy.image}`
  avatarImage.width = "200"
  const toyLikes = document.createElement("p")
  toyLikes.innerText = `${toy.likes}`
  const likeBtn = document.createElement("button")
  // likeBtn.class = "like-btn"
  likeBtn.innerText = `Like ${toy.name}`
  likeBtn.addEventListener("click", () => {
    const likes = toy.likes + 1
    toyLikes.innerText = `${likes}`
    likeBtnAction(toy.id, likes)
    // likeBtn.class = "disabled"
    likeBtn.disabled = "true"
    likeBtn.innerText = "Liked!"
  })
  cardDiv.append(toyNameH2, avatarImage, toyLikes, likeBtn)
  toyCollectionDiv.append(cardDiv)
}
