const SERVER_SECRET = 'lalala'

const passport = require('passport')
const passportJwt = require('passport-jwt')
const JWTStrategy = passportJwt.Strategy
const ExtractJwt = passportJwt.ExtractJwt

passport.use(
  new JWTStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // como extraer el token, con la funcion que elegi
    secretOrKey: SERVER_SECRET
  },

  (jwtPayload, done) => {
    const user = jwtPayload
    return done(null, user)
  }

  )
)

const jwtValidMDW = passport.authenticate('jwt', { session: false }) // solo veo q el token sea valido

const userIsAdmin = (req, res, next) => {
  return passport.authenticate('jwt', { session: false }, (error, user, info) => {
    if (error) {
      console.log(error)
      return next(error)
    }
    if (user.role === 'Admin') {
      req.user = user
      return next()
    }
    res.status(401).json({ error: 'User  not Admin' })
  })(req, res, next)
}

const userIsSuperAdmin = (req, res, next) => {
  return passport.authenticate('jwt', { session: false }, (error, user, info) => {
    if (error) {
      console.log(error)
      return next(error)
    }

    // EL SUPER ADMIN (que tiene control para recuperar  books y libraries eliminadas) es el user que se genera automaticamente al iniciar la DB y tiene por user= admin
    if (user.user === 'admin') {
      req.user = user
      return next()
    }
    res.status(401).json({ error: 'User  not SUPER Admin' })
  })(req, res, next)
}

module.exports = { SERVER_SECRET, jwtValidMDW, userIsAdmin, userIsSuperAdmin }
