import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";
import mongoose from "mongoose";

export const GetUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json({
            success: true,
            data: users
        });
    } catch (error) {
        next(error);
    }
}

export const GetUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        next(error);
    }
}

export const CreateUser = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const message = "User already exists";
            const error = new Error(message);
            error.statusCode = 409;
            throw error;
        }

        const passwordSalt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, passwordSalt);

        const newUser = await User.create([{ name, email, password: hashedPassword }], { session });
        const token = jwt.sign({ userId: newUser[0]._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: {
                token,
                user: newUser[0]
            }
        })

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}

export const UpdateUser = async (req, res, next) => {
    try {
        if (!req.user) {
            const error = new Error("Authentication required");
            error.statusCode = 401;
            throw error;
        }

        if (req.params.id != req.user.id) {
            const error = new Error("Not authorized to update this account");
            error.statusCode = 403;
            throw error;
        }

        const user = await User.findById(req.params.id);
        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }

        const updateData = {};

        if (req.body.name) {
            updateData.name = req.body.name;
        }

        if (req.body.password) {
            const passwordSalt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(req.body.password, passwordSalt);
        }

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({
                success: false,
                message: "No valid update fields provided"
            });
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, updateData, { new: true }).select('-password');

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: updatedUser
        });
    }
    catch (error) {
        next(error);
    }
}

export const DeleteUser = async (req, res, next) => {
    try {
        if (!req.user) {
            const error = new Error("Authentication required");
            error.statusCode = 401;
            throw error;
        }

        if (req.params.id != req.user.id) {
            const error = new Error("Not authorized to delete this account");
            error.statusCode = 403;
            throw error;
        }

        const user = await User.findById(req.params.id);
        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }

        await User.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });
    }
    catch (error) {
        next(error);
    }
}