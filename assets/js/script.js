let displayDate = document.querySelector("#currentDay");
let putTimeBlocksHere = document.querySelector(".container");
// temporarily changed to show hour change from 8 and timeblock styles update when update time function is called on the interval
let m = moment().hour(11);
displayDate.textContent = m.format("LL");
let businessHours = [7,8,9,10,11,12,13,14,15,16,17,18,19];
let eventSaveArray = ["","","","","","","","","","","",""];
let eventLoadArray = [];
let hourOfDay = m.hour();
console.log(hourOfDay);

// handle updating the time so that the color coded event blocks for past, present, future are updated as a user is on the page
let updateTime = function() {
    if (hourOfDay !== moment().hour()) {
        hourOfDay = moment().hour();
        updateTimeBlocks();
        return;
    }
}
setInterval(function() {
    updateTime();
    console.log(hourOfDay);
}, 6000)

let updateTimeBlocks = function() {
    let timeBlocks = document.querySelectorAll(".time-block");
    for (let i = 0; i < timeBlocks.length; i++) {
        const timeBlock = timeBlocks[i];
        console.log(timeBlock.getAttribute("hour"));
        if (timeBlock.getAttribute("hour") < hourOfDay) {
            timeBlock.classList = "time-block col-12 row past";
        } else if (timeBlock.getAttribute("hour") == hourOfDay) {
            timeBlock.classList = "time-block col-12 row present";
        } else {
            timeBlock.classList = "time-block col-12 row future";
        }
        console.log(timeBlock.classList);

    }
}

// build out time blocks on the page for business hours
let makeTimeBlocks = function() {
    for (let i = 0; i < businessHours.length; i++) {
        let hour = businessHours[i];
        let newTimeBlock = document.createElement("div");
        newTimeBlock.classList = "time-block col-12 row";
        newTimeBlock.id = "time-block-" + i;
        newTimeBlock.setAttribute("hour", i + 7);
        // check if the time block's hour is in the past or not and add a class for css styling
        if (newTimeBlock.getAttribute("hour") < hourOfDay) {
            newTimeBlock.classList.add("past");
        } else if (newTimeBlock.getAttribute("hour") == hourOfDay) {
            newTimeBlock.classList.add("present");
        } else {
            newTimeBlock.classList.add("future");
        }
        // the html for the actual blocks for time, event, and saving
        newTimeBlock.innerHTML = `
                <p class="hour col-2" id="hour-${i}"> ${hour}:00 </p>
                <textarea class="event-block col-8" id="text-area-${i}"></textarea>
                <button class="saveBtn save-block col-2" id="save-btn-${i}">save</button>`;
        putTimeBlocksHere.appendChild(newTimeBlock);
        console.log(newTimeBlock);

    };
}

// get value from any event block that is clicked save, and save it to local storage
let saveIsClicked = function(event) {
    // check to see if the clicked thing in the container is a save button
    if (event.target.classList[0] == "saveBtn") {
        // get the clicked save button's id but only the number
        let eventBlockId = "";
        let saveClickedId = event.target.id;
        eventBlockId = saveClickedId.slice(9)
        console.log(eventBlockId);
        
        // get the textarea at the same id row
        let textAtId = document.querySelector(`#text-area-${eventBlockId}`);
        // make an object for saving to local storage and add it to eventSaveArray
        let eventTextWithId = {};
        eventTextWithId.textWords = textAtId.value;
        eventTextWithId.id = `#text-area-${eventBlockId}`;
        eventSaveArray[eventBlockId] = eventTextWithId;
        
         // call save function to save to local storage
        saveEventsToStorage();
        loadEventsFromStorage();
    };
   

};

let saveEventsToStorage = function() {
    localStorage.setItem("eventsSaved", JSON.stringify(eventSaveArray));
}

let loadEventsFromStorage = function() {
    if (window.localStorage["eventsSaved"]) {
        let eventLoadString = (localStorage.getItem("eventsSaved"));
        // parse string into an array of objects
        eventLoadArray = JSON.parse(eventLoadString);
        // make save and load strings equal to persist values after refresh
        eventSaveArray = eventLoadArray;
        console.log(eventLoadArray);
        for (let i = 0; i < eventLoadArray.length; i++) {
            let savedEvent = eventLoadArray[i];
            if (savedEvent == "") {
                
            } else {
                console.log(savedEvent); // savedEvent is now any object the for loop hits in the array of saved event objects
                // then it selects the html element matching the timeblock
                let effectedEvent = document.querySelector(`${savedEvent.id}`);
                // finally it makes the textarea's value and display equal to the savedEvent object's textWords attribute
                effectedEvent.value = savedEvent.textWords;

            }
            
        }
        
    }    
}

// add event listener to entire schedule container
var allEventsContainer = document.querySelector(".container");
allEventsContainer.addEventListener("click", saveIsClicked);

makeTimeBlocks();
loadEventsFromStorage();