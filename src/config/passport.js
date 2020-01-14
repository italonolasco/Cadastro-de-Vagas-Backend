const { authSecret } = require('../../.env')
const passport = require('passport');
const passportJwt = require('passport-jwt');
const { Strategy, ExtractJwt } = passportJwt;

const Admin = require('../models/Admin');
const Candidate = require('../models/Candidate');

module.exports = {
    authenticateAdmin() {
        const params = {
            secretOrKey: authSecret,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        }
    
        const strategy = new Strategy(params, async (payload, done) => {
            const admin_id = payload.id;
            const admin = await Admin.findByPk(admin_id);
            
            done(null, admin ? { ...payload } : false);
        })
    
        passport.use(strategy)
    
        return passport.authenticate('jwt', { session: false })
    },

    authenticateCandidate() {
        const params = {
            secretOrKey: authSecret,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        }
    
        const strategy = new Strategy(params, async (payload, done) => {
            const candidate_id = payload.id;
            const candidate = await Candidate.findByPk(candidate_id);
            
            done(null, candidate ? { ...payload } : false);
        })
    
        passport.use(strategy)
    
        return passport.authenticate('jwt', { session: false })
    },

}