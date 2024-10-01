const conatainerBtn = document.querySelector(".container");
const inc_Dec_Num = document.querySelector("#increment");
const display = document.querySelector(".number");
console.log(display);
let count = 0;

conatainerBtn.addEventListener("click",(e)=>{
  if(e.target.classList.contains("add")){
    console.log("Add btn clicke");
    let val1 =parseInt(inc_Dec_Num.value);
    handleAddOperation(val1);
  }
  if(e.target.classList.contains("subtract")){
    console.log("Sub btn clicke");
    let val1 =parseInt(inc_Dec_Num.value);
    handleSubOperation(val1);
  }
  if(e.target.classList.contains("reset")){
    console.log("Res btn clicke");
    handleResetOperation();
  }
})
function handleAddOperation(val1){
 
  let addNum =count+ val1;//2 ,4,6,8
  display.innerText=addNum;
  console.log("Counter : "+addNum);
 count=count+val1;//2,4,6,
  //  ++;

}
function handleSubOperation(val){
  
  let subNum =count - val;
  display.innerText=subNum;
  console.log("Counter : "+subNum);
  count=count-val
  //  ++;

}
function handleResetOperation(){
  count =0;
  let resetNum = count;
  display.innerText=resetNum;
  console.log("Counter : "+resetNum);
  

}