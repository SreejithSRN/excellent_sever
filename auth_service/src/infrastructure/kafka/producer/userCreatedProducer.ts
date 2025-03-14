import { producer } from "..";
import { UserEntity } from "../../../domain/entities";

export default async (data: UserEntity|null) => {
    try {
        await producer.connect();

        const message = {
            topic: "course-service-topic",
            messages: [
                {
                    key: "userCreated",
                    value: JSON.stringify(data),
                },
            ],
        };

        await producer.send(message);

        console.log("Message sent successfully to Kafka topic.");
    } catch (error: unknown) {
        console.error("Kafka produce error in auth_service:", (error as Error)?.message);
    } finally {
        await producer.disconnect();
    }
};
