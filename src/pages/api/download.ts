import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const filePath = path.join(process.cwd(), "public", "app", "didesa-v1.0.apk");
  if (fs.existsSync(filePath)) {
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=didesa-v1.0.apk`
    );
    res.setHeader("Content-Type", "application/vnd.android.package-archive");
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);    
  } else {
    res.status(404).json({ error: "File not found" });
  }
}
