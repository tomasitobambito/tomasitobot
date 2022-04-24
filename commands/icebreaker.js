const fs = require('fs');
const path = require('path');

const fileName = "icebreakers.txt";
const defaultIceBreaker = "tell me about a game you've played that you enjoyed."

module.exports = {
    name: "icebreaker",
    description: "Sends a random icebreaker question to get a conversation started.",
    execute(client, target, tags, msg) {
        const icebreakers = initialise();
        const icebreaker = icebreakers[Math.floor(Math.random() * icebreakers.length)];
        client.say(target, `@${tags.username}, ${icebreaker}`)
    }
};

function initialise () {
    let filePath = path.resolve('resources')
    if (!fs.existsSync(filePath)) fs.mkdirSync(filePath);
    filePath = path.join(filePath, fileName);
    if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, defaultIceBreaker);

    return fs.readFileSync(filePath).toString().split('\n');
}