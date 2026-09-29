export default async function handler(req, res) {
  const apiKey = process.env.FASHN_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "FASHN_API_KEY is not configured on the server." });
  }

  try {
    if (req.method === "POST") {
      const { modelImage, garmentImage, category = "auto" } = req.body || {};

      if (!modelImage || !garmentImage) {
        return res.status(400).json({ error: "modelImage and garmentImage are required." });
      }

      const response = await fetch("https://api.fashn.ai/v1/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model_name: "tryon-v1.6",
          inputs: {
            model_image: modelImage,
            garment_image: garmentImage,
            category,
            garment_photo_type: "auto",
            mode: "balanced",
            num_samples: 1,
            output_format: "jpeg",
            return_base64: true,
          },
        }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        return res.status(response.status || 502).json({
          error: data.error || "FASHN failed to start the try-on job.",
        });
      }

      return res.status(200).json({ id: data.id, status: "started" });
    }

    if (req.method === "GET") {
      const id = req.query?.id;

      if (!id) {
        return res.status(400).json({ error: "Prediction id is required." });
      }

      const response = await fetch(`https://api.fashn.ai/v1/status/${encodeURIComponent(id)}`, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return res.status(response.status || 502).json({
          error: data.error || "Unable to check the FASHN job.",
        });
      }

      const output = Array.isArray(data.output) ? data.output[0] : null;

      return res.status(200).json({
        status: data.status,
        image: output || null,
        error: data.error || null,
      });
    }

    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).json({ error: "Method not allowed." });
  } catch (error) {
    console.error("Virtual try-on error:", error);
    return res.status(500).json({ error: "Virtual try-on request failed." });
  }
}
