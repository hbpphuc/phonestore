const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'User must have a name'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'User must have an email'],
            unique: true,
            lowercase: true,
            validate: [validator.isEmail, 'Please enter a valid email'],
        },
        role: {
            type: String,
            default: 'user',
            enum: ['user', 'manager', 'admin'],
        },
        password: {
            type: String,
            required: [true, 'User must have a password'],
            minlength: [
                8,
                'User password must be more than or equal 8 characters',
            ],
            select: false,
        },
        passwordConfirm: {
            type: String,
            required: [true, 'A user must confirm password'],
            validate: {
                validator: function (val) {
                    return val === this.password;
                },
                message: 'Passwords do not match',
            },
            select: false,
        },
        photo: {
            type: String,
            default:
                'https://res.cloudinary.com/dqsmvz7lv/image/upload/v1687345761/Phonestore/qviw1rylnqoqjmeyrucb.jpg',
        },
        phone: String,
        address: String,

        refreshToken: {
            type: String,
        },
        active: {
            type: Boolean,
            default: true,
            select: false,
        },
        cart: [
            {
                product: { type: mongoose.Types.ObjectId, ref: 'Product' },
                quantity: Number,
                color: String,
            },
        ],
        passwordChangeAt: Date,
        passwordResetToken: String,
        passwordResetExpires: Date,
    },
    { timestamps: true }
);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
});

userSchema.pre('save', function (next) {
    if (!this.isModified('password') || this.isNew) return next();
    this.passwordChangeAt = Date.now() - 1000;
    next();
});

userSchema.pre(/^find/, function (next) {
    this.find({ active: { $ne: false } });
    next();
});

userSchema.methods = {
    async correctPassword(candidatePassword, userPassword) {
        return await bcrypt.compare(candidatePassword, userPassword);
    },

    changePasswordAfter(timestamp) {
        if (this.passwordChangeAt) {
            const changeTimestamp = parseInt(
                this.passwordChangeAt.getTime() / 1000,
                10
            );
            return timestamp < changeTimestamp;
        }
        return false;
    },

    createResetPasswordToken() {
        const resetToken = crypto.randomBytes(32).toString('hex');
        this.passwordResetToken = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');
        this.passwordResetExpires = Date.now() + 15 * 60 * 1000;
        return resetToken;
    },
};

const User = mongoose.model('User', userSchema);

module.exports = User;
