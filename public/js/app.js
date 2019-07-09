console.log('Client side JS file')

// Selecting the element from the form/
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
// Selecting ID value , paragraph 1 from index.hbs
const messageOne = document.querySelector('#M1')
const messageTwo = document.querySelector('#M2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent='Loading...'
    messageTwo.textContent=''

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {

        response.json().then((data) => {
            if (data.error) {
                //console.log(data.error)
                messageOne.textContent=data.error
            } else {

                messageOne.textContent=data.Location
                messageTwo.textContent=data.Forecast

            }
        })
    })
})