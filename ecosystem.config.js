module.exports = {
  apps: [
    {
      name: "frontend",
      script: "npm",
      args: "start",
      cwd: "/home/ubuntu/masterbuilders-frontend",
      node_args: "-r dotenv/config",
      args: "--dotenv_config_path=/home/ubuntu/masterbuilders-frontend/.env.test",
      env_file: ".env.test",
    }
  ]
}
