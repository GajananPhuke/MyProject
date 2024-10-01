

const addBtn = document.querySelector(".add-btn");
const modelContainer = document.querySelector(".model_container");
const priorityColor = document.querySelectorAll(".priority_color");
const model = document.querySelector(".model_container");
const textarea = document.querySelector(".textarea_container");
const deleteButton = document.querySelector(".remove-btn");
const pending_container = document.querySelector('.pending-container');
let isActiveLockUnlock = true;
let isActiveDeleteButton = false;
let colorArr = ["pink","purple","blue","green"];

loadExistingTicketsOnUI();
function loadExistingTicketsOnUI(){
    // get all ticket from LS
    const existingTickets =fetchExistingTickets();

    // console.log(existingTickets);

    // display on UI
    displayTickets(existingTickets);

}

function displayTickets(tickets){


    for(let i=0;i<tickets.length;i++){
 
     const ticket = tickets[i];
 
    //  console.log(ticket);
     const id = ticket.id;
     const color = ticket.color;
     const content = ticket.content;

    //  console.log(id);
    //  console.log(color);
    //  console.log(content);
 
    //  const {id, color, content} =ticket;
 
     createTicket(id, color, content,false);// only display no need to add again in local storage
 
    }
 
 }


// Use add Button to open and close modelContainer
let Modelflag =false;
addBtn.addEventListener('click',(e)=>{
   if(Modelflag==false){
        modelContainer.style.display="flex";//object diplay on screen
        Modelflag=true;
   }else{
        modelContainer.style.display="none";
        Modelflag =false;
   }
//    console.log("Model Container appered : ",Modelflag)
});


document.addEventListener("keypress",(e)=>{
    const key =e.key;
    // console.log(key);
    if(key=="+"){
        modelContainer.style.display="flex";//object diplay on screen
    }else if(key=="-"){
        modelContainer.style.display="none";
    }
})
// change active property during runtime e.Target
for(let i=0;i<priorityColor.length;i++){
    const priorityElement = priorityColor[i];
    priorityElement.addEventListener('click',(e)=>{
        removeAllActive();
        priorityElement.classList.add("active")
        // console.log(priorityElement.classList.add("active"));
    })
    
}
function removeAllActive(){
    for(let i=0;i<priorityColor.length;i++){
        const priorityElement = priorityColor[i];
        priorityElement.classList.remove("active");

    }
}
// console.log(priorityColor);
model.addEventListener('keypress',(e)=>{
    const key =e.key;
    if(key!="Enter"){
        return;
    }
    // Find the active selected color
    const activeColor = findActiveColor();
    // console.log( "activeColor : ",activeColor);

    // What is the text entered by user 
    const userContent = textarea.value;
    // console.log("userContent : ",userContent);
    const ticketId = randomTicketId();
// Creayte New Ticket
    createTicket(ticketId,activeColor,userContent,true);
    
   
    // Close Model 
    model.style.display="none";// hide model
    Modelflag=false;
    // console.log("Model Container appered : ",Modelflag)
     // Clear texArea Value
     textarea.value="";
    
});

function findActiveColor(){
    for(let i=0;i<priorityColor.length;i++){
        const priorityElement = priorityColor[i];
        if(priorityElement.classList.contains("active")){
         // console.log(priorityElement.classList);
            return priorityElement.classList[1];
        }
    }
}


function createTicket(ticketId,color,content,addToLocalStorage){
    // Update DOM to ticket 

    const ticketContainer = document.createElement('div');
    ticketContainer.setAttribute("class","ticket_container");// Set Class to TicketContainer
    // console.log(ticketContainer);
    
    ticketContainer.innerHTML=`
        <div class="ticket_color ${color}">
            ${color}
        </div>
        <div class="ticket_id">
            ${ticketId}
        </div>
        <div class="ticket_area">
             ${content}
        </div>
        <div class="ticket_lock_unlock">
            <i class="fa fa-lock"></i>
        </div>
    `

   
    //Add Functionality to lock-unlock button 
    //const  lockButton = document.querySelector(".ticket_lock_unlock");
    const  lockButton = ticketContainer.querySelector(".ticket_lock_unlock");
    const ticketArea = ticketContainer.querySelector(".ticket_area");
    const ticketPriority = ticketContainer.querySelector(".ticket_color");

    ticketContainer.addEventListener('click',handleTicketContainer);
    lockButton.addEventListener('click',(e)=>handleLockUnlockClick(e,ticketArea));
    ticketPriority.addEventListener('click',handleticketPriority);

// Add UI 
    pending_container.appendChild(ticketContainer);



   // create New Ticket to add in Local storage
   if(addToLocalStorage){
        const newTicket = {
            id:ticketId,
            color:color,
            content:content
        } 

        //add to localStorage
        addToExistingTicketsInLocalStorage(newTicket);
    }
   
}


  function addToExistingTicketsInLocalStorage(newTicket){
        
    //Step-1  : Featching Existing Ticket From Local Storage 
        const existingTickets = fetchExistingTickets();

    // Step-2 : Push New Ticket in existingTickets
        existingTickets.push(newTicket);

        // console.log("JS FORMAT ",existingTickets);
        // // // console.log(existingTickets);

    //Step-3 : Save existingTickets to local Storage
        savetickets(existingTickets);
    }

