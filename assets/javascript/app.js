// const apiKey = "FW6E7JrSMowL9qZhFstFGdSaEOVggJm3";
const select = id => document.getElementById(id);
const createEl = el => document.createElement(el);

const attach = (div, text, attachToEl) => {
  const el = document.createElement(div);
  el.innerHTML = text;
  el.value = text;
  attachToEl.append(el);
};

const createBtn = (event) => {
  event.preventDefault();
  const btnName = select("btnText").value;
  attach("button", btnName, select("btns"));
  select("btnForm").reset();
};

select("addBtn").addEventListener("click", createBtn);
select("addBtn").addEventListener("keydown", createBtn);

const dataAssign = (response, i) => {
  const imgData = createEl("img");
  imgData.setAttribute("src", response.data[i].images.fixed_height_still.url);
  imgData.setAttribute("data-still", response.data[i].images.fixed_height_still.url);
  imgData.setAttribute("data-animate", response.data[i].images.fixed_height.url);
  imgData.setAttribute("data-state", "still");
};

const gifAttach = (attachToEl, response, i, img) => {
  const el = createEl("div");
  const rating = createEl("P");
  // const img = dataAssign(response, i);
  rating.innerHTML = response.data[i].rating;
  el.append(rating, img);
  attachToEl.append(el);
  dataAssign(response, i);
};

const request = () => {
  $.ajax({
    url: searchUrl,
    method: "GET",
  }).then((response) => {
    for (let i = 0; i < response.data.length; i += 1) {
      const img = dataAssign(response, i);
      gifAttach(select("gif"), response, i, img);
      console.log(response.data[i]);
    }
  });
};

const searchVal = (event) => {
  const searchTerm = event.target.value;
  request(searchTerm);
  console.log(searchTerm);
};
const searchUrl = `https://api.giphy.com/v1/gifs/search?api_key=FW6E7JrSMowL9qZhFstFGdSaEOVggJm3&q=${searchVal}&limit=10&offset=0&rating=PG&lang=en`;

select("btns").addEventListener("click", searchVal);
