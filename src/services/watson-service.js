import axios from "axios";

const REACT_APP_WATSON_KEY = process.env.REACT_APP_WATSON_KEY;

const fetchTones = async data => {
  const encodedCreds = btoa(`apikey:${REACT_APP_WATSON_KEY}`);
  console.log("encodedCreds", encodedCreds);

  let response;
  let tones = [];
  const config = {
    headers: {
      authorization: `Basic ${encodedCreds}`
    }
  };
  try {
    response = await axios.get(
      `https://cors-anywhere.herokuapp.com/https://gateway.watsonplatform.net/tone-analyzer/api/v3/tone?version=2017-09-21&text=${encodeURIComponent(
        data
      )}`,
      config
    );
    tones = response.data.document_tone.tones;
  } catch (error) {
    console.log("Error getting the tone", error);
  }
  return tones;
};

export { fetchTones };
