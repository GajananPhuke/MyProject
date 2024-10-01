const addBtn = document.querySelector(".add");
const readBtn =document.querySelector(".read");
const list = document.querySelector("ul");
let count =0;

// Add Data to local Storage 
addBtn.addEventListener('click',(e)=>{
  let value = ++count;
  // fetch data from Local storage
  var existingItemslistJs = fetchDataFromLocalStorage();
  
  // push value in existingItemslis
  existingItemslistJs.push(value);

  // Svae data in Local Storage 
  saveListInLocalStorage(existingItemslistJs);

  // console.log(existingItemslistJs);
})
function fetchDataFromLocalStorage(){

  var existingItemslistJSON = localStorage.getItem("allItemList");

  // Convert JSON String to JS string
  var existingItemslistJs = JSON.parse(existingItemslistJSON);
  if(existingItemslistJs==null){
    return [];
  }
  return existingItemslistJs;
}

function saveListInLocalStorage(existingItemslistJs){
    // Convert it 1st Js to JSON string
    var existingItemslistJSON = JSON.stringify(existingItemslistJs);

    localStorage.setItem("allItemList",existingItemslistJSON);
}

// Fetch data to local Storage 

readBtn.addEventListener('click',()=>{

  //clear my exisitng list
  list.innerHTML="";
    // fetch data from Local storage
  var existingItemslistJs = fetchDataFromLocalStorage();
  for(let i=0;i<existingItemslistJs.length; i++){
      let data = existingItemslistJs[i];
      // console.log(existingItemslistJs[i]);
      const newlist = document.createElement("li");
      newlist.innerText=data;

      // Appent newList into list 
      list.appendChild(newlist);
      // console.log(newlist);
  }
  
  // console.log(existingItemslistJs);
})
