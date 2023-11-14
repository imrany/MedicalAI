import * as brain from 'brain.js';
import data from '../../data/data.json';
import checker from '../../data/checker.json';
import request from 'request';
const network= new brain.recurrent.LSTM();
const network2= new brain.recurrent.LSTM();

//mapping data into input and output
const checkData=checker.map(item=>({
    input: item.sign,
    output: item.output
}));
const trainingData=data.map(item=>({
    input: item.signs,
    output: item.sickness
}));


//training data
network.train(trainingData,{
    iterations:100,
    errorThresh: 0.01 
});
network2.train(checkData,{
    iterations:100,
    errorThresh: 0.01 
});

export async function ask(req:any,res:any){
    try {
        const {prompt}=req.body;
        const checkedData:any = network2.run(prompt);
        if(checkedData==1){
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
                    "q": `How to treat ${prompt}`,
                    "gl": "us",
                    "hl": "en",
                    "autocorrect": true
                })
                
            };
            request(options, (error:any, response:any) => {
                if (error) {
                    console.log(error.message)
                    res.status(404).send({error:"No internet"})
                }else{
                    res.status(200).send({
                        msg:output,
                        ans:response.body
                    });
                }
            });
        }else{
            res.status(400).send({
                error:"Try entering illness sign or symptom",
            })
        }
       
    } catch (error:any) {
        console.log(error.message)
        res.status(500).send({
            error:error.message,
        })
    }
}