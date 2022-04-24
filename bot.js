require('dotenv').config();
const fs = require('fs');
const tmi = require('tmi.js');

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const commands = new Map();

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.set(command.name, command);
}

const opts = {
    identity: {
        username: process.env.NAME,
        password: process.env.OAUTH
    },
    channels: [
        process.env.CHANNEL
    ]
}

const client = new tmi.client(opts);

client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

client.connect();

function onMessageHandler (target, tags, msg, self) {
    if (self || msg[0] !== "!") { return; }

    const commandName = msg.trim();

    if (!commands.has(commandName.substring(1))) {
        console.log("command not found");
        return;
    }

    try {
        commands.get(commandName.substring(1)).execute(client, target, tags, msg);
        console.log("Executed Command Succesfully");
    } catch(Error) {
        console.error(Error);
    }
}

function onConnectedHandler (addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
}
