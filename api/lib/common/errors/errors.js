class Error {
    constructor(message) {
        this.message = message;
    };
};

class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.code = 404;
        this.type = 'NOT_FOUND_ERROR';
    };
};

class InvalidRequestError extends Error {
    constructor(message) {
        super(message);
        this.code = 400;
        this.type = 'INVALID_REQUEST_ERROR';
    };
};

class UnauthorisedError extends Error {
    constructor(message) {
        super(message);
        this.code = 403;
        this.type = 'UNAUTHORISED_ERROR';
    };
};

class ServerError extends Error {
    constructor(message) {
        super(message);
        this.code = 500;
        this.type = 'SERVER_ERROR';
    };
};

module.exports = {
    NotFoundError,
    InvalidRequestError,
    UnauthorisedError,
    ServerError
};