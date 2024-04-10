let sheetID = "1aSqZT8Yz7ynGBEtCsAhvVPAHddSYMpgiDArAp7ignts";
let tabName = 'Sheet1'

let opensheet_uri = `https://opensheet.elk.sh/${sheetID}/${tabName}`


let placeholder = document.getElementById("input")

let namePlaceholder = document.getElementById("names")
let techPlaceholder = document.getElementById("tech-name")
let prosPlaceholder = document.getElementById("pros")
let consPlaceholder = document.getElementById("cons")
let imagePlaceholder = document.getElementById("image")

let studentName = document.getElementById('student-name')
let divsToLeave = document.getElementsByClassName('disapear')


fetch(opensheet_uri)
.then(function (response) {
    return response.json();
})
.then(function (data) {
    console.log(data)

    for(datapoint of data){
        let placeholderbox = document.createElement('div')
        placeholderbox.classList.add('paceholder-box')
        placeholder.append(placeholderbox)

        let nameOfStudent = document.createElement('div')
        nameOfStudent.innerHTML = datapoint.name
        placeholderbox.appendChild(nameOfStudent)
        nameOfStudent.classList.add('names')

        let nameOfTech = document.createElement('div')
        nameOfTech.innerHTML = datapoint.tech_name
        placeholderbox.appendChild(nameOfTech)
        nameOfTech.classList.add('names')

        let finalOutputBox = document.createElement('div')
        placeholderbox.append(finalOutputBox)
        
        let finalOutput = document.createElement('img')
        finalOutput.src = `imgs/${datapoint.name}.png`
        finalOutputBox.append(finalOutput)
        finalOutput.style.width = '265px'
        finalOutput.style.padding = '20px'
        finalOutput.style.paddingLeft = '0px'
        finalOutput.style.paddingBottom = '0px'

        let prosOfTech = document.createElement('div')
        prosOfTech.innerHTML = `PROS: ${datapoint.pros} <br> <br> CONS: ${datapoint.cons}`
        placeholderbox.append(prosOfTech)
        prosOfTech.classList.add('text')
        prosOfTech.classList.add('pros-of-tech')
        
        
        function checkMediaQuery(query) {
            if (window.matchMedia(query).matches) {
                studentName.innerHTML = 'Student Work'
                console.log('Viewport matches media query');
                nameOfStudent.innerHTML = datapoint.name + ': ' + datapoint.tech_name
                nameOfTech.style.display = 'none'

                prosOfTech.style.borderBottom = '2px solid black'
                prosOfTech.style.width = '85vw'
                prosOfTech.style.paddingBottom = '30px'

                for (let divItem of divsToLeave) {
                    divItem.style.display = 'none';
                }
            } else {
                studentName.innerHTML = 'STUDENT NAME'
                nameOfStudent.innerHTML = datapoint.name
                nameOfTech.style.display = 'block'
                for (let divItem of divsToLeave) {
                    divItem.style.display = 'block';
                }
            }
        }
        
        // Usage: Call the function with the media query string
        checkMediaQuery('(max-width: 430px)');
    }       
})
.catch(function (err) {
    console.log("Something went wrong!", err);
});
