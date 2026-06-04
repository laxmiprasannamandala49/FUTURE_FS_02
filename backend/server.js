const express = require('express')
const cors = require('cors')
const db = require('./db')

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Mini CRM Backend Running')
})

// Add Lead
app.post('/api/leads', (req, res) => {

  const { name, email, source } = req.body

  const sql =
    'INSERT INTO leads (name, email, source) VALUES (?, ?, ?)'

  db.query(sql, [name, email, source], (err, result) => {

    if (err) {
      console.log(err)

      return res.status(500).json({
        success: false,
        error: err.message
      })
    }

    res.status(200).json({
      success: true,
      message: 'Lead Added Successfully'
    })
  })
})

// View All Leads
app.get('/api/leads', (req, res) => {

  const sql = 'SELECT * FROM leads'

  db.query(sql, (err, results) => {

    if (err) {
      console.log(err)

      return res.status(500).json({
        success: false,
        error: err.message
      })
    }

    res.status(200).json(results)
  })
})

// Update Lead Status
app.put('/api/leads/:id', (req, res) => {

  const { id } = req.params
  const { status } = req.body

  const sql =
    'UPDATE leads SET status = ? WHERE id = ?'

  db.query(sql, [status, id], (err, result) => {

    if (err) {
      console.log(err)

      return res.status(500).json({
        success: false,
        error: err.message
      })
    }

    res.status(200).json({
      success: true,
      message: 'Status Updated'
    })
  })
})

// Update Notes
app.put('/api/leads/notes/:id', (req, res) => {

  const { id } = req.params
  const { notes } = req.body

  const sql =
    'UPDATE leads SET notes = ? WHERE id = ?'

  db.query(sql, [notes, id], (err, result) => {

    if (err) {
      console.log(err)

      return res.status(500).json({
        success: false,
        error: err.message
      })
    }

    res.status(200).json({
      success: true,
      message: 'Notes Updated'
    })
  })
})

// Delete Lead
app.delete('/api/leads/:id', (req, res) => {

  const { id } = req.params

  const sql =
    'DELETE FROM leads WHERE id = ?'

  db.query(sql, [id], (err, result) => {

    if (err) {
      console.log(err)

      return res.status(500).json({
        success: false,
        error: err.message
      })
    }

    res.status(200).json({
      success: true,
      message: 'Lead Deleted Successfully'
    })
  })
})

app.listen(5000, () => {
  console.log('Server Running on Port 5000')
})