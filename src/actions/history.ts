"use server";

import axios from "axios";

export const getHistory = async (email:string) => {
  try {
    const response = await fetch(
      `https://bland.abubakarkhalid.com/history/get_all_user_calls?email=${email}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching history:", error);
    throw error;
  }
};

export const deleteHistory = async (call_id:string,email:string) => {
    try {
        const resp = await axios.delete(`https://bland.abubakarkhalid.com/history/delete?call_id=${call_id}&email=${email}`);
        console.log(resp);
        
    if (resp.status !== 200) {
        throw new Error(`There is an issue while deleting call details`);


      }
      return resp.data
    } catch (error) {
        console.error("Error deleting history:", error);
        throw new Error(`There is an issue while deleting call details`);
        ;
        
    }
};
