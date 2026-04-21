import FormAbout from "./Forms/FormAbout";
import Form2 from "./Forms/Form2";
import Form3 from "./Forms/Form3";
import Form4 from "./Forms/Form4";
import FormFinal from "./Forms/FormFinal";
import { useForm } from "./context-reduce/FormContext";


export default function Form(){
const { state } = useForm();  

    if (state.step == 1) return <FormAbout />
    if (state.step == 2) return <Form2 />
    if (state.step == 3) return <Form3 />
    if (state.step == 4) return <Form4 />
    if (state.step == 5) return <FormFinal />
    

}