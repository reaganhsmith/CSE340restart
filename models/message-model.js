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


/* *****************************
*   Count number of unread messages
* *************************** */
async function countMessages(message_to){
  try{
    const sql = "SELECT COUNT(message_to) FROM public.message WHERE message_to = $1 AND message_archived = false"
    return await pool.query(sql, [
      message_to
    ])

  }
  catch(error){
    return error.message
  }
}


/* *****************************
*   Get account messages
* *************************** */
async function getMessageInfo(message_to) {
  try {
    const messageData = await pool.query(
      "SELECT * FROM public.message WHERE message_to = $1 AND message_archived = false",
      [message_to]
    )
    return messageData.rows
  } catch (error) {
    console.error("getMessageInfo error: " + error)
  }
}


/* ***************************
 *  Get all inventory items and inventory_id and name
 * ************************** */
async function getMessageById(message_id) {
  try {
    const messageData = await pool.query(
      "SELECT * FROM public.message WHERE message_id = $1",
      [message_id]
    )
    return messageData.rows[0]
  } catch (error) {
    console.error("getMessageById error: " + error)
  }
}



    // Exporting all functions together
module.exports = {
  sendMessage,
  countMessages,
  getMessageInfo,
  getMessageById

  };
