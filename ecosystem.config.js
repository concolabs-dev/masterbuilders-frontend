module.exports = {
  apps: [
    {
      name: "frontend",
      script: "npm",
      args: "start",
      env_file: ".env.test",
    }
  ]
}
