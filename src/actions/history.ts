"use server";

export const getHistory = async (email: string) => {
  console.log("get api started history");
  console.time("get api started history");
  try {
    const response = await fetch(
      `https://bland.abubakarkhalid.com/history/get_all_user_calls?email=${email}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("get api ended in success history");
    console.time("get api ended in success history");

    return data;
  } catch (error) {
    console.log("get api ended in error history");
    console.time("get api endedin error history");

    console.error("Error fetching history:", error);
    throw error;
  }
};

export const getSingleCall = async (email: string, call_id: string) => {
  try {
    const response = await fetch(
      `https://bland.abubakarkhalid.com/history/get_call?call_id=${call_id}&email=${email}`
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

export const deleteHistory = async (call_id: string, email: string) => {
 
  try {
    const resp = await fetch(
      `https://bland.abubakarkhalid.com/history/delete_call?call_id=${call_id}&email=${email}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!resp.ok) {
      throw new Error(`There is an issue while deleting call details`);
    }
    const data = await resp.json();
    return data;
  } catch (error) {
    console.error("Error deleting history:", error);
    throw new Error(`There is an issue while deleting call details`);
  }
};
