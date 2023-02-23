/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { useIPFS } from "./useIPFS";

const useAudio = (nftAlbum) => {
  const { resolveLink } = useIPFS();
  const [audio, setAudio] = useState(nftAlbum); //referance to the audio array
  const [trackIndex, setTrackIndex] = useState(0); //keep track of which track within the album we are playing
  const [newSong, setNewSong] = useState(0); // to track if we are on still on the same track
  const [trackProgress, setTrackProgress] = useState(0); // to trcak the duration pass within that track
  const [isPlaying, setIsPlaying] = useState(false); // boolean just to identify if the audio player is on or not
  const [volume, setVolume] = useState(1); //giving us the volume of the music being played
  const audioRef = useRef(
    new Audio(resolveLink(JSON.parse(audio[trackIndex].metadata).animation_url))
  ); //referance of the actual song that is currently playing

  const intervalRef = useRef(); //keep track of the current song and incrementing the duration that has passed through
  const isReady = useState(false); //help us to move to the next song as we are ready to move in the audio palyer

  const { duration } = audioRef.current; //duration and display that how long the song actually takes

  const toPrevTrack = () => {
    if (trackIndex - 1 < 0) {
      setTrackIndex(audio.length - 1);
    } else {
      setTrackIndex(trackIndex - 1);
    }
  };

  const toNextTrack = () => {
    if (trackIndex < audio.length - 1) {
      setTrackIndex(trackIndex + 1);
    } else {
      setTrackIndex(0);
    }
  };

  const toggle = () => setIsPlaying(!isPlaying); //will set the isPlaying to opposite boolean

  useEffect(() => {
    toggle();
    setAudio(nftAlbum);
    if (trackIndex === 0) {
      setNewSong(newSong + 1);
    } else {
      setTrackIndex(0);
    }
  }, [nftAlbum]);
  //this useeffect will be triggered when we have a new album in palce or a first album passed to this hook we toggle so we start playing or stop playing and
  //then we setaudio to new array of objects which are looping through to play different songs

  const startTimer = () => {
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        toNextTrack();
      } else {
        setTrackProgress(Math.round(audioRef.current.currentTime));
      }
    }, [1000]);
  };
  //created a setInterval that updates every second and is the current audio is ended (also saved in the audio element) will go to the next track we set the track
  //progress and use the math function to round to the nearest whole number and addes up to the current time and we can have the bar moving forward as the song moves forward

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      startTimer();
    } else {
      clearInterval(intervalRef.current);
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    audioRef.current.pause();
    audioRef.current = new Audio(
      resolveLink(JSON.parse(audio[trackIndex].metadata).animation_url)
    );
    audioRef.current.volume = volume;
    setTrackProgress(Math.round(audioRef.current.currentTime));
    if (isReady.current) {
      audioRef.current.play();
      setIsPlaying(true);
      startTimer();
    } else {
      isReady.current = true;
    }
  }, [trackIndex, newSong]);
  // this reintializes everything as long as trackindex or the newsong variable changes we do this by pausing the current audio ref and set the new song as the trackindex will change

  const onSearch = (value) => {
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
    setTrackProgress(audioRef.current.currentTime);
  };

  const onSearchEnd = () => {
    if (!isPlaying) {
      setIsPlaying(true);
    }
    startTimer();
  };

  const onVolume = (vol) => {
    setVolume(vol);
    audioRef.current.volume = vol;
  };
  //onsearch when we start searching we clear the previous interval we had and we change the time of the audioreferance to the time we change in the track progress
  //and start it automatically from the point we start the user has selected. Basically it is applied to the volume as well and functional according to how the user has pointed the volume.

  return [
    isPlaying,
    duration,
    toggle,
    toNextTrack,
    toPrevTrack,
    trackProgress,
    onSearch,
    onSearchEnd,
    onVolume,
    trackIndex,
  ];
};
export default useAudio;
