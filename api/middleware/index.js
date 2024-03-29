const jwt = require('jsonwebtoken');

const verify = (req, res, next) => {
  if (!('authorization' in req.headers)) {
    res.redirect(302, 'http://localhost:3000/login');
    res.end();
    return
  }

  const { token } = JSON.parse(req.headers.authorization);
  
  try {
    const decoded = jwt.verify(getJustToken(token), 'shhh');
    res.decoded = decoded;
    next();
  } catch (err) {
    res.status(401).json({"msg": err.message})
  }
};

const getJustToken = token => {
  return token.split(' ')[1];
}

module.exports = {
  verify
};
