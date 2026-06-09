export default function handler(req, res) {
  if (req.method === "POST") {
    res.status(200).json({
      success: true,
      message: "Order received successfully"
    });
  } else {
    res.status(405).json({
      success: false,
      message: "Only POST allowed"
    });
  }
}