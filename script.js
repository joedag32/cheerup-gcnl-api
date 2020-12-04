/* declare some variables */
const apiKey = process.env.API_KEY;
const functionURL =
  "https://language.googleapis.com/v1/documents:analyzeSentiment?key=" + apiKey;

// array of positive quotes
const positiveQuotes = [
  "Keep on trying!",
  "You almost got it!",
  "You’ve just about got it!",
  "Nice going!",
  "Smile!",
  "Remember, every cloud has a silver lining!",
  "You are valued!"
];

const input = document.getElementById("testValue");
const analyzeButton = document.getElementById("analyzeButton");
const objectOutput = document.getElementById("returnedObject");
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
  console.log("length: " + postData.content.length);
}

analyzeButton.addEventListener("click", analyzeText);
/* call Google Cloud Natural Language API */
function analyzeText(e) {
  console.log(JSON.stringify(apiData));

  fetch(functionURL, {
    method: "POST",
    contentType: "application/json",
    body: JSON.stringify(apiData)
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      outputSentiment(data);
    })
    .catch(error => {
      console.error(error);
    });
}

function outputSentiment(data) {
  let returnedSentences = data.sentences;

  let randomQuote =
    positiveQuotes[Math.floor(Math.random() * positiveQuotes.length)];
  console.log(randomQuote);

  /*
  if (data.documentSentiment.score < 0) {
    objectOutput.innerHTML += '';
  }
  */

  objectOutput.innerHTML = "<p>-1 is negative and 1 is positive</p>";
  objectOutput.innerHTML +=
    "<p><strong>Overall sentiment score:</strong> " +
    data.documentSentiment.score +
    "</p>";
  objectOutput.innerHTML +=
    "<p><strong>Individual sentences analyzed:</strong></p>";
  objectOutput.innerHTML += "<ul>";
  returnedSentences.forEach(
    element =>
      (objectOutput.innerHTML +=
        "<li>" +
        element.text.content +
        " - score: " +
        element.sentiment.score +
        "</li>")
  );
  objectOutput.innerHTML += "</ul>";
}
