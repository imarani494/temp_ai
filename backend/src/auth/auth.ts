import { Issuer, Strategy } from 'openid-client';
import session from 'express-session';
import passport from 'passport';
import { Express } from 'express';

export async function setupAuth(app: Express) {
  const issuer = await Issuer.discover(process.env.OIDC_ISSUER!);
  const client = new issuer.Client({
    client_id: process.env.CLIENT_ID!,
    client_secret: process.env.CLIENT_SECRET!,
    redirect_uris: [process.env.REDIRECT_URI!],
    response_types: ['code'],
  });

  passport.use('oidc', new Strategy({ client }, (tokenset, done) => {
    return done(null, tokenset.claims());
  }));

  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((obj, done) => done(null, obj));

  app.use(session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  app.get('/login', passport.authenticate('oidc'));
  app.get('/callback', passport.authenticate('oidc', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/');
  });
}
