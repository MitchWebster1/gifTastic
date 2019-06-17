const startingBtns = [
  "motorcycle fail",
  "excited",
  "austin powers",
  "chuck norris",
  "fail",
  "dance",
  "treadmill",
  "weightlifting",
];
const select = id => document.getElementById(id);
const createEl = el => document.createElement(el);
// const random = offset => Math.floor(Math.random) * offset;

// Creates new buttons based on input of textbox
const attach = (div, text, attachToEl, clas) => {
  const el = createEl(div);
  el.innerHTML = text;
  el.value = text;
  el.className = clas;
  attachToEl.append(el);
};

const createBtn = (event) => {
  event.preventDefault();
  const btnName = select("btnText").value;
  attach("button", btnName, select("btns"), "btn");
  select("btnForm").reset();
};

select("addBtn").addEventListener("click", createBtn);
select("addBtn").addEventListener("keydown", createBtn);

// ****************************************************

// Assigns all the data attributes to image on creation
const dataAssign = (response, i) => {
  const imgData = createEl("img");
  imgData.setAttribute("src", response.data[i].images.fixed_height_still.url);
  imgData.setAttribute("data-still", response.data[i].images.fixed_height_still.url);
  imgData.setAttribute("data-animate", response.data[i].images.fixed_height.url);
  imgData.setAttribute("data-state", "still");
  return imgData;
};

// *****************************************************

// Builds the div that the gif goes into then appends it to the main gif div
const gifAttach = (attachToEl, response, i, clas) => {
  const el = createEl("div");
  const rating = createEl("P");
  const img = dataAssign(response, i);
  rating.innerHTML = `Rated: ${response.data[i].rating}`;
  el.append(rating, img);
  el.className = clas;
  attachToEl.prepend(el);
  // dataAssign(response, i);
};

// ***********************************************************

// Gets value of button clicked and searchs for that type of gif.
const request = (search) => {
  $.ajax({
    url: `https://api.giphy.com/v1/gifs/search?api_key=FW6E7JrSMowL9qZhFstFGdSaEOVggJm3&q=${search}&limit=10&offset=0&rating=PG-13&lang=en`,
    method: "GET",
  })
    .then((response) => {
      for (let i = 0; i < response.data.length; i += 1) {
        gifAttach(select("gif"), response, i, "gifDiv");
      }
    })
    .catch(error => console.error(error));
};

// const axios = require("axios");

// const responseData = (response) => {
//   for (let i = 0; i < response.data.length; i += 1) {
//     gifAttach(select("gif"), response, i, "gifDiv");
//   }
// };

// const request = (search) => {
//   axios
//     .get(
//       `https://api.giphy.com/v1/gifs/search?api_key=FW6E7JrSMowL9qZhFstFGdSaEOVggJm3&q=${search}&limit=10&offset=0&rating=PG-13&lang=en`,
//     )
//     .then((response) => {
//       for (let i = 0; i < response.data.length; i += 1) {
//         gifAttach(select("gif"), response, i, "gifDiv");
//       }
//     })
//     .catch(error => console.error(error));
// };

const searchVal = (event) => {
  const searchTerm = event.target.value;
  request(searchTerm);
};

select("btns").addEventListener("click", searchVal);

// *************************************************

// Handles the animated and still image swapping
const stopStartGif = (event) => {
  const getData = data => event.target.getAttribute(data);
  const setData = (attr, data) => event.target.setAttribute(attr, data);
  const animate = getData("data-animate");
  const still = getData("data-still");
  const state = getData("data-state");
  if (state === "still") {
    setData("src", animate);
    setData("data-state", "animate");
  } else {
    setData("src", still);
    setData("data-state", "still");
  }
};

select("gif").addEventListener("click", stopStartGif);

// ***************************************************

// Creates buttons from array on page load
const start = () => {
  for (let i = 0; i < startingBtns.length; i += 1) {
    const text = startingBtns[i];
    attach("button", text, select("btns"), "btn");
  }
};

start();
