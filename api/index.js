import { WebClient } from "@slack/web-api"
import axios from "axios"
const images = {
  "morning": [
    "./exploration-cabin.png",
    "./space-study.png",
    "./submerged-library.png",
    "./sunrise-astronaut.png"
  ],
  "noon": [
    "https://github.com/jzaleta.png"
  ],
  "afternoon": [
    "./sunset-astronaut.png",
    "./grassland-coder.png",
    "./cosmic-city.png",
    "./dino-arrival.png"
  ],
  "night": [
    "./robot-astronomer.png",
    "./stargazing-duo.png",
    "./starry-cyclist.png",
    "./frozen-settlement.png"
  ]
};
async function setPFP() {
  var hour = new Date().getHours();
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
  await setPFP();
  const phrases = [
    "Started changing your PFP!",
    "Revamped your visual identity with a sleek new profile picture!",
    "Your online presence just got an upgrade!"
  ];
  const randomIndex = Math.floor(Math.random() * phrases.length);
  const selectedPhrase = phrases[randomIndex];
  res.send(selectedPhrase);
}
