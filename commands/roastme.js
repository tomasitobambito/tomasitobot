const fs = require('fs');
const path = require('path');

let filePath = "";
const fileName = "roastme.txt";
const defaultRoast = "yee yee ass haircut."

module.exports = {
    name: "roastme",
    description: "Sends a random roast",
    execute(client, target, tags, msg) {
        let roasts = initialise();

        if (msg.split(" ").length === 1) {
            const roast = roasts[Math.floor(Math.random() * roasts.length)];
            client.say(target, `@${tags.username} ${roast}`);
        } else if (msg.split(" ")[1] === "add") {
            let isMod = tags.mod || tags['user-type'] === "mod";
            let isBroadCaster = target.slice(1) === tags.username;

            if (!(isMod || isBroadCaster)) return;

            let roast = msg.split(" ");
            roast.splice(0,2);
            roast = roast.join(" ");

            roasts.push(roast);

            fs.writeFileSync(filePath, roasts.join("\n"));
        } else {
            console.log("Wrong argument for roast command")
        }
    }
};

function initialise () {
    filePath = path.resolve('resources')
    if (!fs.existsSync(filePath)) fs.mkdirSync(filePath);
    filePath = path.join(filePath, fileName);
    if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, defaultRoast);

    return fs.readFileSync(filePath).toString().split('\n');
}