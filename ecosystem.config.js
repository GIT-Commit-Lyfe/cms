module.exports = {
  apps: [
    {
      name: 'tws-cms',
      exec_mode: 'cluster',
      instances: 'max', // Or a number of instances
      script: 'yarn',
      args: 'start'
    }
  ]
}