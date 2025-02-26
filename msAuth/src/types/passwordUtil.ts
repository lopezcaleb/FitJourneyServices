const bcrypt = require('bcrypt');

// Encrypt password
export const encryptPassword = async (password: string) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    } catch (error) {
        if (error instanceof Error) {
            throw { message: error.message, code: 500 };
        } else {
            throw { message: `Error to compare password`, code: 500 };
        }
    }
}

// Compare password with hash password
export const comparePassword = async (password: string, hashPassword: string) => {
    try {
        const passwordMatch = await bcrypt.compare(password, hashPassword);
        return passwordMatch;
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            throw { message: error.message, code: 500 };
        } else {
            console.error('Unknown error');
            throw { message: `Error to compare password`, code: 500 };
        }
    }
}