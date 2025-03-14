import { Consumer, Kafka } from "kafkajs";


const kafka = new Kafka({
	clientId: "course-service",
    brokers: ["localhost:29092"]    
});


export const consumer:Consumer=kafka.consumer({
    groupId:"course-service-kafka-group",
})