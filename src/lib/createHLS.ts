import { exec } from 'child_process';
import path from 'path';
import util from 'util'
const execPromisified = util.promisify(exec);
export async function createHLS(inputPath : string,outputPath:string){
    try {
        const command = `ffmpeg -i ${inputPath} -f hls -hls_time 10 -hls_list_size 0 ${path.join(outputPath,"output.m3u8")}`;
        await execPromisified(command)
    } catch (error) {
        throw error
    }     

}









