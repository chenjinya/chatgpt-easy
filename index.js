
import ora from 'ora'
import OpenAI from 'openai'
import readline from 'readline'
import fs from 'fs'
const readlineReaction = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

const openai = new OpenAI({
    baseURL: 'https://api.openai.com/v1',
    // apiKey: '{API_KEY}',
});

const defaultSystem = 'You are an awesome assistant!'

// https://platform.openai.com/docs/guides/chat/introduction
async function run (messages){
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: messages,
            temperature: 0.8, // 每次返回的答案的相似度0-1（0：每次都一样，1：每次都不一样）
            max_tokens: 1000,
          });
        return JSON.parse(completion)
    } catch(e) {
        console.error(e.message)
        return null
    }
}


function sleep(ms) {
    return new Promise(resolve=>setTimeout(resolve, ms))
}
async function main() {
    
    let assistantSystem = defaultSystem
    readlineReaction.question(`请输入助手的设定 ?(default: ${assistantSystem})\n`, async (sys) => {
        if (sys) {
            assistantSystem = sys
        }
        let messages = [
            {
                "role": "system", 
                "content": assistantSystem
            }
        ]
        
        while(true) {
            await waitreaction(messages)
        }
       
    })
}

function waitreaction(messages) {
    return new Promise((resolve, reject) => {
        readlineReaction.resume()
        readlineReaction.question(`\n请输入你的问题?\n`, async (input) => {
            readlineReaction.pause()
            if(!input) {
                console.log("💥 请输入问题")
                resolve && resolve()
                return
            }
            const spinner = ora("🤯 ChatGPT is thinking...")
            messages.push({
                "role": "user", 
                "content": input
            })
            spinner.start();
            await sleep(1)
            try {
                const ans = await run(messages)
                spinner.succeed('🤖:')
                if (ans && ans.choices.length > 0) {
                    let m = ans.choices[0].message['content']
                    console.log(m)
                    messages.push({
                        "role": "assistant", 
                        "content": m
                    })
       
                    fs.writeFile(`./snapshot/${messages[1].content.substr(0, 50)}.json`, JSON.stringify(messages), (err) => {
                        if(err) {
                            console.error(err)
                        }
                      });
                    resolve && resolve()
                }
            } catch(e) {
                reject && reject(e)
            }
        })
    })
}
main()




