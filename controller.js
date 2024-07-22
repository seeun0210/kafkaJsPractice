const KafkaConfig =require('./config')

const sendMessageToKafka=async(req,res)=>{
    try{
        const {message}=req.body;
        const kafkaConfig=new KafkaConfig();
        const messages=[
            {key:"key1",value:message}
        ];
        kafkaConfig.produce("my-topic",messages);
        res.status(200).json({
            status:"ok",
            mesage:'Message successfully send!'
        })
    }catch(e){
        console.log(e);
    }
}
module.exports={sendMessageToKafka};
