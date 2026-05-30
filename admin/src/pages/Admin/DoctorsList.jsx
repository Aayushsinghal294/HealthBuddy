import React, { useContext, useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {
  const { backendUrl, aToken, joinHospitalRoom, socketOn, socketOff } = useContext(AdminContext)
  const [hospitals, setHospitals] = useState([])
  const [drafts, setDrafts] = useState({})
  const [lastUpdateAt, setLastUpdateAt] = useState(null)

  const loadHospitals = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/hospitals`)
      if (data.success && Array.isArray(data.hospitals)) {
        setHospitals(data.hospitals)
      }
    } catch (error) {
      console.error('Failed to load hospitals', error)
      toast.error('Could not load hospitals')
    }
  }

  useEffect(() => {
    loadHospitals()
  }, [backendUrl])

  // join hospital rooms and listen for updates
  useEffect(() => {
    if (!hospitals || hospitals.length === 0) return

    hospitals.forEach((h) => {
      try { joinHospitalRoom(h._id) } catch (e) {}
    })

    const handleUpdate = (updated) => {
      setHospitals((current) => current.map((h) => (h._id === updated._id ? updated : h)))
      setLastUpdateAt(Date.now())
      // clear banner after 5s
      setTimeout(() => setLastUpdateAt(null), 5000)
    }

    try { socketOn('hospital:updated', handleUpdate) } catch (e) {}

    return () => {
      try { socketOff('hospital:updated', handleUpdate) } catch (e) {}
    }
  }, [hospitals])

  useEffect(() => {
    setDrafts((currentDrafts) => {
      const nextDrafts = { ...currentDrafts }

      hospitals.forEach((hospital) => {
        if (!nextDrafts[hospital._id]) {
          nextDrafts[hospital._id] = {
            bedsAvailable: String(hospital.bedsAvailable ?? hospital.queue ?? 0),
            travel: String(hospital.estimatedWaitMins ?? hospital.travel ?? 0),
            available: Boolean(hospital.available),
          }
        }
      })

      return nextDrafts
    })
  }, [hospitals])

  const updateDraft = (id, field, value) => {
    setDrafts((currentDrafts) => ({
      ...currentDrafts,
      [id]: {
        ...(currentDrafts[id] || {}),
        [field]: value,
      },
    }))
  }

  const saveHospital = async (hospital) => {
    try {
      const draft = drafts[hospital._id]
      const { data } = await axios.patch(
        `${backendUrl}/api/hospitals/${hospital._id}/availability`,
        {
          bedsAvailable: Number(draft?.bedsAvailable ?? 0),
          travel: Number(draft?.travel ?? 0),
          available: Boolean(draft?.available),
        },
        {
          headers: { aToken },
        }
      )

      if (data.success) {
        toast.success(data.message)
        await loadHospitals()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.error('Failed to update hospital', error)
      toast.error('Could not update hospital status')
    }
  }

  const sortedHospitals = useMemo(
    () => [...hospitals].sort((a, b) => a.name.localeCompare(b.name)),
    [hospitals]
  )

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Hospital Status</h1>
        <p className="text-sm text-gray-500">Update bed availability and live operating status here.</p>
      </div>

      {lastUpdateAt && (
        <div className="mb-4 p-3 bg-green-50 border-l-4 border-green-400 text-green-800 rounded">
          Live update received — syncing data
        </div>
      )}

      <div className="space-y-4">
        {sortedHospitals.map((hospital) => {
          const draft = drafts[hospital._id] || {}

          return (
            <div key={hospital._id} className="bg-white border rounded-2xl shadow-sm p-5">
              <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
                <div className="flex items-start gap-4">
                  <img
                    src={hospital.image}
                    alt={hospital.name}
                    className="w-20 h-20 rounded-xl object-cover"
                  />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">{hospital.name}</h2>
                    <p className="text-sm text-gray-600">{hospital.disease}</p>
                    <p className="text-sm text-gray-500">{hospital.address?.line1 || hospital.address?.city || 'Address not set'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full lg:w-auto">
                  <label className="flex flex-col text-sm text-gray-600 gap-1">
                    Beds Available
                    <input
                      type="number"
                      min="0"
                      value={draft.bedsAvailable ?? ''}
                      onChange={(event) => updateDraft(hospital._id, 'bedsAvailable', event.target.value)}
                      className="border rounded-lg px-3 py-2"
                    />
                  </label>
                  <label className="flex flex-col text-sm text-gray-600 gap-1">
                    Wait Time
                    <input
                      type="number"
                      min="0"
                      value={draft.travel ?? ''}
                      onChange={(event) => updateDraft(hospital._id, 'travel', event.target.value)}
                      className="border rounded-lg px-3 py-2"
                    />
                  </label>
                  <label className="flex items-center gap-2 pt-6 text-sm text-gray-600">
                    <input
                      type="checkbox"
                      checked={Boolean(draft.available)}
                      onChange={(event) => updateDraft(hospital._id, 'available', event.target.checked)}
                      className="h-4 w-4"
                    />
                    Open
                  </label>
                </div>

                <div className="flex flex-col gap-2 min-w-40">
                  <p className="text-sm text-gray-600">Rating: {hospital.rating} ⭐</p>
                  <p className="text-sm text-gray-600">Updated: {hospital.lastUpdated ? new Date(hospital.lastUpdated).toLocaleString() : 'Never'}</p>
                  <button
                    onClick={() => saveHospital(hospital)}
                    className="bg-indigo-600 text-white rounded-lg px-4 py-2 hover:bg-indigo-700 transition"
                  >
                    Save Status
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default DoctorsList
