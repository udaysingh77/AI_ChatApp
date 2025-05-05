import {getAIGeneratedContent} from "../services/ai.service.js"

const aiController = async(req,res)=>{
    const prompt = req.query.prompt;
    const result = await getAIGeneratedContent(prompt)
    res.send(result)
}

export default aiController