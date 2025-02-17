import axios from 'axios'
import fs, { existsSync,rmSync } from 'fs'
import amqp from 'amqplib'
import path from 'path'
import { createHLS } from './createHLS'
import { uploadFolder } from './upload'

async function  main() {
    let connection = await amqp.connect(process.env.RABBITMQ_CONNECTION_URL as string)
    let channel = await connection.createChannel()
    process.once("SIGINT", async () => {
        await channel.close();
        await connection.close();
      });
    
    await channel.assertQueue("rawVideos",{durable : false})
    
    channel.consume("rawVideos",async(msg)=>{
        
        try {
            const data = msg?.content.toString() as string
            let {rawVideoUrl,id} = JSON.parse(data) as {rawVideoUrl : string,id:string}
            // create download folder if it does not exist
            if(!existsSync(path.join(__dirname,"output"))){
                fs.mkdirSync(path.join(__dirname,"output"))
            }
            if(!existsSync(path.join(__dirname,"output",id))){
                fs.mkdirSync(path.join(__dirname,"output",id))
            }
            
            // download video
            const writeStream = fs.createWriteStream(path.join(__dirname,id))
            writeStream.on("finish",async ()=>{
                // create the HLS format
                console.log("creating HLS")
                await createHLS(path.join(__dirname,id),path.join(__dirname,"output",id))
                // uploading to s3
                console.log("uploadig hls")
                await uploadFolder(path.join(__dirname,"output",id),id)
                // delete the files
                rmSync(path.join(__dirname,"output",id),{recursive : true})
                rmSync(path.join(__dirname,id))
                
            })
            writeStream.on("error",(err:any)=>{console.log(err)})
            console.log("downloading video")
            const res = await axios.get(rawVideoUrl,{responseType : "stream"})
            res.data.pipe(writeStream)
        } catch (error) {
            console.log(error)
        }
        
    },{noAck : true})

}

main()