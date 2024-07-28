const errorHandler=(err,req,res,next)=>{
    if (err instanceof Error) {
        // Handle specific types of errors or log the error
        if(err.stack){
            console.error(err.stack);
            return res.status(500).send({ error: err.stack });    
        }
        return res.status(500).send({ error: 'Internal Server Error' });
    
        // Send a meaningful response to the client
      }
    
      // If it's not an instance of Error, assume it's a string or a non-error value
      return res.status(400).send({ error: err });
    // return (res.send(err))
}
module.exports=errorHandler