const promptFormatter = (days, equipment, goal) => {
    const prompt = `Create a ${days} day ${equipment === 'none' ? ' ' : equipment} 
    workout plan. The goal of this workout plan is to maximize ${goal}.
    Return the plan in the form of an JSON object array where 
    each day is an object with a label parameter and a exercises array
    parameter. Each object in the exercises array should have a name. 
    If the exercise is geared towards running it should have an amount
    parameter indicating the length of time it should be done for. If the
    exercise is geared towards weight training it should have an amount 
    parameter indicating the amount of sets and reps the exercise should
    be done for in the format of "AxB" where A is the sets and B is the
    reps. Each parameter should be in the form of a string.`
    return prompt
}

module.exports = {
    promptFormatter
}