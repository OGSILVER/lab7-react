import './App.css'
import FormData from './FormData'
import Form from './Form'
import Banner from './Banner'
import ProgressBar from './ProgressBar'

function App() {

  return (
    <>
      <FormData>
        <ProgressBar />
        <Form />
        <Banner />
      </FormData>
    </>
  )
}

export default App