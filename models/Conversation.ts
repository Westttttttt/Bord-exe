import { Document, Schema, model, models, Types } from "mongoose";

export interface IConversation extends Document {
    participants: Types.ObjectId[]; // Users in convo
    createdAt: Date;
    updatedAt: Date;
}

const conversationSchema = new Schema<IConversation>(
    {
        participants: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
        ],
    },
    { timestamps: true }
);

export const Conversation =
    models.Conversation ||
    model<IConversation>("Conversation", conversationSchema);
