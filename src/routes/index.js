const router = require('express').Router();

// Tone analyzer libraries
const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');
const { IamAuthenticator } = require('ibm-watson/auth');

const apikey = "IK1qS8GKd61THsn7Ea4MELhjYPVpcTkCc4m03w0Zt_2f";
const url = 'https://api.us-south.tone-analyzer.watson.cloud.ibm.com/instances/875eabee-ae6e-4f87-905e-5664456f0264/v3/tone?version=2017-09-21';


const toneAnalyzer = new ToneAnalyzerV3({
    version: '2017-09-21',
    authenticator: new IamAuthenticator({
      apikey: `${apikey}`
    }),
    serviceUrl: `${url}`,
  });  

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

router.route('/tone').post((req,res) =>{

    // console.log(req.body.text);
    const toneParams = {
        toneInput: { 'text': req.body.text},
        contentType: 'application/json',
        sentences : false
      };

    toneAnalyzer.tone(toneParams)
                .then(toneAnalysis => {
                    res.json(
                       toneAnalysis.result.document_tone
                    )
                })
                .catch(err => {
                    res.json(
                        {
                            error : err
                        }
                    )
                });
})

module.exports = router;