import cluster from 'cluster';
import { cpus } from 'os';
import server from './services/server'

if(cluster.isMaster){
    console.log(`CPUs number: ${cpus().length}`);
    console.log(`\nMaster process ${process.pid}`);
    
    cpus().forEach(cpu => {
        cluster.fork();
    })

    cluster.on("exit", (worker) => {
        console.log(`Worker ${worker.process.pid} died.`);
        cluster.fork();
    })

}else{

    const PORT = 8000;
    server.listen(PORT, () => {
        console.log(`Express server hosted at port ${PORT}`);
    })
}



