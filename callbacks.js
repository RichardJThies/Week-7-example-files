let animals = ['Giraffe', 'Elephant', 'Yak']

// callback function syntax with writing function definition as the argument
animals.forEach(function(animal, index) { // the 2nd arguement, index, is optional
    console.log(animal, index)
})

// callback function syntax with arrow notation. Slightly more concise
animals.forEach((animal, index) => { // arrow notation doesn't need 'function'
    console.log(animal, index)
})

// even more minimal arrow notation. Only works if it has 1 line of code
animals.forEach((animal, index) => console.log(animal, index) // no {} needed if only 1 line
)

// another minimal arrow notation version. Also only works if 1 line of code
animals.forEach(animal => console.log(animal))













