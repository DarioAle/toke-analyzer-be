const router = require('express').Router();

// importamos los routes
const homeRoute = require('./home');

// paths con su propio route
router.use('/home', homeRoute);

// path con retorno directo
router.route('/').get((req, res) => {
    res.json(
        {   
            version: "0.0.1",
            paths: {
                autor :  "/autor",
                home :   "/home",
                tone :   "/tone",
            }
        }
    );
})

router.route('/autor').get((req,res) =>{
    res.json(
        {
            author : "Darío Arias",
            servicio : "Cloud Foundry en IBM Cloud"
        }
    )
})

router.route('/tone').get((req,res) =>{
    res.json(
        {
            instructions : "TODO Make a post to this url",
        }
    )
})

module.exports = router;