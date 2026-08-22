const { spawn } = require('child_process');

// Script robusto para iniciar ambos os serviços sem depender do concurrently ou npx no Windows

const clientArgs = ['run', 'dev', '--prefix', 'client'];
const serverArgs = ['run', 'dev', '--prefix', 'server'];

// Usa shell: true para garantir compatibilidade no Windows
const client = spawn('npm', clientArgs, { stdio: 'inherit', shell: true });
const server = spawn('npm', serverArgs, { stdio: 'inherit', shell: true });

client.on('close', (code) => console.log(`Client exited with code ${code}`));
server.on('close', (code) => console.log(`Server exited with code ${code}`));

// Encerrar processos filhos quando fechar o terminal
process.on('SIGINT', () => {
    client.kill('SIGINT');
    server.kill('SIGINT');
    process.exit();
});
