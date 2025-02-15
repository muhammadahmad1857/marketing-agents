"use server";


export const getPathways = async () => {
  try {
    const pathways = await fetch(
      "https://bland.abubakarkhalid.com/pathways/list"
    );
    if (pathways.status === 200) {
      const data = await pathways.json();
      return data;
    }
    return [];
  } catch (error) {
    console.error("Error fetching pathways:", error);
    return [];
  }
};
