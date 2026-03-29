console.log("script.js loaded");

// Your API key
const API_KEY = "Ovqqed1ADXzoek48IAsbCFi6MKgAsmZe";

// Base URL for Giphy Stickers Search API
const BASE_URL = "https://api.giphy.com/v1/stickers/search";

// Array to store the GIF URLs
let images = [];

// Select the container and button from the page
const gifContainer = document.querySelector("#gif-container");
const fetchButton = document.querySelector("#fetch-gif-btn");

// Fetch GIFs from Giphy
async function fetchGifs() {
  try {
    const searchTerm = "Mario"; // Hardcoded for now

    // Build the full API request URL
    const url = `${BASE_URL}?api_key=${API_KEY}&q=${searchTerm}&limit=24&rating=g`;

    // Send the request
    const response = await fetch(url);
    const data = await response.json();

    // Extract the original GIF URLs
    images = data.data.map(gif => gif.images.original.url);

    console.log("Fetched GIF URLs:", images);
  } catch (error) {
    console.error("Error fetching GIFs:", error);
  }
}

// Display GIFs on the page
async function handleFetchClick() {
  await fetchGifs(); // Make sure images[] is filled first

  gifContainer.innerHTML = ""; // Clear old GIFs

  // Add each GIF to the page
  for (let url of images) {
    gifContainer.innerHTML += `
      <img src="${url}" class="col-3 mb-3">
    `;
  }
}

// Run when the button is clicked
fetchButton.addEventListener("click", handleFetchClick);
