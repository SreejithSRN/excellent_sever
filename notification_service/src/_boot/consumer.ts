import { consumer } from "../infrastructure/kafka";
import { createSubscriber, INotificationSubscriber } from "../infrastructure/kafka/subscriber";


export const startConsumer = async () => {
	try {
		await consumer.connect();
		await consumer.subscribe({
			topic: "notification-service-topic",
			fromBeginning: true,
		});

		const subscriber = createSubscriber();

		await consumer.run({
			eachMessage: async ({ message }) => {
				const { key, value } = message;

				const subscriberMethod = String(key) as keyof INotificationSubscriber;
				const subscriberData = JSON.parse(String(value));

				console.log("📨 Received Message Key:", subscriberMethod);
				console.log("🧩 Subscriber Methods:", Object.keys(subscriber));

				if (typeof subscriber[subscriberMethod] !== "function") {
					throw new Error(`Method ${subscriberMethod} is not a function on the subscriber object`);
				}

				try {
					await subscriber[subscriberMethod](subscriberData);
				} catch (error: any) {
					console.error("❌ Error while processing subscriber method:", error?.message);
				}
			},
		});
	} catch (error: any) {
		console.error("Kafka Consume Error:", error?.message);
	}
};

export const stopConsumer = async () => {
	await consumer.stop();
	await consumer.disconnect();
};
