// src/store/middleware/errorMiddleware.js

const errorMiddleware = ({ dispatch }) => (next) => (action) => {
    if (action?.payload?.error) {
      // Here you can dispatch a global error action or log the error
      console.error('Global Error:', action.payload.error); // Log the error to the console
      dispatch({ type: 'globalError/setError', payload: action.payload.error });
    }
    return next(action);
  };
  
  export default errorMiddleware;
  