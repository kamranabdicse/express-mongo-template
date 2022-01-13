export const noField = {
    type: "object",
    properties: {
    },
};


export const register = {
    type: "object",
    properties: {
        name: {
            type: "string",
            minLength: 3,
        },
        phoneNumber: {
            type: "string",
            pattern: "^((\\+?98)|0)[0-9]{10}$"
        },
        password: {
            type: "string",
            minLength: 8,
            pattern: "^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-z])[a-zA-Z0-9!@#$%^&*]{8,}$"
        },
    },
    required: ["name", "phoneNumber", "password"],
};


export const login = {
    type:"object",
    properties : {
        phoneNumber: {
            type: "string",
            pattern: "^((\\+?98)|0)[0-9]{10}$"
        },
        password: {
            type: "string",
            minLength: 8,
            pattern: "^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-z])[a-zA-Z0-9!@#$%^&*]{8,}$"
        },
    }
}


export const createRestaurant = {
    type: "object",
    properties: {
        priority: {
            type: "integer",
            minimum: 1,
            maximum: 10
        },
        bookingLimit: {
            type: "integer",
            minimum: 30,
            maximum: 1440
        },
    }
};