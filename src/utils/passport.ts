import passport from 'passport';
import passportJwt from 'passport-jwt';
import { User } from '../models';

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_PRIVATE_KEY
    },
    async (payload, done) => {
      try {
        const user = await User.findOne({
          attributes: ['id', 'login'],
          where: { login: payload.user.login },
          raw: true
        });
        if (user) {
          return done(undefined, user, payload);
        }
        return done(undefined, false);
      } catch (error) {
        done(error, false);
      }
    }
  )
);
