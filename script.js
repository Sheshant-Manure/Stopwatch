// Selecting hours, minutes and seconds that will be displayed on stopwatch
let seconds = document.querySelector('#seconds');
let minutes = document.querySelector('#minutes');
let hours = document.querySelector('#hours');

// Declaring and initialising hours, minutes and seconds count variables
let secondsCount = 1;
let minutesCount = hoursCount = 0;

// Keeping track of toggle between start, pause and reset events
let isStarted = false, isReset = false, isPaused = false;

let intervalID; // to store the interval ID of setInterval(), so that we can clear the timer ( to perform pause and reset) check line #62
const startWatch = () => { 
    if(!isStarted){ // This will check if the stopwatch is already running or not.
        isStarted = true;   // since stopwatch will start running now.
        isPaused = false;   // Only when pause is pressed, this will become true.
        isReset = false;    // Only when reset is pressed, this will become true.

        // setInterval function repeats itself on loop every 1000 ms or 1 sec.
        intervalID = setInterval(() => {
            if(secondsCount === 60) {   // after 60 seconds, we update minute to 01 line #24
                secondsCount = 0;   // When the seconds count reaches 60, we display 00 and not 60
                minutesCount++ ;
                if(minutesCount === 60) { // after 60 minutes, we update hours to 01 line #27
                    minutesCount=0; // When the minutes count reaches 60, we display 00 and not 60
                    hoursCount ++ ;

                    // In general, if the count is single digit, we need to display it as 2 digits with first digit as 0, the below code takes care of that
                    if (hoursCount < 10) {  
                        hours.innerHTML = '0' + hoursCount;
                    }
                    else {
                        hours.innerHTML = hoursCount;
                    }
                }
    
                if (minutesCount < 10) {
                    minutes.innerHTML = '0' + minutesCount;    
                }
                else {
                    minutes.innerHTML = minutesCount;
                }            
            }
            
            if(secondsCount < 10) {
                seconds.innerHTML = '0' + secondsCount;
            }
            else {
                seconds.innerHTML = secondsCount;
            }
            secondsCount++;
            
        }, 1000);
    }
} 


// When pause is pressed, we clear the setInterval, which stops the iterative function immediately
const pauseWatch = () => {
    if(!isPaused) {
        clearInterval(intervalID);  // interval ID declared at line #13 and value assigned at line #21
        isPaused = true;
        isStarted = false; 
        isReset = false;
    }
} 

// Reset button functionality to stop timer as well
const resetWatch = () => {
    if(!isReset)
    {
        // Resetting to initial values as set when declaring
        secondsCount = 1;
        minutesCount = hoursCount = 0 ;

        // Resetting the display to 00:00:00
        hours.innerHTML = '0' + hoursCount;
        minutes.innerHTML = '0' + minutesCount;
        seconds.innerHTML = '00'; // since secondsCount is initialized to 1 and not 0.
        pauseWatch(); //need to clear the setInterval to stop the timer after it is set to initial state.

        // This ensures that the table generated to check laps is emptied after reset
        rowCount = 1;
        tbody.innerText = ''; 

        isStarted = false;
        isPaused = false;
        isReset = true;
    }
}


// Creating a separate table to display number of laps and the corresponding stop watch timestamp
let tbody = document.querySelector('tbody');
let rowCount = 1; // for 1st row
const displayLaps = () => {
    if (isStarted) {
        if(!isPaused) {
            if(!isReset) {
                let tr = document.createElement('tr');
                let td1 = document.createElement('td');
                td1.innerText = rowCount;
                rowCount ++;
                let td2 = document.createElement('td');
                let lapTimeStamp = '';
                if (hoursCount < 10) {
                    lapTimeStamp += '0' + hoursCount + ':';
                } 
                else {
                    lapTimeStamp+=hoursCount+':';
                }
                if (minutesCount < 10) {
                    lapTimeStamp += '0' + minutesCount + ':';
                } 
                else {
                    lapTimeStamp+=minutesCount+':';
                }
                if (secondsCount < 10) {
                    lapTimeStamp += '0' + secondsCount;
                } 
                else {
                    lapTimeStamp+=secondsCount;
                }
                td2.innerText = lapTimeStamp;
                tr.appendChild(td1);
                tr.appendChild(td2);
                tbody.appendChild(tr);
            }
        }
    }
}
