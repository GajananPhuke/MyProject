const allStarsDiv = document.querySelector(".stars");
const allStar = document.querySelectorAll(".star");
const ratingDisplay = document.querySelector(".rating");
let flag= false;

allStarsDiv.addEventListener('click',(e)=>{
  // console.log(e.target);
  if(e.target.classList.contains("star")){
    let targetVal = parseInt(e.target.getAttribute("data-value")); 
    for(let i=0;i<allStar.length;i++){
      let StarElement =allStar[i];

      //remove the filled class if already there
      StarElement.classList.remove("active");
      
      if(i<targetVal){
        StarElement.classList.add("active");   
      }
      flag = true;
    }
    ratingDisplay.innerText = targetVal;

  }
})

allStarsDiv.addEventListener("mouseover",(e)=>{


    if(e.target.classList.contains("star")){
      let targetVal = parseInt(e.target.getAttribute("data-value")); 
      for(let i=0;i<allStar.length;i++){
        let StarElement =allStar[i];
  
        //remove the filled class if already there
        // StarElement.classList.remove("active");
        if(!flag){
          if(i<targetVal){
            StarElement.classList.add("active");   
          }
        }
      }
      ratingDisplay.innerText = targetVal;


    }
})
allStarsDiv.addEventListener("mouseout",(e)=>{


    if(e.target.classList.contains("star")){
      let targetVal = parseInt(e.target.getAttribute("data-value")); 
      for(let i=0;i<allStar.length;i++){
        let StarElement =allStar[i];
  
        //remove the filled class if already there
       if(!flag){
        if(i<targetVal){
          StarElement.classList.remove("active");
        }
       }
        
      }
      ratingDisplay.innerText = 0;

    }
})