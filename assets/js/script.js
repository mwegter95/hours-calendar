let displayDate = document.querySelector("#currentDay");
let putTimeBlocksHere = document.querySelector(".container");
let m = moment();
console.log(displayDate);
displayDate.textContent = m.format("LL");
let businessHours = [7,8,9,10,11,12,1,2,3,4,5,6,7];
let eventSaveArray = ["","","","","","","","","","","",""];
let eventLoadArray = [];


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
    if (event.target.classList[0] == "saveBtn") {
        // get the clicked save button's id
        let eventBlockId = event.target.id;
        eventBlockId = eventBlockId.charAt(eventBlockId.length -1);
        // get the textarea at the same id row
        let textAtId = document.querySelector(`#text-area-${eventBlockId}`);
        // make an object for saving to local storage and add it to eventSaveArray
        let eventTextWithId = {};
        eventTextWithId.textWords = textAtId.value;
        eventTextWithId.id = `#text-area-${eventBlockId}`;
        eventSaveArray[eventBlockId] = eventTextWithId;
        
    };
    // call save function to save to local storage
    saveEventsToStorage();
    loadEventsFromStorage();

};

let saveEventsToStorage = function() {
    window.localStorage["eventsSaved"] = eventSaveArray;
}

let loadEventsFromStorage = function() {
    if (window.localStorage["eventsSaved"]) {
        eventLoadArray = window.localStorage["eventsSaved"];
        console.log(eventLoadArray);
        
    }    
}

// add event listener to entire schedule container
var allEventsContainer = document.querySelector(".container");
allEventsContainer.addEventListener("click", saveIsClicked);

makeTimeBlocks();
loadEventsFromStorage();