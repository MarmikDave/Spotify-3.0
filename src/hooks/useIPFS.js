export const useIPFS = () => {
  const resolveLink = (url) => {
    if (!url || !url.includes("ipfs://")) return url;
    return url.replace("ipfs://", "https://gateway.ipfs.io/ipfs/");
  };

  return { resolveLink };
};
// basically as long as we have the ipfs standard formate of saving urls we just provide a public gateway url insted of it in 
// order to ensure that are audio can be fetched from our decentralized data base into our app 