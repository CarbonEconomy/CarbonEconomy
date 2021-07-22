import { generateRandomTransactions } from "../utils/MockDataUtils/MockData";
import singaporeLocations from "./SingaporeLocations.json";

export async function fetchTransactions() {
  const data = singaporeLocations.map((d) => {
    const result = { lng: +d.lng, lat: +d.lat };
    if (d.address) {
      result.address = d.address;
    }
    return result;
  });
  return await generateRandomTransactions(data, 1000);
}
