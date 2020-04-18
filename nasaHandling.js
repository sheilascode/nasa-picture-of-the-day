const pods = {}
const todaysDate = new Date()
let currentDate = new Date()

const getDateString = date => {
    let [year, month, day] = [
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate()
    ]
    return `${year}-${month}-${day}`
}

const getPOD = (date) => {
    const apiUrl = 'https://api.nasa.gov/planetary/apod\?api_key\=3PcfLEnpX8cvNqgB2YnvwlMxZZl7wegFzY5N2b9f'
    fetch(`${apiUrl}\&date\=${date}`)
    .then(r => r.json())
    .then(j => {
      pods[date] = j
      assignValues(date);
    })
}

const assignValues = (date) => {
    const response = pods[date]
    console.log(response)
    document.getElementById('pictureOfTheDay').src = response.url
    document.getElementById('loader').style.display = 'none'
    document.getElementById('title').innerText = response.title
    document.getElementById('date').innerText = response.date
    document.getElementById('explanation').innerText = response.explanation
}

document.getElementById('nextButton').addEventListener('click', () => {
    currentDate.setDate(currentDate.getDate() + 1)
    if (currentDate > todaysDate) {
        // Don't go beyond today's date
        currentDate = new Date()
    } else {
        document.getElementById('loader').style.display = ''
        const date = getDateString(currentDate)
        if (pods.hasOwnProperty(date)) {
            assignValues(date)
        } else {
            getPOD(date)
        }
    }
})

document.getElementById('prevButton').addEventListener('click', () => {
    currentDate.setDate(currentDate.getDate() - 1)
    document.getElementById('loader').style.display = ''
    const date = getDateString(currentDate)
    if (pods.hasOwnProperty(date)) {
        assignValues(date)
    } else {
        getPOD(date)
    }
})

getPOD(getDateString(todaysDate))
