module.exports = {
    name: "rollDice",
    description: "Roll a dice and get a value from 1 to 6",
    execute(client, target, ctxt, msg) {
        const num = rollDice();
        client.say(target, `you rolled a ${num}`)
    }
}

function rollDice () {
    const sides = 6;
    return Math.ceil(Math.random() * sides);
}