# Football Discord Bot (DBFL Football League)

### A basic discord bot for a flag football league to track games, player stats, scheduling, and automation

## Logistics of the Discord Bot

- Bot is only geared toward current players in the most current league (Have not made dynamic routing yet and haven't integrated a full database yet) but will in v.4.0!!
- Refactoring is a work in progress (Will start to work on it for the next upcoming season in 2026)
- You can't use this Bot for any league outside of this current football league (Although I am thinking of converting it to create one that can)

## ⚠️ Important Notes
This bot requires:
- A discord bot token (stored within your own .env file)
- A Google Cloud project with access to the associated Google Sheet
    - Again, currently works with the format of the **DBFL Football League**, but I am trying to make a universal one with an actual database
- A `credentials.json` file is needed (for Google Sheets API access)

## 🛠️ DBFL Bot functionalities 

### Individual Player Stats and Upload
Players can see their individual stats by using their own command `/{Player Name}`
- As seen in this screen shot, I did **/mikey** and came up with my stats for the current season, as well as all time career stats throughout my time in my football league
- This is for every player to showcase their own stats, as we fetch them from the google sheets using **Google Cloud's Sheets API** (Which has been very useful)
![Player Name Demo](https://cdn.discordapp.com/attachments/1221193514495381514/1403090576848457758/image.png?ex=6896496d&is=6894f7ed&hm=7bf285d8246371a95a980c95ef32531208425e48acb530e5c61751875ddf749b&)

Players can also upload stats to the bot itself between each drive, updating real time!! Only by the use of `/upload`, which uses players discord usernames to correctly find and update stats within the google sheets for simplicity

### Scheduling
Players can see when are being held and any updates on certain games using the `/Schedule` feature
- Although these features have not been used much since they've been relying more on discord messages from the commissioner, but in the nexrt update, we will automate messages based on the schedule put into the DBFL Bot coming in v.4.0!!

### Leadboards
Along with player stats (which comes with their individual rankings in each position *QB, WR, etc...*), they can see the current leaders in the **3 Main Categories:** Touchdowns, Yards, and Defensive Interceptions shown here:

![Player Leaderboard Demo](https://cdn.discordapp.com/attachments/1221193514495381514/1403093301984362677/dbfl-bot-leaders-ex.jpg?ex=68964bf7&is=6894fa77&hm=a15bd2dcc336f76b04b1a7f263bb788720b6eede743fe4d86dcc879795158898&)

This gives players more incentive to play and reach the top of the leaderboard each week (which also updates real time, since it pulls data from the sheets)

## Final Notes
- If you want access and want to use the bot on your own terms, contact me **mikeyfera1@gmail.com**
- Any questions or suggestions, feel free to let me know!! Thanks!
