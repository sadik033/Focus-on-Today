const checkBoxList = document.querySelectorAll('.checkbox')
const inputFields = document.querySelectorAll('.goal-input')
const errorLabel = document.querySelector('.error-label')
const progressbar = document.querySelector('.progress-bar')
const progressvalue = document.querySelector('.progress-value')
const progressLabel = document.querySelector('.progress-label')

const allQuotes = [
    'Raise the bar by completing your goals!',
    'Well begun is half done!',
    'Just a step away, keep going!',
    'Whoa! You just completed all the goals, time for chill :D'
]

const allGoals = JSON.parse(localStorage.getItem('allGoals')) || {
    first:{
        name: '',
        completed: false,
    },
    second:{
        name: '',
        completed: false,
    },
    third:{
        name: '',
        completed: false,
    },
}

let completedGoalscount = Object.values(allGoals).filter((goal) =>goal.completed).length
progressvalue.style.width = `${(completedGoalscount / inputFields.length ) * 100}%`
progressvalue.firstElementChild.innerText = `${completedGoalscount }/ ${inputFields.length} Completed`
progressLabel.innerText = allQuotes[completedGoalscount]


checkBoxList.forEach((checkbox) =>{
    checkbox.addEventListener('click',(e)=>{
        const allGoalsAdded = [...inputFields].every(function(input){
            return input.value
        })
        if(allGoalsAdded){
            checkbox.parentElement.classList.toggle('completed')
            const inputId = checkbox.nextElementSibling.id
            allGoals[inputId].completed = !allGoals[inputId].completed 
            completedGoalscount = Object.values(allGoals).filter((goal) =>goal.completed).length

            progressvalue.style.width = `${completedGoalscount / inputFields.length * 100}%`
            progressvalue.firstElementChild.innerText = `${completedGoalscount }/ ${inputFields.length} Completed`
            progressLabel.innerText = allQuotes[completedGoalscount]

            localStorage.setItem('allGoals',JSON.stringify(allGoals))
        }
        else{
            progressbar.classList.add('show-error')
        }
    })
})

inputFields.forEach((input) =>{
     input.value= allGoals[input.id].name

     if(allGoals[input.id].completed){
        input.parentElement.classList.add('completed')
     }

    input.addEventListener('focus',()=>{
        progressbar.classList.remove('show-error')
    })

    input.addEventListener('input', (e) =>{
        if(allGoals[input.id].completed){
            input.value = allGoals[input.id].name
            return
         }
        allGoals[input.id].name = input.value
        localStorage.setItem('allGoals',JSON.stringify(allGoals))
    })
})

