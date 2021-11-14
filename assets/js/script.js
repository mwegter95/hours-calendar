let displayDate = document.querySelector("#currentDay");
let putTimeBlocksHere = document.querySelector(".container");
let m = moment();
displayDate.textContent = m.format("LL");
let businessHours = [7,8,9,10,11,12,13,14,15,16,17,18,19];
let eventSaveArray = ["","","","","","","","","","","",""];
let eventLoadArray = [];
let hourOfDay = m.hour();
console.log(hourOfDay);


// build out time blocks on the page for business hours
let makeTimeBlocks = function() {
    for (let i = 0; i < businessHours.length; i++) {
        let hour = businessHours[i];
        let newTimeBlock = document.createElement("div");
        newTimeBlock.classList = "time-block col-12 row past";
        newTimeBlock.id = "time-block-" + i;
        newTimeBlock.innerHTML = `
                <p class="hour col-2" id="hour-${i}"> ${hour} </p>
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
        // if (saveClickedId > 10) {
        //     eventBlockId = saveClickedId.charAt(saveClickedId.length -2);
        // }
        // eventBlockId += saveClickedId.charAt(saveClickedId.length -1);
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
        // parse into an array of objects
        eventLoadArray = JSON.parse(eventLoadString);
        // make save and load strings equal to persist values after refresh
        eventSaveArray = eventLoadArray;
        console.log(eventLoadArray);
        for (let i = 0; i < eventLoadArray.length; i++) {
            let savedEvent = eventLoadArray[i];
            if (savedEvent == "") {
                
            } else {
                console.log(savedEvent);
                let effectedEvent = document.querySelector(`${savedEvent.id}`);
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