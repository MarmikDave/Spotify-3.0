import React from "react";
import "./Album.css";
import { useLocation } from "react-router-dom";
import Opensea from "../images/opensea.png";
import { ClockCircleOutlined } from "@ant-design/icons";

const Album = ({setNftAlbum}) => {

  const { state: album } = useLocation();

  const albumDetails = [
    {
      src: "https://ipfs.moralis.io:2053/ipfs/Qmf8xEYZdMtQXYv56VxxmzbtUtEVjmaFaXGCgcBqGXDAA6/music/JTwinkle.mp3",
      cover:
        "https://upload.wikimedia.org/wikipedia/en/6/69/B.o.B_-_Strange_Clouds_-_LP_Cover.jpg",
      album: "Strange Clouds",
      song: "Airplanes",
      duration: "0:05",
    },
    {
      src: "https://ipfs.moralis.io:2053/ipfs/QmUUhsAiUFq1B5JtzQH733CLBbUCnRekYXETMfeYG7PaZ3/music/JTiger.mp3",
      cover:
        "https://upload.wikimedia.org/wikipedia/en/d/d5/Ariana_Grande_My_Everything_2014_album_artwork.png",
      album: "My Everything",
      song: "Side To Side",
      duration: "0:16",
    },
    {
      src: "https://ipfs.moralis.io:2053/ipfs/QmUUhsAiUFq1B5JtzQH733CLBbUCnRekYXETMfeYG7PaZ3/music/JTiger.mp3",
      cover:
        "https://upload.wikimedia.org/wikipedia/en/d/d5/Ariana_Grande_My_Everything_2014_album_artwork.png",
      album: "My Everything",
      song: "Pizza and A Coke",
      duration: "5:01",
    },
    {
      src: "https://ipfs.moralis.io:2053/ipfs/QmUUhsAiUFq1B5JtzQH733CLBbUCnRekYXETMfeYG7PaZ3/music/JTiger.mp3",
      cover:
        "https://upload.wikimedia.org/wikipedia/en/d/d5/Ariana_Grande_My_Everything_2014_album_artwork.png",
      album: "My Everything",
      song: "Iceberg Lettuce",
      duration: "0:24",
    },
    {
      src: "https://ipfs.moralis.io:2053/ipfs/QmUUhsAiUFq1B5JtzQH733CLBbUCnRekYXETMfeYG7PaZ3/music/JTiger.mp3",
      cover:
        "https://upload.wikimedia.org/wikipedia/en/d/d5/Ariana_Grande_My_Everything_2014_album_artwork.png",
      album: "My Everything",
      song: "Spitting Chicklets",
      duration: "1:03",
    },
    {
      src: "https://ipfs.moralis.io:2053/ipfs/QmUUhsAiUFq1B5JtzQH733CLBbUCnRekYXETMfeYG7PaZ3/music/JTiger.mp3",
      cover:
        "https://upload.wikimedia.org/wikipedia/en/d/d5/Ariana_Grande_My_Everything_2014_album_artwork.png",
      album: "My Everything",
      song: "Boomerang",
      duration: "2:16",
    },
  ];
  
  return (
    <>
      <div className="albumContent">
        <div className="topBan">
          <img src={album.image} alt="albumcover" className="albumCover"></img>
          <div className="albumDeets">
            <div>ALBUM</div>
            <div className="title">{album.title}</div>
            <div className="artist">
                {albumDetails && JSON.parse(albumDetails[0].metadata).artist}
            </div> 
          </div>
        </div>
        <div className="topBan">
          <div className="playButton" onClick={() => setNftAlbum(albumDetails)}>
            PLAY
          </div>
          <div
            className="openButton"
            onClick={() =>
              window.open(
                `https://testnets.opensea.io/assets/mumbai/${album.contract}/1`
              )
            }
          >
            OpenSea
            <img src={Opensea} className="openLogo" />
          </div>
        </div>
        <div className="tableHeader">
          <div className="numberHeader">#</div>
          <div className="titleHeader">TITLE</div>
          <div className="numberHeader">
            <ClockCircleOutlined />
          </div>
        </div>
        {album &&
          album.map((nft, i) => {
            nft = JSON.parse(nft.metadata);
            return (
              <>
                <div className="tableContent">
                  <div className="numberHeader">{i + 1}</div>
                  <div
                    className="titleHeader"
                    style={{ color: "rgb(205, 203, 203)" }}
                  >
                    {nft.name}
                  </div>
                  <div className="numberHeader">{nft.duration}</div>
                </div>
              </>
            );
          })} 
      </div>
    </>
  );
};

export default Album;
