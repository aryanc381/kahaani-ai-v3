import mongoose, { Schema } from 'mongoose';
import type { IUser } from '../types/userT.js';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(`${process.env.DB_URL}`, {dbName: 'kahaani-ai-v3'});

const userSchema = new Schema<IUser>({
    userDetails: {
        fullName: {
            type: String,
            default: null
        },
        email: {
            type: String,
            default: null
        },
        phone: {
            type: String,
            default: null
        },
        password: {
            type: String,
            default: null
        },
        token: {
            type: String,
            default: null
        },
        pendingUsers: {
            type: [String],
            default: []
        },
        acceptedUsers: {
            type: [String],
            default: []
        },
        tours: {
            city: {
                type: [Number],
                default: []
            },
            museums: {
                type: [Number],
                default: []
            },
            monuments: {
                type: [Number],
                default: []
            }
        },
        persona: {
            type: String,
            default: null
        }
    }
});

const users = mongoose.model('users', userSchema);

export default users;