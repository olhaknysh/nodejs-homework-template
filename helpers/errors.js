class CustomError extends Error {
    constructor(message) {
        super(message);
        this.status = 400;
    }
}

class ValidationError extends CustomError {
    constructor(message) {
        super(message);
        this.status = 400;
    }
}

class MissingFieldsError extends CustomError {
    constructor(message) {
        super(message)
        this.status = 400;
    }
}

class notFoundContact extends CustomError {
    constructor(message) {
        super(message)
        this.status = 400;
    }
}

class notCreatedContact extends CustomError {
    constructor(message) {
        super(message)
        this.status = 400;
    }
}

class notUpdatedContact extends CustomError {
    constructor(message) {
        super(message)
        this.status = 400;
    }
}

class noFavoriteField extends CustomError {
    constructor(message) {
        super(message)
        this.status = 400;
    }
}

class notAuthorized extends CustomError {
    constructor(message) {
        super(message)
        this.status = 401;
    }
}

class UserWithPasswordAlreadyExists extends CustomError {
    constructor(message) {
        super(message)
        this.status = 409;
    }
}

class wrongAvatarExtension extends CustomError {
    constructor(message) {
        super(message)
        this.status = 400;
    }
}


module.exports = {
    ValidationError,
    MissingFieldsError,
    notFoundContact,
    notCreatedContact,
    notUpdatedContact,
    noFavoriteField,
    notAuthorized,
    UserWithPasswordAlreadyExists,
    wrongAvatarExtension,
    CustomError
}