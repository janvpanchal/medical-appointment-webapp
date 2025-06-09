import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SignIn from './components/SignIn'
import OtpVerification from './components/OtpVerification'
import PatientDashboard from './components/PatientDashboard'
import DoctorDashboard from './components/DoctorDashboard'

export default function App() {
  const [step, setStep] = useState('signin')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [user, setUser ] = useState(null)
  const [doctors, setDoctors] = useState([])
  const [doctorId, setDoctorId] = useState('')
  const [date, setDate] = useState('')
  const [appointments, setAppointments] = useState([])

  const API_BASE = 'http://localhost:5000/api'

  async function sendOtp() {
    if (!/^\d{10,15}$/.test(phone)) return alert('Enter valid phone number')
    try {
      await axios.post(`${API_BASE}/auth/send-otp`, { phone })
      setStep('otp')
    } catch {
      alert('Error sending OTP')
    }
  }

  async function verifyOtp() {
    if (otp !== '123456') return alert('Enter correct OTP (123456)')
    try {
      const res = await axios.post(`${API_BASE}/auth/verify-otp`, { phone, otp })
      setUser (res.data)
      setStep(res.data.role === 'patient' ? 'patient' : 'doctor')
    } catch {
      alert('OTP verification failed')
    }
  }

  useEffect(() => {
    if (step === 'patient') {
      axios.get(`${API_BASE}/doctors`)
        .then(res => setDoctors(res.data))
        .catch(() => alert('Failed to load doctors'))
    }
  }, [step])

  useEffect(() => {
    if ((step === 'patient' || step === 'doctor') && user) {
      axios.get(`${API_BASE}/appointments/${user.userId}`)
        .then(res => setAppointments(res.data))
        .catch(() => alert('Failed to load appointments'))
    }
  }, [step, user])

  async function bookAppointment(e) {
    e.preventDefault()
    if (!doctorId || !date) return alert('Select doctor and date/time')
    try {
      await axios.post(`${API_BASE}/appointments`, {
        userId: user.userId,
        doctorId,
        date,
      })
      setDate('')
      setDoctorId('')
      const res = await axios.get(`${API_BASE}/appointments/${user.userId}`)
      setAppointments(res.data)
    } catch {
      alert('Failed to book appointment')
    }
  }

  function logout() {
    setUser (null)
    setPhone('')
    setOtp('')
    setAppointments([])
    setDoctors([])
    setStep('signin')
  }

  return (
    <div className="min-h-screen bg-white text-gray-700 font-sans max-w-4xl mx-auto p-6">
      <header className="sticky top-0 bg-white border-b border-gray-200 flex justify-between items-center py-4 px-6">
        <h1 className="font-semibold text-3xl">MedBook</h1>
        {user ? (
          <button
            onClick={logout}
            className="bg-black text-white px-4 py-2 rounded-md font-semibold hover:bg-gray-800 transition"
          >
            Sign Out
          </button>
        ) : null}
      </header>

      {step === 'signin' && <SignIn phone={phone} setPhone={setPhone} sendOtp={sendOtp} />}
      {step === 'otp' && <OtpVerification phone={phone} otp={otp} setOtp={setOtp} verifyOtp={verifyOtp} />}
      {step === 'patient' && <PatientDashboard doctors={doctors} doctorId={doctorId} setDoctorId={setDoctorId} date={date} setDate={setDate} bookAppointment={bookAppointment} appointments={appointments} />}
      {step === 'doctor' && <DoctorDashboard appointments={appointments} />}
    </div>
  )
}
