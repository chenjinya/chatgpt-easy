
import ora from 'ora'
import OpenAI from 'openai'
import readline from 'readline'
const readlineReaction = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

const Configuration = OpenAI.Configuration
const OpenAIApi = OpenAI.OpenAIApi
const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_KEY,
}));

const system = 'You are a awesome assistant!'
let messages = [
    {
        "role": "system", 
        "content": system
    }
]

// https://platform.openai.com/docs/guides/chat/introduction
async function run (messages){
    try {
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: messages,
            temperature: 0.8, // 每次返回的答案的相似度0-1（0：每次都一样，1：每次都不一样）
            max_tokens: 1000,
          });
        // if (completion.data && completion.data.choices.length > 0) {
        //     let m = completion.data.choices[0].message['content']
        //     console.log(m)
        // }
        
        return completion.data
    } catch(e) {
        console.error(e)
        return null
    }
}

// function showMessages(messages){
//     for(let i of messages) {
//         console.log(i.role, ':', i.content)
//     }
// }
function sleep(ms) {
    return new Promise(resolve=>setTimeout(resolve, ms))
}
async function main() {
    const spinner = ora("ChatGPT is thinking...")
    readlineReaction.question(`请输入你的问题?\n`, async (input) => {
        readlineReaction.close()
        messages.push({
            "role": "user", 
            "content": input
        })
    
        spinner.start();
        await sleep(1)
        const ans = await run(messages)
        spinner.succeed('completion:')
        if (ans && ans.choices.length > 0) {
            let m = ans.choices[0].message['content']
            console.log(m)
        }
    })
}
main()




