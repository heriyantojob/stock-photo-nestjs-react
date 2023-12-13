
export const logDebug = (...args) => {
    
    if (import.meta.env.VITE_ENV_LOG) {
      console.log(...args);
    }
  };