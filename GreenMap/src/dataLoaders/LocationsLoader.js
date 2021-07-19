import { generateRandomTransactions } from "../utils/MockDataUtils/MockData";
import singaporeLocations from "./SingaporeLocations.json";

export async function fetchTransactions() {
  const data = singaporeLocations.map((d) => {
    return { position: [+d.lng, +d.lat] };
  });
  return await generateRandomTransactions(data, 1000);
}