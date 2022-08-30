import server from './lib/server.js';
import workers from './lib/workers.js';

// Declare the app
const app = {};

// Create the Initialization method
app.init = () => {
  // Start the server
  server.init();

  // Start the workers
  workers.init();
};

// Initialize Server and Workers
app.init();

// Export the app
export default app;
