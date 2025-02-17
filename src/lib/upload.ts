import {S3Client} from '@aws-sdk/client-s3'
import {Upload} from '@aws-sdk/lib-storage'
import { createReadStream,readdir } from 'fs'
import path from 'path'
import util from 'util'
const readDir = util.promisify(readdir)
const s3 = new S3Client({
    region :process.env.AWSREGION,
    credentials : {
        accessKeyId : process.env.AWSACCESSKEYID!,
        secretAccessKey :process.env.AWSSECRETACCESSKEY!
    }
})

async function uploadFile(key:string,path:string) {
    const upload = new Upload({
        client : s3,
        params : {
            Bucket : process.env.BUCKETNAME!,
            Key : key,
            Body : createReadStream(path)
        }
    })
    
    await upload.done()    
}

export async function uploadFolder(inputPath : string,key:string) {
    const files = await readDir(inputPath)
    for(let i = 0 ; i<files.length ; i++){
        await uploadFile(`hls/${key}/${files[i]}`,path.join(inputPath,files[i]))
        console.log("uploaded: ",files[i])
    }
}



