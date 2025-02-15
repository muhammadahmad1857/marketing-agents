"use server";

export const getPathways = async () => {
  console.log("getpathways");
  try {
    const pathways = await fetch(
      "https://bland.abubakarkhalid.com/pathways/list"
    );
    if (pathways.status === 200) {
      const data = await pathways.json();
      const jsonData = JSON.parse(data)
      return jsonData;
    }
    return [];
  } catch (error) {
    console.error("Error fetching pathways:", error);
    return [];
  }
};
