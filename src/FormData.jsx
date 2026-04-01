import { createContext ,useReducer } from 'react'

  const StateContext = createContext()
  const DispatchContext = createContext()



export default function FormData({ children }) {
  const [state, dispatch] = useReducer(reducer, {})



  return (
      <StateContext.Provider value={state}>
        <DispatchContext.Provider value={dispatch}>
          {children}
        </DispatchContext.Provider>
      </StateContext.Provider>
  )
}
