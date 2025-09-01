import { Schema, model, models, Document, Types } from "mongoose";

export interface IUser extends Document {
    name: string;
    email?: string;
    image?: string;
    provider: "google" | "guest";
    isGuest: boolean;
    createdBoards: Types.ObjectId[];
    joinedBoards: Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            sparse: true, // guest users may not have an email
            lowercase: true,
            trim: true,
        },
        image: {
            type: String,
        },
        provider: {
            type: String,
            enum: ["google", "guest"],
            required: true,
        },
        isGuest: {
            type: Boolean,
            default: false,
        },
        createdBoards: [
            {
                type: Schema.Types.ObjectId,
                ref: "Board",
                default: [],
            },
        ],
        joinedBoards: [
            {
                type: Schema.Types.ObjectId,
                ref: "Board",
                default: [],
            },
        ],
    },
    { timestamps: true }
);

export const User = models.User<IUser> || model<IUser>("User", userSchema);
