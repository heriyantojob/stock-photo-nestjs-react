export  const logDebug = ( ...args)=> {
 
    if (process.env.NEXT_PUBLIC_ENV_LOG) {
      console.log( ...args);
      // console.log( ...args);
    }
  }