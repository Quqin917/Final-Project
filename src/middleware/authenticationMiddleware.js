function isAuthenticatedToLogin(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/auth/login');
}

function isAuthenticatedToHome(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/auth/login');
}

function isNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    next();
}

module.exports = {
    isAuthenticatedToLogin: isAuthenticatedToLogin,
    isAuthenticatedToHome: isAuthenticatedToHome,
    isNotAuthenticated: isNotAuthenticated
}