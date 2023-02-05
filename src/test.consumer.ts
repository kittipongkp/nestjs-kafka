import { OnModuleInit } from "@nestjs/common";
import { Injectable } from "@nestjs/common/decorators";
import { ConsumerService } from "./kafka/consumer.service";

@Injectable()
export class TestConsumer implements OnModuleInit {

    constructor(
        private readonly consumerService: ConsumerService,
    ) { }

    async onModuleInit() {
        await this.consumerService.consumer({
            topic: 'test'
        }, {
            eachMessage: async ({ topic, partition, message }) => {
                console.log({
                    value: message.value.toString(),
                    topic: topic.toString(),
                    partition: partition.toString(),
                });
            }
        })
    }

}