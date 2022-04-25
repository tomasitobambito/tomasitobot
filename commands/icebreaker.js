const fs = require('fs');
const path = require('path');

let filePath = "";
const fileName = "icebreakers.txt";
const defaultIceBreaker = "tell me about a game you've played that you enjoyed."

module.exports = {
    name: "icebreaker",
    description: "Sends a random icebreaker question to get a conversation started.",
    execute(client, target, tags, msg) {
        let icebreakers = initialise();

        if (msg.split(" ").length === 1) {
            const icebreaker = icebreakers[Math.floor(Math.random() * icebreakers.length)];
            client.say(target, `@${tags.username} ${icebreaker}`);
        } else if (msg.split(" ")[1] === "add") {
            let isMod = tags.mod || tags['user-type'] === "mod";
            let isBroadCaster = target.slice(1) === tags.username;

            if (!(isMod || isBroadCaster)) return;

            let icebreaker = msg.split(" ");
            icebreaker.splice(0,2);
            icebreaker = icebreaker.join(" ");

            icebreakers.push(icebreaker);

            fs.writeFileSync(filePath, icebreakers.join("\n"));
        } else {
            console.log("Wrong argument for icebreaker command")
        }
    }
};

function initialise () {
    filePath = path.resolve('resources')
    if (!fs.existsSync(filePath)) fs.mkdirSync(filePath);
    filePath = path.join(filePath, fileName);
    if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, defaultIceBreaker);

    return fs.readFileSync(filePath).toString().split('\n');
}