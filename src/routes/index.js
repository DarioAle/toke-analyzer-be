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
                autor :  "/author",
                home :   "/home",
                status : "/estoyvivo"
            }
        }
    );
})

router.route('/author').get((req,res) =>{
    res.json(
        {
            author : "Darío Arias",
        }
    )
})

router.route('/estoyvivo').get((req,res) =>{
    res.json(
        {
            status : "Sí estoy vivo",
        }
    )
})

module.exports = router;