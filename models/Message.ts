import { Document, Schema, model, models, Types } from "mongoose";

export interface IMessage extends Document {
    sender: Types.ObjectId; // who sent it
    content: string; // text (you can extend with files later)
    board?: Types.ObjectId; // if it's a board discussion
    conversation?: Types.ObjectId; // if it's a private/group chat
    createdAt: Date;
    updatedAt: Date;
}

const messageSchema = new Schema<IMessage>(
    {
        sender: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        content: {
            type: String,
            required: true,
            trim: true,
        },
        board: {
            type: Schema.Types.ObjectId,
            ref: "Board",
        },
        conversation: {
            type: Schema.Types.ObjectId,
            ref: "Conversation",
        },
    },
    { timestamps: true }
);

// Ensure at least one of board or conversation is provided
messageSchema.pre("save", function (next) {
    if (!this.board && !this.conversation) {
        return next(
            new Error("Message must belong to a board or a conversation.")
        );
    }
    next();
});

export const Message =
    models.Message || model<IMessage>("Message", messageSchema);
