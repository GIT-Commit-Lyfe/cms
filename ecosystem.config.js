module.exports = {
  apps: [
    {
      name: 'tws-cms',
      exec_mode: 'fork',
      instances: 1, // Or a number of instances
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start'
    }
  ]
}