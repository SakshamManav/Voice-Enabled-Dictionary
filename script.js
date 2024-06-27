let url = " https://api.dictionaryapi.dev/api/v2/entries/en/";
let input = document.querySelector("#input");
let btn = document.querySelector(".btn");
let word1 = document.querySelector(".word");
let sentence = document.querySelector(".sentence");
let word;

async function dictionary(word) {
  word = input.value;
  let data = await fetch(url + word);
  var response = await data.json();

  console.log(response);
  if (data.ok) {
    word1.innerHTML = response[0].meanings[0].definitions[0].definition;
    word1.style.color = "black";
  } else if (!data.ok) {
    word1.innerHTML = "Could not find the word";
    word1.style.color = "Red";
    console.log("not ok");
  }
}
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    console.log("enter btn clicked");
    dictionary(word);
  }
});

btn.onclick = () => {
  console.log("clicked");
  dictionary(word);
};
