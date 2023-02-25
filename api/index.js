import { WebClient } from "@slack/web-api"
import axios from "axios"
const images = {
  "morning": [
    "images/morning/image1.jpg",
    "images/morning/image2.jpg",
    "images/morning/image3.jpg"
  ],
  "noon": "https://github.com/j-cordz.png",
  "afternoon": [
    "images/afternoon/image1.jpg",
    "images/afternoon/image2.jpg",
    "images/afternoon/image3.jpg"
  ],
  "night": [
    "images/night/image1.jpg",
    "images/night/image2.jpg",
    "images/night/image3.jpg"
  ]
};
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
