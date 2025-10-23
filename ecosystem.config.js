module.exports = {
  apps: [
    {
      name: "frontend",
      script: "npm",
      args: "start", // The script command for npm
      cwd: "/home/ubuntu/masterbuilders-frontend",
      env_file: ".env.test", // The correct PM2 way to load this file
    }
  ]
};
