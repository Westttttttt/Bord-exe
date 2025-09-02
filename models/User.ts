import { Schema, model, models, Document, Types } from "mongoose";

export interface IUser extends Document {
    username: string;
    email?: string;
    profileImage?: string;
    provider: "google" | "guest";
    isGuest: boolean;
    createdBoards: Types.ObjectId[];
    joinedBoards: Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<IUser>(
    {
        username: {
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
        profileImage: {
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

userSchema.pre("save", function (next) {
    if (this.isGuest && !this.profileImage) {
        // Use random string to make unique avatar
        const randomSeed = Math.random().toString(36).substring(7);
        this.profileImage = `https://robohash.org/${randomSeed}`;
    }
    next();
});

export const User = models.User<IUser> || model<IUser>("User", userSchema);
