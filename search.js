let form = document.getElementById("search-form");

form.addEventListener("submit", () => {
  let url =
    "https://telosgreen.azurewebsites.net/qnamaker/knowledgebases/ce641050-750c-4279-a3ca-7e649a5b88b8/generateAnswer";

  let data = document.getElementById("search-form3-1v").value;

  let body = JSON.stringify({ question: data });

  const searchResult = async () => {
    const response = await fetch(url, {
      method: "POST",
      body: body,
      headers: {
        "Content-Type": "application/json",
        "Authorization": "EndpointKey d1686420-c822-421a-ac16-5055906050d1"
      }
    });
    const myJson = await response.json();
   //console.log((myJson));

    //let obj = JSON.parse(myJson);
    //console.log(obj);
    //let answers = new Array(myJson.answers.length);

      let answer = myJson.answers[0].answer;
      console.log(answer);
  };
  
  searchResult();

  const searchBlockContainer = document.getElementById('id="search-form3-1v"');
  const searchResultContainer = document.createElement('article');
  searchResultContainer.setAttribute('class', 'container');
  searchResultContainer.setAttribute('id', 'searchResultArea');
  searchBlockContainer.appendChild(searchResultContainer);

  // let searchR = searchResult();
  // let result = JSON.stringify(searchR);

  // obj = 

  //console.log(result);

});

