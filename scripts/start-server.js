const { spawn } = require('child_process');
const net = require('net');

/**
 * Check if a port is available
 * @param {number} port - Port number to check
 * @returns {Promise<boolean>} - True if port is available
 */
function isPortAvailable(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    
    server.listen(port, () => {
      server.once('close', () => resolve(true));
      server.close();
    });
    
    server.on('error', () => resolve(false));
  });
}

/**
 * Find the next available port starting from the given port
 * @param {number} startPort - Starting port number
 * @returns {Promise<number>} - Available port number
 */
async function findAvailablePort(startPort = 3000) {
  let port = startPort;
  const maxPort = startPort + 100; // Try up to 100 ports ahead
  
  while (port <= maxPort) {
    const available = await isPortAvailable(port);
    if (available) {
      return port;
    }
    port++;
  }
  
  throw new Error(`Could not find an available port starting from ${startPort}`);
}

/**
 * Start the Next.js server on an available port
 */
async function startServer() {
  try {
    const port = await findAvailablePort(3000);
    
    console.log(`Starting Next.js server on port ${port}...`);
    
    const server = spawn('npx', ['next', 'start', '-p', port.toString()], {
      stdio: 'inherit',
      shell: true
    });
    
    server.on('error', (error) => {
      console.error('Failed to start server:', error);
      process.exit(1);
    });
    
    server.on('exit', (code) => {
      process.exit(code);
    });
    
    // Handle process termination
    process.on('SIGINT', () => {
      server.kill('SIGINT');
    });
    
    process.on('SIGTERM', () => {
      server.kill('SIGTERM');
    });
    
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

startServer();

