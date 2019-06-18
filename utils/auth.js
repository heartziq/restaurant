import Router from 'next/router';
export const redirectOnSuccess = (ctx, location) => {
  if (ctx.res) {
    ctx.res.writeHead(302, { Location: location })
    ctx.res.end()
    return
  } else {
    Router.push(location);
  }
}