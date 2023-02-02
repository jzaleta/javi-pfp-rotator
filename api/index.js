import { WebClient } from "@slack/web-api";
import axios = from "axios"
const images = {
  "morning": "https://cloud-5y6hx4kva-hack-club-bot.vercel.app/0exploration-cabin.png",
  "afternoon": "https://cloud-5y6hx4kva-hack-club-bot.vercel.app/1forest-astronaut.png",
  "night": "https://cloud-5y6hx4kva-hack-club-bot.vercel.app/2grassland-robot.png"
} 
async function setPFP() {
  var hour = new Date().getHours() - 6
  let image
  if (5 < hour && hour < 12) {
    image = await axios.get(images.morning, {
      responseType: "arraybuffer",
    });
  }
  else if (12 < hour && hour < 20) {
    image = await axios.get(images.afternoon, {
      responseType: "arraybuffer",
    });
  }
  else {
    image = await axios.get(images.night, {
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
