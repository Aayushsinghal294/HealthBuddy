import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { DoctorContext } from '../../context/DoctorContext'

const HospitalStatus = () => {
  const { backendUrl, hToken, hospitalData, fetchHospitalProfile, setHospitalData } = useContext(DoctorContext)
  const [bedsAvailable, setBedsAvailable] = useState('0')
  const [travel, setTravel] = useState('0')
  const [available, setAvailable] = useState(false)

  useEffect(() => {
    const loadProfile = async () => {
      const profile = await fetchHospitalProfile()
      if (profile) {
        setBedsAvailable(String(profile.bedsAvailable ?? profile.queue ?? 0))
        setTravel(String(profile.estimatedWaitMins ?? profile.travel ?? 0))
        setAvailable(Boolean(profile.available))
      }
    }

    loadProfile()
  }, [fetchHospitalProfile])

  const onSubmit = async (event) => {
    event.preventDefault()

    try {
      const { data } = await axios.patch(
        `${backendUrl}/api/hospitals/me/status`,
        {
          bedsAvailable: Number(bedsAvailable),
          travel: Number(travel),
          estimatedWaitMins: Number(travel),
          available,
        },
        {
          headers: { hToken },
        }
      )

      if (data.success) {
        toast.success('Hospital status updated')
        setHospitalData(data.hospital)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.error(error)
      toast.error('Could not update hospital status')
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white border rounded-2xl shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900">Hospital Status Panel</h1>
        <p className="text-sm text-gray-600 mt-1">
          Logged in as {hospitalData?.name || 'Hospital'}
        </p>

        <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <label className="flex flex-col gap-1 text-sm text-gray-700">
            Beds Available
            <input
              type="number"
              min="0"
              value={bedsAvailable}
              onChange={(event) => setBedsAvailable(event.target.value)}
              className="border rounded-lg px-3 py-2"
              required
            />
          </label>

          <label className="flex flex-col gap-1 text-sm text-gray-700">
            Estimated Wait Minutes
            <input
              type="number"
              min="0"
              value={travel}
              onChange={(event) => setTravel(event.target.value)}
              className="border rounded-lg px-3 py-2"
              required
            />
          </label>

          <label className="flex items-center gap-2 text-sm text-gray-700 md:col-span-2">
            <input
              type="checkbox"
              checked={available}
              onChange={(event) => setAvailable(event.target.checked)}
              className="h-4 w-4"
            />
            Hospital currently open for intake
          </label>

          <button
            type="submit"
            className="bg-indigo-600 text-white rounded-lg px-4 py-2 hover:bg-indigo-700 transition md:col-span-2"
          >
            Save Status
          </button>
        </form>
      </div>
    </div>
  )
}

export default HospitalStatus
