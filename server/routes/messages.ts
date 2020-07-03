import MessageModel, {Message} from "../models/messages";
// import {model} from "mongoose";
import { Router } from 'express';

const router = Router();

interface modifyMessageInput{
    message: Message['message'],
    _id: Message["_id"]
}

(()=>{
    async function addMessage({message}:{message:string}): Promise<Message>{
        return await MessageModel.create({
            date: new Date,
            message
        });
    }

    async function deleteMessage({_id}:{_id:string}): Promise<Boolean>{
        return MessageModel.deleteOne({_id}).then(()=>{
            return true;
        }).catch((e)=>{
            return false;
        })
    }

    async function deleteAllMessage(): Promise<Boolean>{
        return MessageModel.deleteMany({}).then(()=>{
            return true;
        }).catch((e)=>{
            return false;
        })
    }

    async function modifyMessage({_id, message}:modifyMessageInput): Promise<Message|null>{
        const messageModel = await MessageModel.findOne({_id});
        if(messageModel){
            messageModel.message = message;
            messageModel.date = new Date();
            return messageModel.save();
        }else{
            return null;
        }
    }

    router.post('/add', async(req, res)=>{
        console.log(req.body);
        const message = await addMessage({message:req.body.message});
        if(message){
            res.status(200).json({ success: true, message: message });
        }else{
            res.status(401).json({ success: false, msg: "Error" });
        }
    });

    router.post('/delete', async(req, res)=>{
        const isDeleted = await deleteMessage({_id:req.body._id});
        if(isDeleted){
            res.status(200).json({ success: true});
        }else{
            res.status(401).json({ success: false});
        }
    });

    router.post('/deleteall', async(req, res)=>{
        const isDeleted = await deleteAllMessage();
        if(isDeleted){
            res.status(200).json({ success: true});
        }else{
            res.status(401).json({ success: false});
        }
    });

    router.post('/modify', async(req, res)=>{
        const message = await modifyMessage({message:req.body.message, _id:req.body._id});
        if(message){
            res.status(200).json({ success: true, message: message });
        }else{
            res.status(401).json({ success: false, msg: "Error" });
        }
    });

    router.get('', async (req,res)=>{
        const messages = await MessageModel.find();
        console.log(messages);
        res.status(200).json({ success: false, messages: messages })
    }); 
})();

export default router;

