

const form = document.querySelector("form");
const searchField = document.querySelector(".searchField");
const apiKey = "c77a19bb3bfc4086886163212241409";

// console.log(searchField);
form.addEventListener('submit',search);
    
function search(e){
    e.preventDefault();//preventDefault() method stops the default action.
    const searchValue = searchField.value;
    featchData(searchValue);
}

async function featchData(query){
    console.log("making an api call to fetch the data for query ",query);
    const url =`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${query};`
    // console.log("Befor HTTP responce URL :",url);
    
    try{
        // HTTP responce 
        const resp = await fetch(url);// inbuilt method to featch data from serever
        console.log(url);

        // Extract the json body from HTTP responce

        const data =await resp.json();
        console.log(data);   



        // Fetch data from result 

        let currentTemp = data.current.temp_c;
        let currentCondition = data.current.condition.text
        let locationName = data.location.name;
        let localTime = data.location.localtime
        let conditionEmoji = data.current.condition.icon
       

        // console.log(currentTemp);
        // console.log(currentCondition);
        // console.log(locationName);
        // console.log(localTime);
        // console.log(conditionEmoji);


        // UpDate DOM 

        updateDOM(currentTemp,currentCondition,locationName,localTime,conditionEmoji);

    }catch(err){
        console.log("Somthing went wrong",err );
    }
}



// update DOM
const LocationName = document.querySelector("p");
const tempprature = document.querySelector(".temp");
const spanTime = document.querySelector(".time_location span");
const WeatherCondtion = document.querySelector(".weather_condition span");
const Emoji = document.querySelector("img");
function updateDOM(temp,condition,locationName,time,emoji){
        // console.log(temp);
        console.log(condition);
        // console.log(locationName);
        // console.log(time);
        // console.log(emoji);

        LocationName.innerText = locationName;
        tempprature.innerText = temp;
        spanTime.innerText = time;

        WeatherCondtion.innerText = condition;
        // Emoji.setAttribute("src","emoji");

}
