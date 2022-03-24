// write your code here
document.addEventListener('DOMContentLoaded', function () {
  fetchRamen();
});

function fetchRamen() {
  fetch('http://localhost:3000/ramens/')
    .then(resp => resp.json())
    .then(data => loadRamen(data))
}


function loadRamen(ramData) {
  let count = 0
  ramData.forEach(element => {
    if (count === 0) {
      loadRamenInfo(element)
    }
    count += 1
    const img = document.createElement('img');
    img.src = element.image
    document.getElementById("ramen-menu").append(img)
    img.addEventListener("click", () => { loadRamenInfo(element) })
  })
}

function loadRamenInfo(ramenInfo) {
  const img = document.createElement('img');
  img.src = ramenInfo.image
  document.querySelector('img.detail-image').src = ramenInfo.image
  document.querySelector('h2.name').innerText = ramenInfo.name
  document.querySelector('h3.restaurant').innerText = ramenInfo.restaurant
  document.getElementById('rating-display').replaceChildren(ramenInfo.rating)
  document.getElementById('comment-display').replaceChildren(ramenInfo.comment)
}

document.addEventListener("submit", (event) => {
  event.preventDefault();
  const inputName = document.querySelector('input#new-name')
  const inputRestaurant = document.querySelector('input#new-restaurant')
  const inputImage = document.querySelector('input#new-image')
  const inputRating = document.querySelector('input#new-rating')
  const inputComment = document.querySelector('textarea#new-comment')
  const input = {
    "name": inputName.value,
    "restaurant": inputRestaurant.value,
    "image": inputImage.value,
    "rating": inputRating.value,
    "comment": inputComment.value,
  }
  newRamen(input)
})

function newRamen(data) {
  fetch('http://localhost:3000/ramens', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(resp => resp.json())
    .then(ramen => console.log(ramen))
}