// import sdk from '@api/whapi';
const sdk=require('@api/whapi')

sdk.auth('c81K30O2f300usdOSeBSc1CavTXwPIUW');

const sendMessage=async(user,id)=>{
    
    
    await sdk.sendMessageText({typing_time: 0, to: user, body: `📢 Attention: An order has been placed under token ${id}. Please make sure to visit the designated location before the token expires. Thank you!`})
      .then(({ data }) => console.log(data))
      .catch(err => console.error(err));

}
module.exports={sendMessage}