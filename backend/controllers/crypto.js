const crypto=require('crypto')
createResetPasswordToken=()=>{
    const resetToken=crypto.randomBytes(32).toString('hex')
    const passwordResetToken=crypto.createHash('sha256').update(resetToken).digest('hex')
    const passwordResetTokenExpires=Date.now()+10*60*1000

    console.log(resetToken,passwordResetToken)
    const result={
        resetToken:resetToken,
        passwordResetToken:passwordResetToken,
        passwordResetTokenExpires:passwordResetTokenExpires
    }
    console.log(result)
    return result

}
// createResetPasswordToken();
module.exports={createResetPasswordToken}