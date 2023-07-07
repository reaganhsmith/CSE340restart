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
    const sql = "SELECT COUNT(message_to) FROM public.message WHERE message_to = $1 AND message_archived = false AND message_read = false"
    const countMess = await pool.query(sql, [
      message_to
    ])
    return countMess.rows[0].count

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
      "SELECT * FROM public.message WHERE message_to = $1 AND message_archived = false ORDER BY message_created",
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




/* *****************************
*   Get account archived messages
* *************************** */
async function getMessageArchives(message_to) {
  try {
    const messageData = await pool.query(
      "SELECT * FROM public.message WHERE message_to = $1 AND message_archived = true",
      [message_to]
    )
    return messageData.rows
  } catch (error) {
    console.error("getMessageInfo error: " + error)
  }
}



/* *****************************
*   Count number of unread messages
* *************************** */
async function countArchives(message_to){
  try{
    const sql = "SELECT COUNT(message_to) FROM public.message WHERE message_to = $1 AND message_archived = true"
    const countArch = await pool.query(sql, [
      message_to
    ])
    return countArch.rows[0].count

  }
  catch(error){
    return error.message
  }
}

/* ***************************
 *  Delete Inventory Item
 * ************************** */
async function deleteMessage(message_id) {
  try {
    const sql = 'DELETE FROM public.message WHERE message_id = $1'
    const data = await pool.query(sql, [message_id])
  return data
  } catch (error) {
    new Error("Delete message Error")
  }
}



/* *****************************
*   Get who the message is from
* *************************** */
async function getFromFN(message_from) {
  try {
    const messageData = await pool.query(
      "SELECT account_firstname FROM account a JOIN linkinfo l ON l.account_id = a.account_id JOIN message m ON m.message_from = a.account_id WHERE m.message_from = $1",
      [message_from]
    )

    return messageData.rows[0]
  } catch (error) {
    console.error("getMessageInfo error: " + error)
  }
}



/* ***************************
 *  Delete Inventory Item
 * ************************** */
async function archiveMessage(message_id) {
  try {
    const sql = 'UPDATE public.message SET message_archived = true WHERE message_id = $1 RETURNING *'
    const data = await pool.query(sql, [message_id])
  return data
  } catch (error) {
    new Error("Delete message Error")
  }
}


/* ***************************
 *  Delete Inventory Item
 * ************************** */
async function readMessage(message_id) {
  try {
    const sql = 'UPDATE public.message SET message_read = true WHERE message_id = $1 RETURNING *'
    const data = await pool.query(sql, [message_id])
  return data
  } catch (error) {
    new Error("Delete message Error")
  }
}


/* ***************************
 *  Get all sender_from info
 * ************************** */
async function getSender(message_to) {
  try {
    const messageData = await pool.query(
      "SELECT m.message_subject, m.message_id, m.message_created, m.message_from, m.message_read, a.account_firstname FROM message m JOIN linkinfo l ON l.message_from = m.message_from JOIN account a ON a.account_id = l.account_id WHERE message_to = $1 AND message_archived = false;",
      [message_to]
    )
    return messageData.rows
    
  } catch (error) {
    console.error("getMessageById error: " + error)
  }
}




    // Exporting all functions together
module.exports = {
  sendMessage,
  countMessages,
  getMessageInfo,
  getMessageById,
  countArchives,
  getMessageArchives,
  deleteMessage,
  getFromFN,
  archiveMessage,
  readMessage,
  getSender
  };
