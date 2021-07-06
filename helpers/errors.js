class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.status = 400;
    }
}

class MissingFieldsError extends Error {
    constructor(message) {
        super(message)
        this.status = 400;
    }
}

class notFoundContact extends Error {
    constructor(message) {
        super(message)
        this.status = 400;
    }
}

class notCreatedContact extends Error {
    constructor(message) {
        super(message)
        this.status = 400;
    }
}

class notUpdatedContact extends Error {
    constructor(message) {
        super(message)
        this.status = 400;
    }
}

class noFavoriteField extends Error {
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
    noFavoriteField
}