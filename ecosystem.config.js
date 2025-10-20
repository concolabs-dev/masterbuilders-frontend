module.exports = {
  apps: [
    {
      name: "frontend",
      script: "npm",
      args: "next start",
      env_file: ".env.test",
    }
  ]
}
