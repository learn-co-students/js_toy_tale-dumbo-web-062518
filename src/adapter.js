async function fetchToys(){
  const response = await fetch("http://localhost:3000/toys")
  return await response.json()
}

async function postToy(body){
  await fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {"Content-Type": "Application/json"},
    body: JSON.stringify(body)
  })
}

async function addLike(id, body){
    await fetch(`http://localhost:3000/toys/${id}`, {
      method: "PATCH",
      headers: {"Content-Type": "Application/json"},
      body: JSON.stringify(body)
    })
}
