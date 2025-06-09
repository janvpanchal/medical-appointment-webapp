import React from 'react'

const DoctorDashboard = ({ appointments }) => {
  return (
    <main className="pt-12 px-4">
      <h2 className="text-4xl font-bold mb-10">Doctor Dashboard</h2>
      <section className="max-w-md mx-auto rounded-lg shadow-md p-6 border border-gray-100">
        <h3 className="text-xl font-semibold mb-4">Appointments with Patients</h3>
        {appointments.length === 0 ? (
          <p className="text-gray-500">No appointments scheduled.</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {appointments.map(app => (
              <li
                key={app._id}
                className="bg-gray-50 p-4 rounded shadow-sm flex justify-between text-gray-900 font-medium"
              >
                <span>Patient ID: {app.userId}</span>
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

export default DoctorDashboard
