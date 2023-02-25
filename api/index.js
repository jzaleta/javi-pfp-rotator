import { WebClient } from "@slack/web-api"
import axios from "axios"
const images = {
  "morning": "https://cloud-5y6hx4kva-hack-club-bot.vercel.app/0exploration-cabin.png",
  "noon": "https://github.com/j-cordz.png",
  "afternoon": "https://cloud-5y6hx4kva-hack-club-bot.vercel.app/1forest-astronaut.png",
  "night": "https://cloud-5y6hx4kva-hack-club-bot.vercel.app/2grassland-robot.png"
} 
async function setPFP() {
  var hour = new Date().getHours() - 6;
  let image;
  if (5 < hour && hour < 12) {
    const morningImages = images.morning;
    const randomIndex = Math.floor(Math.random() * morningImages.length);
    image = await axios.get(morningImages[randomIndex], {
      responseType: "arraybuffer",
    });
  }
  else if (12 < hour && hour < 17) {
    image = await axios.get(images.noon, {
      responseType: "arraybuffer",
    });
  }
  else if (17 < hour && hour < 20) {
    const afternoonImages = images.afternoon;
    const randomIndex = Math.floor(Math.random() * afternoonImages.length);
    image = await axios.get(afternoonImages[randomIndex], {
      responseType: "arraybuffer",
    });
  }
  else {
    const nightImages = images.night;
    const randomIndex = Math.floor(Math.random() * nightImages.length);
    image = await axios.get(nightImages[randomIndex], {
      responseType: "arraybuffer",
    });
  }
  const client = new WebClient();
  const slackRequest = await client.users.setPhoto({
    image: image.data,
    token: process.env.SLACK_TOKEN
  });
}

export default async (req, res) => {	
  await setPFP()	
  res.send("Started changing your PFP!")	
}
