const pool = require("../database/")



/* *****************************
* Get message amount from the database
* ***************************** */
async function getMessagesById (message_to) {
    try {
      const result = await pool.query(
        'SELECT COUNT(*) AS message_subject FROM message WHERE message_to = $1 AND message_read = false',
        [message_to])
      return result.rows[0]
    } catch (error) {
      return new Error("No messages were found")
    }
  }



/* *****************************
* Get message info from database
* ***************************** */
async function getMessages(){
  return await pool.query("SELECT * FROM public.message")
}




    // Exporting all functions together
module.exports = {getMessagesById,
    getMessages
  };
