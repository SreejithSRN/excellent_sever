// // infrastructure/kafka/consumer/messageSentConsumer.ts
// // import { sendMessageNotification } from "../../services/notification";
// import { MessageEntity } from "../../../domain/entities";

// export default async (data: MessageEntity) => {
// 	try {
		
// 		console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
// 		console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
// 		console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
// 		console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
// 		console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
// 		console.log(">>>>>>>>>>>iam here in notification messagesent consumer",data)
// 		console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
// 		console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
// 		console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
// 		// await sendMessageNotification(data);
// 	} catch (error: any) {
// 		console.error("message-sent-consumer error:", error?.message);
// 	}
// };

import { sendMessage } from "../../../_lib/utility/sendMessage/sendMessage";
import { MessageEntity } from "../../../domain/entities";


export default async (data: MessageEntity) => {
  try {
    const email = data.receiverId;       // ✅ This is the recipient email
    const message = data.content;        // ✅ This is the message to send

    await sendMessage(email, message);   // 🎯 Send email
	console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
		console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
		console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
		console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
		console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
		console.log(">>>>>>>>>>>iam here in notification messagesent consumer",data)
		console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
		console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
		console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
		console.log("messagesent through notification service")

    console.log(`✅ Notification sent to ${email}`);
  } catch (error: any) {
    console.error("❌ Error in message-sent-consumer:", error?.message);
  }
};

