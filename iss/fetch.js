let url = 'https://api.wheretheiss.at/v1/satellites/25544'

let issLat = document.querySelector('#iss-lat') // finds span element for latitude
let issLong = document.querySelector('#iss-long') // finds span element for longitude

let timeIssLocationFetched = document.querySelector('#time') //shows date/time positon was updated

let update = 10000 // miliseconds between recursive updates

let maxFailedAttempts = 3

let issMarker //no assigned value here, assigned below

let issIcon = L.icon( {
    iconUrl: 'iss-icon.png',
    iconSize: [50, 50],
    iconAnchor: [25, 25] // shifts icon anchor to center on ISS lat/long
})

let map = L.map('iss-map').setView([0, 0], 1) //no # needed here, just id name
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copywrite">OpenStreetMap</a>',    
}).addTo(map)

iss(maxFailedAttempts) // call function one time to start setInterval loop

/*setInterval(iss, mapUpdate) // every 10 seconds. REMOVED IN FAVOR OF setTimeout!*/
function iss(attempts) {// everything for the fetch put into another function to be easily referenced for setInterval
    if (attempts <= 0 ) { // keeps track of how many failure attempts left
        alert('Attempts to contact server failed after three tries')
        return //COULD NOT ACTUALLY GET TO WORK (FAIL) PROPERLY
    }


        // fetch ddes nort use callback function, instead it uses 'promise' object
    fetch(url).then(res => { // then function call takes only 1 argument: res (response)
        return res.json() //.json function converts the response data in JS objects
    // anything 'returned' from .then block is sent to the next .then block
    }).then((issData) => {  // issData is the converted JS objects           ^^ 
        console.log(issData)
        let lat = issData.latitude // data converted from json request^^
        let long = issData.longitude
        issLat.innerHTML = lat
        issLong.innerHTML = long

        if(!issMarker) { // create marker if doesn't exist. Moves if does exist
            issMarker = L.marker([lat, long], {icon: issIcon}).addTo(map) //creates marker
        } else {
            issMarker.setLatLng([lat, long]) //moves marker coordinates update
        }

        let now = Date() // format is day-month-dd-yyyy-hh-mm-ss
        timeIssLocationFetched.innerHTML = (`This data was fetched at ${now}`) // inside iss(), so it will now update as well

    }).catch((err) => { // .catch catches errors in query or conversion into json 
        attempts-- //every time there is an error, it will minus 1 attempt
        console.log('ERROR.', err)
    })

    //finally runs whether fetch() worked or failed. Calls the iss function after a delay to update position
    .finally(() => {
        setTimeout(iss, update) //Recursive setTimeout, better than setInterval
    })
}













