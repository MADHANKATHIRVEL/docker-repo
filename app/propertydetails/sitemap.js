import { APP_BASE_URL } from "@/constants/Constant";
import axios from "axios";

async function fetchProperties() {
  const response = await axios.get(`${APP_BASE_URL}/properties/property_url?limit=50000`);
  const data = await response.data;
  return data;
}

export default async function sitemap() {
  const properties = await fetchProperties();
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${properties.map((property) => `
        <url>
          <loc>${`https://albionpropertyhub.com/propertydetails/${property.url}`}</loc>
          <priority>0.8</priority>
        </url>
      `).join('')}
    </urlset>
  `;
  return properties.map((property) => ({
    url: `https://albionpropertyhub.com/propertydetails/${property.url.replace('&',"-")}`,
    priority : 0.8
  }));
}
