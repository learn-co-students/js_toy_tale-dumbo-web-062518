const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE

document.addEventListener('DOMContentLoaded', () => {

  renderAllToys()

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

  const toySubmitBtn = document.getElementById('new-toy-submit')
  toySubmitBtn.addEventListener('click', makeNewToy)

  function createNewToy(newToyObject){
    fetch('http://localhost:3000/toys', {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(newToyObject)
    })
    .then(renderAllToys)
  }

  function makeNewToy(e){
    e.preventDefault()
    const allInputs = document.getElementsByTagName('input')
    const newToyName = allInputs[0].value
    const newToyImg = allInputs[1].value
    return createNewToy({name: newToyName, image: newToyImg, likes: 0})
  }

  function makeLikeButton(toy){
    const likeBttn = document.createElement('button')
    likeBttn.innerText = 'Like'
    likeBttn.classList.add(`like-btn`)
    likeBttn.dataset.id = toy.id
    likeBttn.dataset.likes = toy.likes
    likeBttn.id = `like-${toy.id}`
    likeBttn.addEventListener('click', updateLikes)
    return likeBttn
  }

  function getAllToys(){
    return fetch('http://localhost:3000/toys')
      .then(res => res.json())
  }

  function getOneToy(toyID){
    return fetch(`http://localhost:3000/toys/${toyID}`)
      .then(res => res.json())
  }

  function renderAllToys(){
    toyForm.style.display = 'none'
    const collection = document.getElementById('toy-collection')
    collection.innerText = ''
    getAllToys().then(toys => toys.forEach((toy) => {
      const divCard = document.createElement('div')
      divCard.classList.add('card')
      divCard.id = `toy-${toy.id}`
      const nameTitle = document.createElement('h2')
      nameTitle.innerText = toy.name
      const imgSrc = document.createElement('img')
      imgSrc.src = toy.image
      imgSrc.classList.add('toy-avatar')
      const likeDisplay = document.createElement('p')
      likeDisplay.id = `likes-${toy.id}`
      if(Math.abs(toy.likes) > 1){
      likeDisplay.innerText = `${toy.likes} Likes`}
      else{likeDisplay.innerText = `${toy.likes} Like`}
      const likeBttn = makeLikeButton(toy)
      divCard.append(nameTitle, imgSrc, likeDisplay, likeBttn)
      collection.append(divCard)
    }))
  }

  function updateLikes(e){
    const toyId = e.target.dataset.id
    getOneToy(toyId).then(toy => {
      ++toy.likes

      const likes = document.getElementById(`likes-${toyId}`)

      likes.innerText = `${toy.likes} Likes`
      increaseLikes(toyId, toy.likes)
    })

  }

  function increaseLikes(toyId, toyLikes){

    fetch(`http://localhost:3000/toys/${toyId}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({likes: toyLikes})
    })
    .then(res => res.json())
  }



})




// OR HERE!
