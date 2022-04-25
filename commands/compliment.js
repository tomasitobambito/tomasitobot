const fs = require('fs');
const path = require('path');

let filePath = "";
const fileName = "compliments.txt";
const defaultCompliment = "your hair looks good today peepoShy"

module.exports = {
    name: "compliment",
    description: "Sends a random compliment question to get a conversation started.",
    execute(client, target, tags, msg) {
        let compliments = initialise();

        if (msg.split(" ").length === 1) {
            const compliment = compliments[Math.floor(Math.random() * compliments.length)];
            client.say(target, `@${tags.username} ${compliment}`);
        } else if (msg.split(" ")[1] === "add") {
            let isMod = tags.mod || tags['user-type'] === "mod";
            let isBroadCaster = target.slice(1) === tags.username;

            if (!(isMod || isBroadCaster)) return;

            let compliment = msg.split(" ");
            compliment.splice(0,2);
            compliment = compliment.join(" ");

            compliments.push(compliment);

            fs.writeFileSync(filePath, compliments.join("\n"));
        } else {
            console.log("Wrong argument for compliment command")
        }
    }
};

function initialise () {
    filePath = path.resolve('resources')
    if (!fs.existsSync(filePath)) fs.mkdirSync(filePath);
    filePath = path.join(filePath, fileName);
    if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, defaultCompliment);

    return fs.readFileSync(filePath).toString().split('\n');
}