class CustomApiError extends Error{
    constructor(message,statuscode){
        super(message)
        this.statuscode=statuscode
    }
}

const createCustom