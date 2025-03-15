import axios from "axios";
import { API_KEY_OPEN_CAGE } from "@/constant/opencage";
import { NextApiRequest, NextApiResponse } from "next";

const getCoordinates = async (address: string) => {
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
    address
  )}&key=${API_KEY_OPEN_CAGE}`;

  try {
    const response = await axios.get(url);
    const location = response.data?.results[0]?.geometry;

    if (location) {
      console.log(`Latitude: ${location.lat}, Longitude: ${location.lng}`);
      return { latitude: location.lat, longitude: location.lng };
    } else {
      return null;
    }
  } catch (error) {
    const err = error as any;
    console.error(
      "Terjadi kesalahan:",
      err?.response?.data || err?.message
    );
    return null;
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { address } = req.body;
  if (!address) return res.status(400).json({ message: "Alamat wajib diisi" });
  const coordinates = await getCoordinates(address);
  if (!coordinates)
    return res.status(400).json({ message: "Alamat tidak valid" });
  res.status(200).json(coordinates);
};

export default handler;
