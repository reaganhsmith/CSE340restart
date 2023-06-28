const pool = require("../database/")

/* *****************************
*   Send new message
* *************************** */
async function sendMessage(message_to, message_subject, messsage_body,message_from){
  try{
    const sql = "INSERT INTO public.message (message_to, message_subject, message_body, message_from) VALUES ($1, $2, $3, $4) RETURNING *"
    return await pool.query(sql, [
      message_to, message_subject, messsage_body, message_from
    ])

  }
  catch(error){
    return error.message
  }
}




    // Exporting all functions together
module.exports = {
  sendMessage,

  };
