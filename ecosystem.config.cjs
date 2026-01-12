module.exports = {
  apps: [
    {
      name: "myapp",
      script: "npm",
      args: "start", // Pass `start` to the npm command
      env: {
        NODE_ENV: "production", // Specify the environment (optional)
      },
    },
  ],
};
