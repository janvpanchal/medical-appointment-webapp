import React from 'react'

const PatientDashboard = ({ doctors, doctorId, setDoctorId, date, setDate, bookAppointment, appointments }) => {
  return (
    <main className="pt-12 px-4">
      <h2 className="text-4xl font-bold mb-10">Welcome to your Dashboard</h2>
      <section className="mb-12 max-w-md mx-auto rounded-lg shadow-md p-6 border border-gray-100">
        <h3 className="text-xl font-semibold mb-4">Book an Appointment</h3>
        <form onSubmit={bookAppointment} className="flex flex-col gap-4">
          <select
            value={doctorId}
            onChange={e => setDoctorId(e.target.value)}
            required
            className="border border-gray-300 rounded p-3"
          >
            <option value="" disabled>
              Select a doctor
            </option>
            {doctors.map(d => (
              <option key={d._id} value={d._id}>
                {d.phone || 'Doctor'}
              </option>
            ))}
          </select>
          <input
            type="datetime-local"
            value={date}
            onChange={e => setDate(e.target.value)}
            required
            className="border border-gray-300 rounded p-3"
          />
          <button
            type="submit"
            className="bg-black text-white rounded-md py-3 font-semibold hover:bg-gray-800 transition"
          >
            Book Appointment
          </button>
        </form>
      </section>
      <section className="max-w-md mx-auto rounded-lg shadow-md p-6 border border-gray-100">
        <h3 className="text-xl font-semibold mb-4">Your Appointments</h3>
        {appointments.length === 0 ? (
          <p className="text-gray-500">No appointments booked yet.</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {appointments.map(app => (
              <li
                key={app._id}
                className="bg-gray-50 p-4 rounded shadow-sm flex justify-between text-gray-900 font-medium"
              >
                <span>Doctor ID: {app.doctorId}</span>
                <span>{new Date(app.date).toLocaleString()}</span>
                <span className="italic text-xs text-gray-500">{app.status}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}

export default PatientDashboard
