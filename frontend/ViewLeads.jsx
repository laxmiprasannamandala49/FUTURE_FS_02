import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function ViewLeads() {

  const [leads, setLeads] = useState([])

  async function fetchLeads() {

    try {

      const res = await axios.get(
        'http://localhost:5000/api/leads'
      )

      setLeads(res.data)

    } catch (error) {

      console.log(error)

    }
  }

  async function updateStatus(id, status) {

    try {

      await axios.put(
        `http://localhost:5000/api/leads/${id}`,
        { status }
      )

      fetchLeads()

    } catch (error) {

      console.log(error)

    }
  }

  async function updateNotes(id, notes) {

    try {

      await axios.put(
        `http://localhost:5000/api/leads/notes/${id}`,
        { notes }
      )

      fetchLeads()

    } catch (error) {

      console.log(error)

    }
  }

  async function deleteLead(id) {

    const confirmDelete = window.confirm(
      'Delete this lead?'
    )

    if (!confirmDelete) return

    try {

      await axios.delete(
        `http://localhost:5000/api/leads/${id}`
      )

      fetchLeads()

    } catch (error) {

      console.log(error)

    }
  }

  useEffect(() => {

    fetchLeads()

  }, [])

  return (

    <div className="dashboard">

      <h1>Admin Dashboard</h1>

      <Link to="/">
        <button className="top-btn">
          Add New Lead
        </button>
      </Link>

      <br />
      <br />

      <h2>All Leads</h2>

      <table border="1">

        <thead>

          <tr>

            <th>Name</th>
            <th>Email</th>
            <th>Source</th>
            <th>Status</th>
            <th>Notes</th>
            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {leads.map((lead) => (

            <tr key={lead.id}>

              <td>{lead.name}</td>

              <td>{lead.email}</td>

              <td>{lead.source}</td>

              <td>

                <select
                  value={lead.status}
                  onChange={(e) =>
                    updateStatus(
                      lead.id,
                      e.target.value
                    )
                  }
                >

                  <option value="new">
                    New
                  </option>

                  <option value="contacted">
                    Contacted
                  </option>

                  <option value="converted">
                    Converted
                  </option>

                </select>

              </td>

              <td>

                <input
                  type="text"
                  placeholder="Add Notes"
                  defaultValue={lead.notes || ''}
                  onBlur={(e) =>
                    updateNotes(
                      lead.id,
                      e.target.value
                    )
                  }
                />

              </td>

              <td>

                <button
                  className="delete-btn"
                  onClick={() =>
                    deleteLead(lead.id)
                  }
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  )
}

export default ViewLeads