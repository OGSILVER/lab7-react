import './style/App.css'
import Form from './Form'
import Banner from './Banner'
import ProgressBar from './ProgressBar'

import { FormProvider } from './context-reduce/FormProvider'



function App() {

  return (
    <FormProvider>
      <ProgressBar />
      <Form />
      <Banner />
    </FormProvider>
  )
}

export default App
