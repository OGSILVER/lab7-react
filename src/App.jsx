import './style/App.css'
import Form from './Form'
import Banner from './Banner'
import ProgressBar from './ProgressBar'

import { FormProvider } from './context-reduce/FormProvider'



function App() {

  return (
    <FormProvider>
      <ProgressBar />
      <main className="app-shell">
        <section className="form-panel">
          <Form />
        </section>
        <aside className="banner-panel">
          <Banner />
        </aside>
      </main>
    </FormProvider>
  )
}

export default App
