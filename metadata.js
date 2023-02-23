let fs = require("fs");
let axios = require("axios");

let songs = ["Beyonce---CUFF-IT.mp3","drum beat.mp3"];
let durations = ["3:45","2:12"];
let ipfsArray = [];

for (let i = 0; i < songs.length; i++) {
  ipfsArray.push({
    path: `metadata/${i}.json`,
    content: {
      image: `ipfs://QmeQ6N34yj1KyaqXf5dakf8tMn68mxXnib9z7qG3tSwf6e/media/0`, //hash value 
      name: songs[i],
      animation_url: `ipfs://QmeQ6N34yj1KyaqXf5dakf8tMn68mxXnib9z7qG3tSwf6e/media/${i}`, //hash and also the eife element for the ipfs so we get the correct song as in the meta data as each nft
      duration: durations[i],
      artist: "Beyonce",
      year: "2022"
    },
  });
}

axios.post("https://deep-index.moralis.io/api/v2/ipfs/uploadFolder", ipfsArray, {
    headers: {
      "X-API-KEY":
        "O8ZTXLxBw5Gwaje0Uj07crRFGdm3haexVP1YFKCUToAum2BVByh7AAzhCLnWlNPN",
      "Content-Type": "application/json",
      accept: "application/json",
    },
  })
  .then((res) => {
    console.log(res.data);
  })
  .catch((error) => {
    console.log(error);
  });