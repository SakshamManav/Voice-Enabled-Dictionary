let url = " https://api.dictionaryapi.dev/api/v2/entries/en/";
let audioIcon = document.querySelector(".audio-icon");
let audioContainer = document.querySelector(".audio-container");
let audio = document.querySelector(".real-audio");
let input = document.querySelector("#input");
let btn = document.querySelector(".btn");
let word1 = document.querySelector(".word");
let sentence = document.querySelector(".sentence");
let synonyms = document.querySelector(".synonyms");
let antonyms = document.querySelector(".antonyms");
let msg = document.querySelector(".msg");
let word;

let data;
async function dictionary(word) {
  let response = await fetch(url + word);
  data = await response.json();

  console.log(data);
  console.log(data[0].meanings[0].synonyms.slice(0,5));
  if (response.ok) {
    word1.innerHTML = `Meaning = ${data[0].meanings[0].definitions[0].definition}`;
    word1.style.color = "black";
    checkAudio();
    checkSynonyms();
    checkAntonyms();
  } else if (!data.ok) {
    word1.innerHTML = "Could not find the word. Please write a valid word!";
    word1.style.color = "Red";
    synonyms.style.display = "none";
    antonyms.style.display = "none";
  }
}
// Functionality
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    word = input.value;
    dictionary(word);
  }
});
btn.onclick = () => {
  word = input.value;
  dictionary(word);
};
audioIcon.onclick = () => {
  audio.play();
};
// Function to handle audio

function checkAudio() {
  let found = false;
  for (let object of data[0].phonetics) {
    if (object.audio !== "") {
      audioIcon.style.display = "flex";
      msg.style.display = "none";
      audio.src = object.audio;
      found = true;
      break;
    }
  }
  if (!found) {
    msg.style.display = "block";
    msg.innerHTML = "Oops! pronounciation of this word is not available";
    audio.src = "";
    audioIcon.style.display = "none";
  }
}
// Function to handle synonyms
function checkSynonyms() {
  let found = false;

  for (let object of data[0].meanings) {
    if (object.synonyms.length > 0) {
      synonyms.innerHTML = `Synonyms =  ${object.synonyms.slice(0,5)}`;
      found = true;
      break;
    }
  }
  if (!found) {
    synonyms.innerHTML = "Synonyms = Not Found";
  }
}
// Function to handle antonyms
function checkAntonyms() {
  let found = false;

  for (let object of data[0].meanings) {
    if (object.antonyms.length > 0) {
      antonyms.innerHTML = `Antonyms = ${object.antonyms.slice(0,5)}`;
      found = true;
      break;
    }
  }
  if (!found) {
    antonyms.innerHTML = "Antonyms =  Not Found";
  }
}
