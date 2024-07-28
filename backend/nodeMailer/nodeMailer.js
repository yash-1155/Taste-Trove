const nodemailer = require('nodemailer');
const {google}=require('googleapis')
require('dotenv').config()
const CLIENT_ID=process.env.clientID
const CLIENT_SECRET=process.env.clientSecret
const REDIRECT_URI=process.env.redirect_URI
const REFRESH_TOKEN=process.env.refreshToken
// console.log(REFRESH_TOKEN)
const oAuth2Client=new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URI)
oAuth2Client.setCredentials({refresh_token:REFRESH_TOKEN})
async function sendMail(sendContent){
	try {
		
		const ACCESS_TOKEN=oAuth2Client.getAccessToken()
		let mailTransporter =
			nodemailer.createTransport(
				{
					service: 'gmail',
					auth: {
						type:'OAuth2',
						user: 'tastetrove97@gmail.com',
						pass: 'Taste@97trove',
						clientId: CLIENT_ID, 
						clientSecret: CLIENT_SECRET, 
						refreshToken: REFRESH_TOKEN, 
						accessToken:ACCESS_TOKEN
					}
				}
			);
		
		let mailDetails = {
			from: 'tastetrove97@gmail.com',
			to: sendContent.email,
			subject: sendContent.subject,
			text: sendContent.text
		};
		const result=await mailTransporter
			.sendMail(mailDetails);
		
			return result
	} catch (error) {
		return error
	}
}
// sendMail("rishikeshchaudhari24@gmail.com").then(result=>console.log('Email sent...',result)).catch(error=>console.log(error.message))
module.exports={sendMail}
