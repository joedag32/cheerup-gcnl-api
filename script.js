/* declare some variables */
const apiKey = 'AIzaSyDkNZylSVJND4hX0fJFCPAi52JGU8e-Z4o';
const functionURL = 'https://language.googleapis.com/v1/documents:analyzeSentiment?key=' + apiKey;
// array of privacy terms that we are looking for a match on
const privacyTerms = [
  "address",
  "cookies",
  "credit card",
  "credit card information",
  "ip address",
  "personal data",
  "personal information",
  "third-party",
  "use of personal information"
];
const input = document.getElementById("testValue");
const analyzeButton = document.getElementById("analyzeButton");
const objectOutput = document.getElementById("returnedObject");
let testValue = input.value;
/* set value of input field as the body to be sent via the POST request */
const postData = {
  documents: [
    {
      language: "en-us",
      type: "PLAIN_TEXT",
      content: testValue
    }
  ]
};

/* update value of input to pass */
input.addEventListener("input", updateValue);
function updateValue(e) {
  let inputString = e.target.value;
  // trim text to 5000 characters to pass to Azure
  postData.documents[0].content = inputString.substring(1,5000);
  console.log('length: ' + postData.documents[0].content.length);
}

analyzeButton.addEventListener("click", analyzeText);
/* call Azure Function via HTTP POST and return a very simple object  */
function analyzeText(e) {
  fetch(functionURL, {
    method: "POST",
    contentType: "application/json",
    payload: JSON.stringify(postData)
  })
    .then(res => res.json())
    .then(data => {
      console.log(postData.documents[0].content);
      console.log(data);
      evaluateKeyPhrases(data);
    })
    .catch(error => {
      console.error(error);
    });
}

// evaluate the returend Key Phrases
function evaluateKeyPhrases(data) {
  objectOutput.innerHTML = "";
  let keyPhrasesArray = data.documents[0].keyPhrases;
  console.log(keyPhrasesArray);
}
