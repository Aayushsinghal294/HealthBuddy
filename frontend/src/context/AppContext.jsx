import { createContext } from 'react'   
import { hospitals } from '../assets/asset'
export const AppContext = createContext()

const AppContextProvider = (props) => {

   
    
    const value = {
        hospitals
    }

return(
<AppContext.Provider value={value}>
    {props.children}
</AppContext.Provider>
)

}

export default AppContextProvider