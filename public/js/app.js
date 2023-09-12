const weatherForm = document.querySelector('form')
const searchElem = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

//messageOne.textContent = 'From Javascript'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const location = searchElem.value
    messageOne.textContent = ''

    fetch('/weather?search=' + location).then((response) => {
        response.json().then((data) => { 
            if (data.error){
                messageOne.textContent = data.error
            } else{
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecastData
            }
        })
    })
})
