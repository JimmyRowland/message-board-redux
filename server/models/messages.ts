import {Schema, Document, model} from "mongoose";

const MessageSchema: Schema = new Schema({
    // _id: Schema.Types.ObjectId,
    message: {type: String, required: true},
    date: {type: Schema.Types.Date, required: true}
})

export interface Message extends Document{
    message: string,
    date: Date
}

export default model<Message>('MessageModel', MessageSchema);