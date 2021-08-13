export default function handler({store, redirect, next}) {
  // console.log('middleware auth: ', store.state.auth)
  if(!store.state.auth) redirect('/login')
}