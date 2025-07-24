class ApiError extends Error{
    constructor(
        statusCode,
        message="Something went wrong",
        // errors =[],
        stack = ""
    ){
        super(message)
        this.statusCode = statusCode
        // this.data = null
        this.messagetext = message
        this.success = false
        // this.errors = errors;

        if (stack) {
            this.stack = stack
        }else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

// export {ApiError}

// class ApiError extends Error {
//     constructor(
//       statusCode,
//       message = "Something went wrong",
//       errors = [],
//       stack = ""
//     ) {
//       super(message);

//       this.statusCode = statusCode;  // HTTP Status Code
//       this.message = message;  // HTTP Status Code
//       this.data = null;              // Placeholder for additional data (optional)
//       this.errors = errors;          // Detailed error messages (optional)
//       this.success = false;          // To denote request failure
//       this.name = this.constructor.name; // Set the error name as ApiError

//       if (stack) {
//         this.stack = stack;
//       } else {
//         Error.captureStackTrace(this, this.constructor);
//       }
//     }
//   }

//   export { ApiError };

// class ApiError extends Error {
//   constructor(
//     statusCode,
//     message = "Something went wrong",
//     errors = [],
//     stack = ""
//   ) {
//     super(message);
//     this.statusCode = statusCode;
//     this.errors = errors;

//     if (stack) {
//       this.stack = stack;
//     } else {
//       Error.captureStackTrace(this, this.constructor);
//     }
//   }
// }

export { ApiError };
