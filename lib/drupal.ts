import axios from "axios";
import { DrupalClient } from "next-drupal";

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
);

// Reusable Axios instance
const axiosInstance = axios.create({
  headers: {
    "Access-Control-Allow-Origin": "http://localhost:3000",
    "Access-Control-Allow-Headers": "Content-Type",
  },
});

// Function to authenticate and get data as per url.
async function fetchAuthenticatedData(url, base64Credentials) {
  try {
    // const base64Credentials = Buffer.from(`${username}:${password}`).toString(
    //   "base64"
    // );
    const response = await axiosInstance.get(url, {
      headers: {
        Authorization: `Basic ${base64Credentials}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

// Block data function
export async function getBlockData(blockId:string, language:string, base64Credentials:string) {
  const url = `https://contribution-tracker.ddev.site/${language}/jsonapi/block_content/basic/${blockId}`;
  return await fetchAuthenticatedData(url, base64Credentials);
}

// Node data function
export async function getNodeData(nodeId:string, base64Credentials:string) {
  const url = `https://contribution-tracker.ddev.site/jsonapi/node/contribution/${nodeId}`;
  return await fetchAuthenticatedData(url, base64Credentials);
}

export async function getContributionNodeData(nodeId:string, language:string, base64Credentials:string) {
  const url = `https://contribution-tracker.ddev.site/${language}/jsonapi/node/contribution/${nodeId}`;
  return await fetchAuthenticatedData(url, base64Credentials);
}

export async function getWishlistData(base64Credentials:string){
    const url = `https://contribution-tracker.ddev.site/jsonapi/node/wishlist`;
    return await fetchAuthenticatedData(url, base64Credentials);
 }

export async function getContributionListData(base64Credentials:string){
    const url = `https://contribution-tracker.ddev.site/jsonapi/node/contribution`;
    try {
      const response = await axios.get(url);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching wishlist data:', error);
      throw error;
    }
 }
 