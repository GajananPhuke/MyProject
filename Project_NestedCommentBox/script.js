const commentForm = document.querySelector(".commentForm");
const commentInput = document.querySelector('#commentInput');
const commentContainer = document.querySelector(".commentContainer");

commentForm.addEventListener('click',(e)=>{
  const submitCommentBtn = e.target.getAttribute("id"); 
  if(submitCommentBtn === "submitComment"){
    
    //get the value from the input box 

    const commentText = commentInput.value.trim();
   

    //add a comment with that value 

    addComment(commentText);

     //clean the text in the input box 
    commentInput.value = "";
  }
})

function addComment(text){

  const commentDiv = document.createElement("div");
  commentDiv.setAttribute("class","comment");  
  commentDiv.innerHTML = `
    <p>${text}</p>
      <button class="replyButton">Reply</button>
      <div class="repliesContainer">
        
      </div>
      <textarea  id="" class="replyInput" placeholder="Write a reply"></textarea>
      `;

      commentContainer.appendChild(commentDiv);


// console.log(commentDiv  );
// console.log(text);
}
let isActiveReplyBtn = false;
commentContainer.addEventListener("click",(e)=>{

 

  if(e.target.classList.contains("replyButton")){

    

    // Take parent element of inside Inner Html document 
    const commentParent = e.target.parentElement;
    const replyButton = commentParent.querySelector(".replyButton");
    const replyInput = commentParent.querySelector(".replyInput");
    const repliesContainer = commentParent.querySelector(".repliesContainer");
  

    if(isActiveReplyBtn){
      // Give Enable to disply reply text box 
      replyInput.style.display = 'none';
      replyButton.classList.remove("activeGreen");
      isActiveReplyBtn = false;
      console.log("isActiveReplyBtn : ",isActiveReplyBtn);
    }else{
      //  color change when reply buttonwill active 
      replyButton.classList.add("activeGreen");
      console.log(replyButton);
      isActiveReplyBtn = true;
      console.log("isActiveReplyBtn : ",isActiveReplyBtn);



      
      if(replyInput){
    // Give Enable to disply reply text box 
      replyInput.style.display = 'flex';
  
    // add text on display
      const p = document.createElement("p");
      p.innerText = replyInput.value.trim();
      repliesContainer.appendChild(p);
  
      // clean text box after disply 
      replyInput.value = "";
  
      }
    }


    
    // replyInput.style.display = 'none';
    // console.log(replyInput.value);
  }
})



