/*
  Clears the search result container from existing elements.
  Loops through all ancestors of search result list and
  deletes as long as there are list items.
*/
function clearSearchResultArea() {
  let elementsToRemove = document.getElementById("searchResultList");

  while (elementsToRemove.firstChild) {
    elementsToRemove.removeChild(elementsToRemove.firstChild);
  }
}

function addResult(resultList, answer, sourceText) {
  let listItem = document.createElement("li");
  listItem.innerHTML = answer;
  //let resultText = document.createTextNode(answer);
  //listItem.i(answer);
  if (null !== sourceText && sourceText !== undefined) {
    let sourceSection = document.createElement("p");
    sourceSection.classList.add("result-source");
    let resultSource = document.createTextNode(sourceText);
    sourceSection.appendChild(resultSource);
    listItem.appendChild(sourceSection);
  }
  listItem.classList.add("folded");
  listItem.addEventListener("click", evt => {
    listItem.classList.toggle("folded");
  });
  resultList.appendChild(listItem);
}

function makeBold(str) {
  let regex = /\*\*([^\*]+)\*\*/g;
  return str.replace(regex, "<b>$1</b>");
}

let form = document.getElementById("search-form");

/*
  Defines eventhandler for submit action for search-"form".
  API-call is defined in eventhandler and input question
  is sent as a POST-request in body.
*/
form.addEventListener("submit", () => {
  let url =
    "https://telosgreen.azurewebsites.net/qnamaker/knowledgebases/ce641050-750c-4279-a3ca-7e649a5b88b8/generateAnswer";

  let data = document.getElementById("search-form3-1v").value;

  let body = JSON.stringify({ question: data });

  //Call method to clear search result area before showing new search
  //result.
  clearSearchResultArea();

  const searchResult = async () => {
    const response = await fetch(url, {
      method: "POST",
      body: body,
      headers: {
        "Content-Type": "application/json",
        Authorization: "EndpointKey d1686420-c822-421a-ac16-5055906050d1"
      }
    });
    const myJson = await response.json();
    let resultList = document.getElementById("searchResultList");

    /*
      Loop through all elements in response' answers list, 
      add searchitems to result list.
    */
    for (let i in myJson.answers) {
      addResult(
        resultList,
        makeBold(myJson.answers[i].answer),
        myJson.answers[i].source
      );
    }
  };
  searchResult();
});
