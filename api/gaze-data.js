export default async function handler(req, res) {
    const response = await fetch("https://c1t601n18l.execute-api.ap-southeast-2.amazonaws.com/default/ReceiveGazeData");
  
    if (!response.ok) {
      return res.status(response.status).json({ error: "Lambda 호출 실패" });
    }
  
    const json = await response.json();
    res.status(200).json(json);
  }