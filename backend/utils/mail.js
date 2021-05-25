const nodemailer = require("nodemailer");

async function sendMail(email, subject, data, templateName) {

  console.log("___1");

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASS
    },
  });
  console.log("___2");
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `"Toptancı Selo" <${process.env.SMTP_EMAIL}>`, // sender address
    to: email, // list of receivers
    subject, // Subject line
    html: generateMail(templateName,data,subject), // html body
  });
  console.log("___3");
  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

module.exports = { sendMail };

function generateMail(templateName,data,subject) {
  switch (templateName) {
    case "order":
      return `
      <center><h2> ${subject}. Şirket ${data.order.orderer.companyName}  </h2>
    
      <h3> Sipariş bilgileri </h3> </center>  <hr/>
      <table>
            <thead>
              <tr>
                <th> Id </th>
                <th> Product Name </th>
                <th> Amount </th>
                <th> Price(Net) </th>
                <th> Price(Gross) </th>
                <th> Tax </th>
              </tr>
            </thead>
            <tbody>
              
                ${
                  (()=>{
                    let sonuc = ""
                    data.order.orderDetails.forEach((detail)=>{
                      sonuc +=`<tr><td>${detail.productId} </td><td>${detail.product.name} </td><td>${detail.amount} </td><td>${detail.priceNet} </td><td>${detail.priceGross} </td><td>${detail.tax} </td> </tr>`
                    })
                   return sonuc;
                  })()
              
              }
             
            </tbody>
        </table>
      <hr/>
        <table>
            <thead>
              <tr>
                <th> Total Price </th>
                <th> Total Price Gross </th>
              </tr>
            </thead>
            <tbody>
              <tr>
               <td> ${data.order.totalPriceNet} </td>
               <td> ${data.order.totalPriceGross} </td>
              </tr>
            </tbody>
        </table>
      `;
    case "new_user":
      return ``;
    case "forgot_password":
      return ``;


    default:
      break;
  }
}
