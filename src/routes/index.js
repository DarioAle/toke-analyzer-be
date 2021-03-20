const router = require('express').Router();

// Tone analyzer libraries
const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');
const { IamAuthenticator } = require('ibm-watson/auth');

const apikey = "IK1qS8GKd61THsn7Ea4MELhjYPVpcTkCc4m03w0Zt_2f";
const version = "2017-09-21"; 
const url = "https://api.us-south.tone-analyzer.watson.cloud.ibm.com/instances/875eabee-ae6e-4f87-905e-5664456f0264/v3/tone";


const toneAnalyzer = new ToneAnalyzerV3({
    version: version,
    authenticator: new IamAuthenticator({
      apikey: apikey,
    }),
    serviceUrl: url,
  });  

  const text = 'Team, I know that times are tough! Product '
  + 'sales have been disappointing for the past three '
  + 'quarters. We have a competitive product, but we '
  + 'need to do a better job of selling it!';

  const toneParams = {
    toneInput: { 'text': text },
    contentType: 'application/json',
    sentences : false
  };
  
  toneAnalyzer.tone(toneParams)
    .then(toneAnalysis => {
      console.log(JSON.stringify(toneAnalysis, null, 2));
    })
    .catch(err => {
      console.log('error:', err);
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

router.route('/tone').get((req,res) =>{
    res.json(
        {
            instructions : "TODO Make a post to this url",
        }
    )
})

module.exports = router;