import { WebClient } from "@slack/web-api"
import axios from "axios"
const images = {
  "morning": [
    "https://javi-pfp-rotator.vercel.app/images/morning/exploration-cabin.png",
    "https://javi-pfp-rotator.vercel.app/images/morning/space-study.png",
    "https://javi-pfp-rotator.vercel.app/images/morning/submerged-library.png",
    "https://javi-pfp-rotator.vercel.app/images/morning/sunrise-astronaut.png"
  ],
  "noon": [
    "https://github.com/j-cordz.png"
  ],
  "afternoon": [
    "https://javi-pfp-rotator.vercel.app/images/afternoon/sunset-astronaut.png",
    "https://javi-pfp-rotator.vercel.app/images/afternoon/grassland-coder.png",
    "https://javi-pfp-rotator.vercel.app/images/afternoon/cosmic-city.png",
    "https://javi-pfp-rotator.vercel.app/images/afternoon/dino-arrival.png"
  ],
  "night": [
    "https://javi-pfp-rotator.vercel.app/images/night/robot-astronomer.png",
    "https://javi-pfp-rotator.vercel.app/images/night/stargazing-duo.png",
    "https://javi-pfp-rotator.vercel.app/images/night/starry-cyclist.png",
    "https://javi-pfp-rotator.vercel.app/images/night/frozen-settlement.png"
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