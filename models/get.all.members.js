const connection = require("../config/db");
module.exports = putCompany = async (req, res) => {
  console.log(req.body);
  try {
    connection.query("SELECT * FROM tbl_member", async (error, results) => {
      return res.status(200).send({
        data: results,
        status: true,
      });
    });
  } catch (error) {
    return res.status(200).send({
      data: "error",
      status: false,
    });
  }
};
