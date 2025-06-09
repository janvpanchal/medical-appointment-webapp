import React from 'react'

const SignIn = ({ phone, setPhone, sendOtp }) => {
  return (
    <main className="pt-20 text-center">
      <h2 className="text-5xl font-extrabold mb-4">Book Medical Appointments Easily</h2>
      <p className="text-lg mb-12 max-w-xl mx-auto text-gray-500">
        Sign in with your phone to get started
      </p>
      <input
        type="tel"
        placeholder="Phone number"
        value={phone}
        onChange={e => setPhone(e.target.value)}
        className="border border-gray-300 rounded-md p-3 w-72 text-lg mb-6"
      />
      <br />
      <button
        onClick={sendOtp}
        className="bg-black text-white px-8 py-3 rounded-md font-semibold hover:bg-gray-800 transition"
      >
        Send OTP
      </button>
    </main>
  )
}

export default SignIn

