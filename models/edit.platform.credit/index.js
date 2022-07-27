const connection = require("../../config/db");
module.exports = putCompany = async (req, res) => {
  console.log(req.body);
  try {
    connection.query("SELECT * FROM tbl_member", async (error, results) => {
      let value_office = 0;
      const filterProvince = results.filter(
        // ต่าของจังหวัดนั้น ๆ ทั้งหมด
        (item) =>
          item.ngo_province === req.body.province && item.mem_status === 3
      );
      // หา ศูนย์จังหวัด คิดทำนวนและเพิ่ม
      const filterLevelProvince = filterProvince.filter(
        (item) =>
          item.sub_level === "ศูนย์จังหวัด" && item.level === "ตัวแทนศูนย์"
      );
      const difMemberProvice = filterLevelProvince.length;
      if (difMemberProvice > 0) {
        const value = (req.body.amount_province / difMemberProvice).toFixed(3);
        filterLevelProvince.forEach((element) => {
          const newValue =
            parseFloat(value) + parseFloat(element.platform_credit);
          connection.query(
            `UPDATE tbl_member SET platform_credit = ? WHERE mem_id = ?`,
            [newValue, element.mem_id]
          );
        });
      } else {
        value_office += req.body.amount_province;
      }
      // จบ ศูนย์จังหวัด
      // เริ่ม ศูนย์อำเภอ
      const filterDistrict = filterProvince.filter(
        (item) =>
          item.ngo_district === req.body.district && item.mem_status === 3
      );
      const filterLevelDistrict = filterDistrict.filter(
        (item) =>
          item.sub_level === "ศูนย์อำเภอ" && item.level === "ตัวแทนศูนย์"
      );
      const difMemberDistrict = filterLevelDistrict.length;

      if (difMemberDistrict > 0) {
        const value = (req.body.amount_district / difMemberDistrict).toFixed(3);
        filterLevelDistrict.forEach((element) => {
          const newValueDistrict =
            parseFloat(value) + parseFloat(element.platform_credit);
          connection.query(
            `UPDATE tbl_member SET platform_credit = ? WHERE mem_id = ?`,
            [newValueDistrict, element.mem_id]
          );
        });
      } else {
        value_office += req.body.amount_district;
      }
      // จบ ศูนย์อำเภอ

      // เริ่ม ศูนย์ตำบล
      const filterSubDistrict = filterProvince.filter(
        (item) =>
          item.ngo_subdistrict === req.body.subdistrict && item.mem_status === 3
      );
      const filterLevelSubDistrict = filterSubDistrict.filter(
        (item) => item.sub_level === "ศูนย์ตำบล" && item.level === "ตัวแทนศูนย์"
      );
      const difMemberSubDistrict = filterLevelSubDistrict.length;

      if (difMemberSubDistrict > 0) {
        const value = (
          req.body.amount_subdistrict / difMemberSubDistrict
        ).toFixed(3);
        filterLevelSubDistrict.forEach((element) => {
          const newValueSubDistrict =
            parseFloat(value) + parseFloat(element.platform_credit);
          connection.query(
            `UPDATE tbl_member SET platform_credit = ? WHERE mem_id = ?`,
            [newValueSubDistrict, element.mem_id]
          );
        });
      } else {
        value_office += req.body.amount_subdistrict;
      }

      return res.status(200).send({
        จำนวนคนที่อยู่ในระดับจังหวัด: difMemberProvice,
        จำนวนคนที่อยู่ในระดับอำเภอ: difMemberDistrict,
        จำนวนคนที่อยู่ในระดับตำบล: difMemberSubDistrict,
        กำไรบริษัท: value_office,
        // จังหวัด: filterProvince,
        // ตำบล: filterLevelSubDistrict,
        status: true,
      });
    });
  } catch (error) {
    return res.status(400).send({
      message: "มีบางอย่างผิดพลาด",
      status: false,
    });
  }
};
