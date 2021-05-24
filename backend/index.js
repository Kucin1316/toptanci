const express = require("express");
const app = express();
const { product: productRouter, user: userRouter, order:orderRouter} = require("./routes")

require("dotenv").config();

app.use(express.json());
app.use(require("cors")());


app.use("/product", productRouter );
app.use("/user", userRouter);
app.use("/order", orderRouter)
app.use("/",()=> {
    console.log("Mail Versand")
    require("./utils/mail")
})


app.listen(process.env.SERVER_PORT,()=> {
    console.log("Server is running " + `http://localhost:${process.env.SERVER_PORT}`);
})
