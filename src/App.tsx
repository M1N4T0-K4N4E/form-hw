import { useState } from 'react';

import './App.css'
import { FormInput } from './components/form';
import { FormResults } from './components/form-result';
import type { Form } from './types/form';

function App() {
  const [formResultList, setFormResultList] =  useState<Form[]>([]);

  return (
    <>

      <FormInput 
        onFormSubmit={ (form) => {
          setFormResultList([...formResultList, form]);
        }}
      />

      <FormResults results={formResultList}/>

    </> 
  )
}

export default App
