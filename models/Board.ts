import { Document, model, models, Schema, Types } from "mongoose";

export type UserRole = "owner" | "viewer" | "editor";

export interface IBoardParticipant {
    user: Types.ObjectId;
    role: UserRole;
}

export interface IBoard extends Document {
    title: string;
    description?: string;
    creatorId: Types.ObjectId;
    participants: IBoardParticipant[];
    createdAt: Date;
    updatedAt: Date;
}

const boardSchema = new Schema<IBoard>(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        creatorId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        participants: [
            {
                user: {
                    type: Schema.Types.ObjectId,
                    ref: "User",
                    required: true,
                },
                role: {
                    type: String,
                    enum: ["owner", "editor", "viewer"],
                    default: "viewer",
                },
            },
        ],
    },
    { timestamps: true }
);

export const Board = models.Board || model<IBoard>("Board", boardSchema);
