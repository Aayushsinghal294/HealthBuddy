import React from 'react'
import { assets } from '../../assets/asset'

const AddDoctor = () => {
  return (
    <form>
        <p>Add Hospital</p>

        <div>
            <div>
                <label htmlFor="doc-img">
                <img src={assets.docicon} alt="" />
                </label>
                <input type="file" id='doc-img' hidden/>
                <p>Upload Hospital <br />Picture</p>
               
            </div>
            <div>
                <div>
                    <p>Your name</p>
                    <input type="text" placeholder='Enter your name' required />
                </div>
            </div>
        </div>
    </form>
  )
}

export default AddDoctor
