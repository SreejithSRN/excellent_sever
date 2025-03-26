import { Consumer, Kafka } from "kafkajs";


const kafka = new Kafka({
	clientId: "payment-service",
    brokers: ["localhost:29092"]    
});


export const consumer:Consumer=kafka.consumer({
    groupId:"payment-service-kafka-group",
})