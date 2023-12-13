export  const logDebug = ( ...args)=> {
  console.log("log debug nest js",process.env.LOG )
    if (process.env.LOG ) {
      console.log( ...args);
    }
  }