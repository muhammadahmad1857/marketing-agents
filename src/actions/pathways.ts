"use server";

import axios from "axios";

export const getPathways = async () => {
  try {
    const pathways = await axios.get(
      "https://bland.abubakarkhalid.com/pathways/list"
    );
    if (pathways.status === 200) {
      console.log(pathways);
      return JSON.parse(pathways.data);
    }
    return [];
  } catch (error) {
    console.error("Error fetching pathways:", error);
    return [];
  }
};
