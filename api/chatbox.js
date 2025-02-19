// require("dotenv").config(); // Load biến môi trường từ .env
// console.log("WIT_AI_TOKEN:", process.env.WIT_AI_TOKEN);
// const express = require("express");
// const axios = require("axios");

// const app = express();
// app.use(express.json());

// const WIT_AI_TOKEN = process.env.WIT_AI_TOKEN;


// const PORT = process.env.PORT || 5000;

// // Danh sách câu trả lời có sẵn
// const predefinedAnswers = {
//   "Cửa hàng của bạn ở đâu?": "Cửa hàng của tôi ở Hà Nội.",
//   "Bạn có những sản phẩm nào?": "Chúng tôi có điện thoại, laptop và phụ kiện.",
//   "Giờ mở cửa của cửa hàng là gì?": "Cửa hàng mở cửa từ 9h sáng đến 9h tối."
// };

// app.post("/chat", async (req, res) => {
//   const userMessage = req.body.message;

//   // Nếu câu hỏi có trong danh sách có sẵn, trả lời ngay
//   if (predefinedAnswers[userMessage]) {
//     return res.json({ reply: predefinedAnswers[userMessage] });
//   }

//   try {
//     // Gửi tin nhắn đến Wit.ai
//     const witResponse = await axios.get(
//       `https://api.wit.ai/message?v=20230223&q=${encodeURIComponent(userMessage)}`,
//       {
//         headers: { Authorization: `Bearer ${WIT_AI_TOKEN}` }
//       }
//     );

//     const intents = witResponse.data.intents;

//     console.log("Wit.ai Response:", JSON.stringify(witResponse.data, null, 2));

//     // Kiểm tra Intent từ Wit.ai
//     if (intents.length > 0) {
//       const detectedIntent = intents[0].name;

//       if (detectedIntent === "store_location") {
//         return res.json({ reply: "Cửa hàng của tôi ở Hà Nội." });
//       } else if (detectedIntent === "store_products") {
//         return res.json({ reply: "Chúng tôi có điện thoại, laptop và phụ kiện." });
//       } else if (detectedIntent === "store_hours") {
//         return res.json({ reply: "Cửa hàng mở cửa từ 9h sáng đến 9h tối." });
//       }
//     }

//     return res.json({ reply: "Xin lỗi, tôi chưa hiểu câu hỏi của bạn." });
//   } catch (error) {
//     console.error("Lỗi khi gọi Wit.ai:", error);
//     console.log("lơefwfwefwefwfwfwefwefwefwefwefwefwefwefwefwefwefwe"+error.response?.data || error.message);
//     return res.status(500).json({ reply: "Có lỗi xảy ra, vui lòng thử lại sau." });
//   }
// });

// app.listen(PORT, () => console.log(`Chatbot đang chạy trên http://localhost:${PORT}`));








require("dotenv").config(); // Load biến môi trường từ .env
const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const WIT_AI_TOKEN = process.env.WIT_AI_TOKEN;

// Danh sách câu trả lời có sẵn
const predefinedAnswers = {
  "Cửa hàng của bạn ở đâu?": "Cửa hàng của tôi ở Hà Nội.",
  "Bạn có những sản phẩm nào?": "Chúng tôi có điện thoại, laptop và phụ kiện nha bạn.",
  "Giờ mở cửa của cửa hàng là gì?": "Cửa hàng mở cửa từ 9h sáng đến 9h tối nha bạn yêu dưddwddwd."
};

app.post("/api/chat", async (req, res) => {
  const userMessage = req.body.message;

  // Nếu câu hỏi có trong danh sách có sẵn, trả lời ngay
  if (predefinedAnswers[userMessage]) {
    return res.json({ reply: predefinedAnswers[userMessage] });
  }

  try {
    // Gửi tin nhắn đến Wit.ai
    const witResponse = await axios.get(
      `https://api.wit.ai/message?v=20230223&q=${encodeURIComponent(userMessage)}`,
      {
        headers: { Authorization: `Bearer ${WIT_AI_TOKEN}` }
      }
    );

    console.log("Wit.ai Response:", JSON.stringify(witResponse.data, null, 2));

    const intents = witResponse.data.intents;

    // Kiểm tra Intent từ Wit.ai
    if (intents.length > 0) {
      const detectedIntent = intents[0].name;

      if (detectedIntent === "store_location") {
        return res.json({ reply: "Cửa hàng của tôi ở Hà Nội." });
      } else if (detectedIntent === "store_products") {
        return res.json({ reply: "Chúng tôi có điện thoại, laptop và phụ kiện." });
      } else if (detectedIntent === "store_hours") {
        return res.json({ reply: "Cửa hàng mở cửa từ 9h sáng đến 9h tối." });
      }
    }

    return res.json({ reply: "Xin lỗi, tôi chưa hiểu câu hỏi của bạn." });
  } catch (error) {
    console.error("Lỗi khi gọi Wit.ai:", error);
    return res.status(500).json({ reply: "Có lỗi xảy ra, vui lòng thử lại sau." });
  }
});

// Vercel yêu cầu export `app`
module.exports = app;
