const connection = require("../../config/db");
const CheckHeader = require("../../check.header/nbadigitalservice");
module.exports = putCompany = async (req, res) => {
  console.log(req.body);
  try {
    await CheckHeader(req, res);
    connection.query(
      "SELECT * FROM `tbl_topup_order` WHERE `TU_Branch` = 'Platform'",
      async (error, results) => {
        console.log(results);
        return res.status(200).send({
          data: results,
          status: true,
        });
      }
    );
  } catch (error) {
    return res.status(200).send({
      data: "error",
      status: false,
    });
  }
};
