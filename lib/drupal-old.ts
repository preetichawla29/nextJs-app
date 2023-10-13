import { DrupalClient } from "next-drupal"

export const drupal = new DrupalClient(
  process.env.NEXT_PUBLIC_DRUPAL_BASE_URL,
  {
    previewSecret: process.env.DRUPAL_PREVIEW_SECRET,
    auth: () =>
      "Basic " +
      Buffer.from(
        `${process.env.BASIC_AUTH_USERNAME}:${process.env.BASIC_AUTH_PASSWORD}`
      ).toString("base64"),
  }
)

//Block Data function
import axios from 'axios';

export const getBlockData = async (blockId,  language, username, password) => {
  const baseURL = `https://contribution-tracker.ddev.site/${language}/jsonapi//block_content/basic/${blockId}`;
    try {
      const axiosInstance = axios.create({
        baseURL,
        auth: {
          username,
          password,
        },
      });
      // Make the authenticated API request
    const base64Credentials = Buffer.from(`${username}:${password}`).toString('base64');

    // Make a GET request to the JSON API endpoint with authentication headers
    const response = await axiosInstance.get(baseURL, {
      headers: {
        Authorization: `Basic ${base64Credentials}`,
        crossdomain: true,
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Headers': 'Content-Type'
        
      },
    });
  
      return response.data.data; // Assuming you're interested in the "data" part of the response
    } catch (error) {
      console.error('Error fetching Block data:', error);
      throw error;
    }
  }


// Function to make an authenticated API request
async function fetchAuthenticatedData(username, password) {
  const baseURL = 'https://contribution-tracker.ddev.site/jsonapi/node/contribution/25cc193f-1b61-422e-9eaa-7edf5d53fc17';

  try {
    // Create an axios instance with the base URL
    const axiosInstance = axios.create({
      baseURL,
      auth: {
        username,
        password,
      },
    });

    // Make the authenticated API request
    const base64Credentials = Buffer.from(`${username}:${password}`).toString('base64');

    // Make a GET request to the JSON API endpoint with authentication headers
    const response = await axiosInstance.get(baseURL, {
      headers: {
        Authorization: `Basic ${base64Credentials}`,
        crossdomain: true,
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Headers': 'Content-Type'
        
      },
    });
    // Return the response data
    return response.data.data;
    
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export { fetchAuthenticatedData };