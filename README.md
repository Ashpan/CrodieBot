# New-Bot

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)

## Installation

Download to your project directory:

`git clone git@github.com:Ashpan/new_bot.git`

or if you use HTTPS

`git clone https://github.com/Ashpan/new_bot.git`

Make sure you have nodejs and npm installed

Then run `npm install`

---

Now to create and invite a bot to a server go through the following steps.

1. Go to the [Discord developer portal](https://discord.com/developers/applications)
2. Select new application and call it whatever you want to
3. Go to the `bot` tab and hit reset token to get your bot token. You will need this later, so make sure to note this down.
4. Next go to the `OAuth2` tab and you should see a `Client ID`, note this down as well as you will need it too.
5. Now to invite the bot to a server go to `URL Generator` and select `application.commands` and `bot`, then in the second set of checkboxes, select the permissions you want to give to the bot.
6. Finally copy the generated URL and open it to invite the bot to your desired server.

---

Now in the project root create a file called config.json with the following contents

```json
{
  "TOKEN": "TOKEN",
  "CLIENT_ID": "CLIENT_ID",
  "GUILD_IDS": ["SERVER_IDS"]
}
```

Make sure to replace `TOKEN` with your bot token, `CLIENT_ID` with the bot application client id, and the `SERVER_IDS` with the ID of the servers the bot will be used in.

If you want to include multiple it should look like `["SERVER_1_ID", "SERVER_2_ID", "SERVER_3_ID"] `.

## Usage

To run the bot now you need to first sync any and all commands.

You can do this by: `npm run sync`

Then the bot is ready to be run with: `npm run dev`

While the bot is running it should auto-refresh when you make changes to `*.js` files but you can also refresh it by typing `rs` in the terminal and hitting enter.
