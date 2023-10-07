import * as brain from 'brain.js';
import * as natural from 'natural';
import data from '../../db/data.json';
import checker from '../../db/checker.json';
import request from 'request';
const network= new brain.recurrent.LSTM();
const classifier = new natural.BayesClassifier();

//Training checker data
checker.forEach((data:any) => classifier.addDocument(data.sign, data.output));
classifier.train();;

//training health data
const trainingData=data.map(item=>({
    input: item.signs,
    output: item.sickness
}));
network.train(trainingData,{
    iterations:100,
    errorThresh: 0.01 
});

export async function ask(req:any,res:any){
    try {
        const {prompt}=req.body;
        const checkedData:any = classifier.classify(prompt);
        if(checkedData===1){
            const output=network.run(prompt);
            //google search the output
            let options = {
                'method': 'POST',
                'url': 'https://google.serper.dev/search',
                'headers': {
                    'X-API-KEY': process.env.SEARCH_API_KEY,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "q": prompt,
                    "gl": "us",
                    "hl": "en",
                    "autocorrect": true
                })
                
            };
            request(options, (error:any, response:any) => {
                if (error) {
                    res.status(404).send({msg:error.message})
                }else{
                    res.status(200).send({
                        msg:output,
                        ans:response.body
                    });
                }
            });
        }else{
            res.status(400).send({
                error:"Cannot generate response!",
            })
        }
       
    } catch (error) {
        console.log(error.message)
        res.status(400).send({
            error:error.message,
        })
    }
}