function fetchExistingTickets(){
    //Step-1 : featch data from local-storage
    const existingTickets =localStorage.getItem("kanbanTickets");

    // Step-2 : convert existingTickets JASOn to JavaScript 
    const existingTicketsJS = JSON.parse(existingTickets);

    if(existingTicketsJS==null){
        return [];
    }
    return existingTicketsJS;

}


// Save new Tickets in Local Storage 
function savetickets(newTickets){
    // Step-1 : Convert Js to JASON Format
    const newTicketsJASON = JSON.stringify(newTickets);
    // console.log("JSON FORMAT ",newTickets);
    // Step-2 : Add it into Local Storage 
    localStorage.setItem("kanbanTickets",newTicketsJASON);
}



// Create radom Ticket Id
function randomTicketId(){
    return "#1234";
}



//Add Functionality to lock-unlock button 
function handleLockUnlockClick(e,ticketArea){
    
    if(isActiveLockUnlock){
        e.target.classList.remove("fa-lock");
        e.target.classList.add("fa-unlock");
        isActiveLockUnlock=false;
        ticketArea.setAttribute("contenteditable","true");
        // console.log("isActiveLockUnlock ",isActiveLockUnlock);
        // console.log("Inner-if ClassList ",e.target.classList);
    }else{
        e.target.classList.remove("fa-unlock");
        e.target.classList.add("fa-lock");
        isActiveLockUnlock=true;
        ticketArea.setAttribute("contenteditable","false");// this will allow you to edit text after execution 
        // console.log("isActiveLockUnlock ",isActiveLockUnlock);
        // console.log("Outer-if ClassList ",e.target.classList);

    }
   
   
}


// Add Filter on single click
const priorityMenuColor = document.querySelectorAll(".color");
for(let i=0;i<priorityMenuColor.length;i++){
    const priorityColor = priorityMenuColor[i];
    priorityColor.addEventListener('click',(e)=>{
        const selectedColor = e.target.classList[1];
        // Take all ticket to mach with  selectedColor
        const allTickets = document.querySelectorAll(".ticket_container");
        for(let j=0;j<allTickets.length;j++){
            const ticketContainer = allTickets[j];
            const ticketColorElement = ticketContainer.querySelector(".ticket_color");
            const ticketColor = ticketColorElement.classList[1];
            // console.log(ticketColor);

            if(selectedColor != ticketColor){
                ticketContainer.style.display="none";
            }else{
                ticketContainer.style.display="block";
            }
        }
        // console.log(allTickets);
    })
    // Double click to filter ALL tickets Should be appered on screen
    priorityColor.addEventListener('dblclick',(e)=>{
        const allTickets = document.querySelectorAll(".ticket_container");

        for(let j=0;j<allTickets.length;j++){
            const ticketContainer = allTickets[j];
            ticketContainer.style.display="block";
           
        }
    })
    //-----------------------------------------------------------------------------------//
    
   
    // console.log(allTickets);
}

// Delete Button Functionality :
deleteButton.addEventListener('click',handleDeleteButton);
function handleDeleteButton(e){
    if(isActiveDeleteButton){
        e.target.classList.remove('red');
        isActiveDeleteButton=false;
    }else{
        e.target.classList.add("red");
        isActiveDeleteButton= true;
    }

    // console.log(e.target.classList);
}

// Delete ticket by using delete button 
function handleTicketContainer(e){
    if(isActiveDeleteButton){
        e.currentTarget.remove();
    }
}


// Handle Ticket_Priority_Color Function
function handleticketPriority(e){
    const exisitingColor = e.currentTarget.classList[1];
    const exisitingColorIndex = colorArr.indexOf(exisitingColor);
    // console.log("OldColor : ",exisitingColor);
    
    const newColorIndex = (exisitingColorIndex+1)%colorArr.length;
    const newColor = colorArr[newColorIndex];

    e.currentTarget.classList.remove(exisitingColor);
    e.currentTarget.classList.add(newColor);
    // console.log("NewColor : ",newColor);
    // console.log(exisitingColorIndex);
}
