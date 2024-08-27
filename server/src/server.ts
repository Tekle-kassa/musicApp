import app from "./app";
// import connectdb from "./config/db";
// connectdb();
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
