import express from 'express';

const router = express.Router();

const validation = (percent, minimum, maximum) => {

      if(percent < minimum || percent > maximum || percent === '' || minimum > maximum || minimum === '' || maximum === ''){
          return {error: true, message: `Please, insert the values correctly...`}
      }else{
          return {error: false, message: `Values submitted, look at the bar...`}
      }
}

router.get('/', (req,res) => {
    res.render('main', {errorExists: false, messageExists: false,form: true});
});
router.get('/data', (req,res) => {
    const {percent, minimum, maximum} = req.query;
    console.log(req.query)
    const result = validation(+percent,+minimum,+maximum);
    result.error ? res.render('main', {errorExists: true, messageExists: false, form: true, message: result.message}) :
    res.render('main', {errorExists: false, messageExists: true, form: false, min: minimum, max: maximum, percent: percent})
});
export default router