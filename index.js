import Fastify from "fastify";
import dotenv from "dotenv";
import fastifyFormBody from "@fastify/formbody";
import fastifyWs from "@fastify/websocket";
import fastifyStatic from "@fastify/static";
import path from "path";
import { fileURLToPath } from "url";
import { registerInboundRoutes } from "./inbound-calls.js";
import { registerOutboundRoutes } from "./outbound-calls.js";

// Load environment variables from .env file
dotenv.config();

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Fastify server
const fastify = Fastify({
  logger: true,
});

fastify.register(fastifyFormBody);
fastify.register(fastifyWs);

// Serve the React build folder
fastify.register(fastifyStatic, {
  root: path.join(__dirname, "caller-ui", "dist"), // or "caller-ui/build" for CRA
  prefix: "/", // Serve static files under "/"
  wildcard: true, // Ensure requests are served properly for SPA routing
});

const PORT = process.env.PORT || 8000;

// Start the Fastify server
const start = async () => {
  try {
    // Register API route handlers
    await registerInboundRoutes(fastify);
    await registerOutboundRoutes(fastify);

    // Start listening
    await fastify.listen({ port: PORT, host: "0.0.0.0" });
    console.log(`[Server] Listening on port ${PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("Unhandled rejection:", err);
  process.exit(1);
});

start();
