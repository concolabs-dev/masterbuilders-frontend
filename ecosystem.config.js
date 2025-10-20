module.exports = {
  apps: [
    {
      name: "build-m-f",
      script: "npm",
      args: "next start",
      env_file: ".env.test",
    }
  ]
}
