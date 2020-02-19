const express = require('express');
const jwt = require('jsonwebtoken');

const apiController = require('./controllers/api_controller');
const ctrlController = require('./controllers/ctrl_controller');
const adminAuthController = require('./controllers/admin/auth.controller');
const adminClientDetailsController = require('./controllers/admin/client-details.controller');
const adminClientSignUpController = require('./controllers/admin/client-sign-up.controller');

const {jwt: {secret: jwtSecret}} = require('./env');

function makeApiRoutes(app) {
    const router = express.Router();

    router.get('/', apiController.index);
    router.get('/latestattestation', apiController.latest_attestation);
    router.get('/latestcommitment', apiController.latest_commitment);
    router.get('/commitment', apiController.commitment);
    router.get('/commitment/latestproof', apiController.commitment_latest_proof);
    router.get('/commitment/verify', apiController.commitment_verify);
    router.get('/commitment/proof', apiController.commitment_proof);
    router.get('/attestation/proof', apiController.attestation_proof);
    router.get('/commitment/commitment', apiController.commitment_commitment);
    router.get('/merkleroot', apiController.merkleroot);
    router.get('/position', apiController.position);
    router.get('/attestation', apiController.attestation);
    router.get('/blockhash', apiController.blockhash);
    router.get('/clients', apiController.clients);
    router.post('/commitment/send', apiController.commitment_send);

    app.use('/api/v1', router);
}

function makeCtrlRoutes(app) {
    const router = express.Router();

    // for parsing application/json
    router.use(express.json());
    // for parsing application/x-www-form-urlencoded
    router.use(express.urlencoded({extended: true}));

    router.get('/latestattestation', ctrlController.ctrl_latest_attestation);
    router.get('/latestattestationinfo', ctrlController.ctrl_latest_attestation_info);
    router.get('/latestcommitment', ctrlController.ctrl_latest_commitment);

    router.get('/type', ctrlController.ctrl_type);

    router.post('/sendcommitment', ctrlController.ctrl_send_commitment);
    router.post('/usersignup', ctrlController.ctrl_client_signup);

    // error handler middleware
    router.use((error, req, res, next) => {
        if (error.code) {
            res.status(400).json({
                error: error.code,
                message: error.message
            });
        } else {
            res.status(500).json({
                error: 'api',
                message: error.message
            });
        }
    });

    app.use('/ctrl', router);
}

function makeAdminRoutes(app) {
    const router = express.Router();

    // for parsing application/json
    router.use(express.json());
    // for parsing application/x-www-form-urlencoded
    router.use(express.urlencoded({extended: true}));

    router.post('/login', adminAuthController.login);

    // middleware to check access-token
    router.use((req, res, next) => {
        const accessToken = req.headers['x-access-token'];
        if (!accessToken) {
            return res.status(401).end();
        }
        jwt.verify(accessToken, jwtSecret, function(error, payloadIgnored) {
            if (error) {
                return res.status(401).end();
            } else {
                next();
            }
        });
    });

    router.get('/client_details', adminClientDetailsController.list);
    router.post('/client_details', adminClientDetailsController.post);
    router.put('/client_details', adminClientDetailsController.put);

    router.get('/client_sign_up', adminClientSignUpController.list);
    router.patch('/client_sign_up/:id', adminClientSignUpController.patch);

    // error handler middleware
    router.use((error, req, res, next) => {
        if (error.status_code) {
            res.status(400).json({
                error: {
                    code: error.status_code,
                    message: error.message
                }
            });
        } else {
            res.status(500).json({
                error: {
                    code: 'something_wrong',
                    message: error.message
                },
            });
        }
    });

    app.use('/admin', router);
}

module.exports = {
    makeCtrlRoutes,
    makeApiRoutes,
    makeAdminRoutes,
};
