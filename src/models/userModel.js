const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'User must has a name'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'User must has an email'],
            unique: true,
            lowercase: true,
            validate: [validator.isEmail, 'Please enter a valid email'],
        },
        password: {
            type: String,
            required: [true, 'User must has a password'],
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
        },
        photo: {
            type: String,
            default: 'default.jpg',
        },
        phone: {
            type: String,
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },
        refreshToken: {
            type: String,
        },
        active: {
            type: Boolean,
            default: true,
            select: false,
        },
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
    this.password = await bcrypt.hashSync(this.password, 12);
    this.passwordConfirm = undefined;
    next();
});

// userSchema.pre(/^find/, function (next) {
//     this.find({ active: { $ne: false } });
//     next();
// });

userSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
