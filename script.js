/* declare some variables */
const apiKey = "AIzaSyDkNZylSVJND4hX0fJFCPAi52JGU8e-Z4o";
const functionURL =
  "https://language.googleapis.com/v1/documents:analyzeSentiment?key=" + apiKey;

// array of positive quotes
const positiveQuotes = [
  "Keep on trying!",
  "You are and amazing person!",
  "It's going to get better!",
  "Smile!",
  "Remember, every cloud has a silver lining!",
  "You are valued!",
  "Don't worry, be happy!"
];

const questionWrapper = document.getElementById("question-area");
const input = document.getElementById("testValue");
const analyzeButton = document.getElementById("analyzeButton");
const objectOutput = document.getElementById("returnedObject");
const resetBtn = document.getElementById("reset");
let testValue = input.value;
/* set value of input field as the body to be sent via the POST request */
const postData = {
  type: "PLAIN_TEXT",
  language: "EN",
  content: testValue
};
const apiData = {
  document: postData,
  encodingType: "UTF8"
};

/* update value of input to pass */
input.addEventListener("input", updateValue);
function updateValue(e) {
  let inputString = e.target.value;
  // trim text to 1000 characters before passing
  postData.content = inputString.substring(1, 1000);
}

analyzeButton.addEventListener("click", analyzeText);
/* call Google Cloud Natural Language API */
function analyzeText(e) {
  if (postData.content != "") {
    fetch(functionURL, {
    method: "POST",
    contentType: "application/json",
    body: JSON.stringify(apiData)
  })
    .then(res => res.json())
    .then(data => {
      outputSentiment(data);
    })
    .catch(error => {
      console.error(error);
    });
  }
}

function outputSentiment(data) {
  // hide question-wrapper
  questionWrapper.classList.add("hide");
  resetBtn.classList.remove("hide");

  objectOutput.innerHTML = "";
  // if sentiment score is less than 0 then output a random Quote, otherwise just confirm their positivity
  if (data.documentSentiment.score < 0) {
    let randomQuote =
      positiveQuotes[Math.floor(Math.random() * positiveQuotes.length)];
    objectOutput.innerHTML += "<p>" + randomQuote + "</p>";
  } else {
    objectOutput.innerHTML += "<p>That's good. Keep on being you!</p>";
  }
}

resetBtn.addEventListener("click", reset);
function reset() {
  resetBtn.classList.add("hide");
  objectOutput.innerHTML = "";
  questionWrapper.classList.remove("hide");
}

