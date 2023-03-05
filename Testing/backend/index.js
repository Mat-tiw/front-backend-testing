import Express from "express";
import mysql from "mysql";
import cors from "cors";

const app = Express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "testingdb",
})
app.use(Express.json());
app.use(cors())
app.get('/event', (req, res) => {
  db.query("SELECT * FROM testingdb.event", (err, result) => {
    if (err) { res.status(404).send('Error in backend') }
    else {
      res.json(result)
    }
  })
})
app.post("/events", (req, res) => {
  const sql = "INSERT INTO event(`title`, `date`) VALUES (?,?)";
  const values = [
    req.body.title,
    req.body.date,
  ];
  console.log(values)
  db.query(sql, values, (err, data) => {

    if (err) return res.send(err);
    return res.json("register  success");
  }
  )
})
app.post('/events/rev', (req, res) => {
  const values = [
    req.body.title
  ];
  const sql = "DELETE FROM event WHERE title = ?"
  db.query(sql, values, (err, result) => {
    if (err) return res.status(404).json(err);
    return res.json("event is deleted");
  })
})
app.post('/events/update', (req, res) => {
  const values = [
    req.body.title,
    req.body.date,
  ];
  const sql = "UPDATE event SET title = ? WHERE date = ?"
  db.query(sql, values, (err, result) => {
    if (err) return res.status(404).json(err);
    return res.json("event is deleted");
  })
})
app.listen(8800, () => {
  console.log('backend listening to port 8800')
})