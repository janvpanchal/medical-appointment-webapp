import React from 'react'

const OtpVerification = ({ phone, otp, setOtp, verifyOtp }) => {
  return (
    <main className="pt-20 text-center">
      <h2 className="text-3xl font-semibold mb-6">Enter the OTP sent to {phone}</h2>
      <input
        type="text"
        placeholder="OTP (123456)"
        value={otp}
        onChange={e => setOtp(e.target.value)}
        className="border border-gray-300 rounded-md p-3 w-52 text-lg mb-6 text-center"
        maxLength={6}
      />
      <br />
      <button
        onClick={verifyOtp}
        className="bg-black text-white px-8 py-3 rounded-md font-semibold hover:bg-gray-800 transition"
      >
        Verify OTP
      </button>
    </main>
  )
}

export default OtpVerification
