// pages declare
const page1 = document.querySelector("#page-1");
const page2 = document.querySelector("#page-2");
const page3 = document.querySelector("#page-3");
const page4 = document.querySelector("#page-4");

// Page-1 Elements
const pg1Btn = document.querySelector("#pg1-button");

// Page-3 Elements
const headerEl = document.querySelector("#header")
const displayBlock = document.querySelector("#main-contents")
const signEl = document.querySelector(".selected-sign");
const signImg = document.querySelector(".right-section img")
const weeklyHoro = document.querySelector(".weekly-horo");
const nextPageBtn = document.querySelector("#page4-btn");
const nextPageImg = document.querySelector("#page4-img");

// page-4 Elements
const displayApi = document.querySelector(".Api-Return");
const pg4Btn = document.querySelector("#myButton");


// Displaying First Page
function hidePages() {
    page1.style.display = "block";
    page2.style.display = "none";
    page3.style.display = "none";
    page4.style.display = "none";
}

// Page 2 actions
function inputAPI(answer) {
	const url = `https://horoscope-astrology.p.rapidapi.com/horoscope?day=week&sunsign=${answer}`;
	// My API Key
	const apiKey = '4a562791d8msh9b0c56728383034p1b1e0djsn0aa015a10bfb';
	fetch(url, {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': apiKey,
			'X-RapidAPI-Host': 'horoscope-astrology.p.rapidapi.com'
		}
	})
		.then(response => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json(); // Parse the response JSON
		})
		.then(data => {
			console.log(data);
			displayingResult(data); // Log the data to the console
		})
		.catch(error => {
			console.log("Error:", error); // Log any errors
		});
}

// This function is for capitalization
function capitalize(sign) {
	return sign.charAt(0).toUpperCase() + sign.slice(1).toLowerCase();
}

// This function display API results
function displayingResult(data) {
	headerEl.innerHTML = "";
	displayBlock.innerHTML = "";
	// capitalizing the first letter of the selected sign
	let capSunSign = capitalize(data.sunsign);
	// setting capped sign to signEL
	signEl.textContent = capSunSign;
	// getting images
	signImg.src = `./Assets/images/${capSunSign}.png`;

	// I am appending selected sign
	headerEl.append(signEl);
	displayBlock.appendChild(signImg);

	weeklyHoro.textContent = data.horoscope;
	displayBlock.appendChild(weeklyHoro);
}


// Page 4 actions AKA Fortune cookie API
function page4Actions() {
    const url5 = 'https://fortune-cookie4.p.rapidapi.com/';
    const apiKey2 = '4a562791d8msh9b0c56728383034p1b1e0djsn0aa015a10bfb';
    const option1 = {
        method: 'Get',
        headers: {
            'X-RapidAPI-Key': '4a562791d8msh9b0c56728383034p1b1e0djsn0aa015a10bfb',
            'X-RapidAPI-Host': 'fortune-cookie4.p.rapidapi.com'
        }
    }
    fetch(url5, option1)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data);
            displayApi.textContent = data.data.message;
        })
        .catch(function (error) {
            console.error("There was an error:", error);
        });

}

// Page1 button Action
pg1Btn.addEventListener("click",function(){
    page1.style.display = "none"
    page2.style.display = "block"
})

// Page2 button Action
userInput.addEventListener("submit", function (e) {
	e.preventDefault();
	// getting the value from user input
	const answer = new FormData(userInput).get("answers")
	localStorage.setItem('sunsign', answer);
	page2.style.display = "none";
	page3.style.display = "block";
	inputAPI(answer);
})

// Page3 Button Action
nextPageBtn.addEventListener("click", function(){
	page3.style.display = "none";
	page4.style.display = "block";
})
nextPageImg.addEventListener("click", function(){
	page3.style.display = "none";
	page4.style.display = "block";
})


// Page4 button Action
pg4Btn.addEventListener("click", function() {
    page1.style.display = "block"
    page4.style.display = "none"
});





hidePages();
page4Actions();