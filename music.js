let fs = require("fs");
let axios = require("axios");

let media = ["Beyoncé_-_Renaissance.png","Beyonce---CUFF-IT.mp3","drum beat.mp3","SOUR_ALBUM.JPG","Tylor Swift.jpg"];
let ipfsArray = [];
let promises = [];

for (let i = 0; i < media.length; i++) {
  promises.push(
    new Promise((res, rej) => {
      fs.readFile(`${__dirname}/export/${media[i]}`, (err, data) => {
        if (err) rej();
        ipfsArray.push({
          path: `media/${i}`,
          content: data.toString("base64"),
        });
        res();
      });
    })
  );
}
Promise.all(promises).then(() => {
  axios
    .post("https://deep-index.moralis.io/api/v2/ipfs/uploadFolder", ipfsArray, {
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
});