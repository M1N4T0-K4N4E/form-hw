import { useState } from 'react';

import './App.css'
import type { Calculation } from './types/calculator';
import { FormValidator } from './components/form-validated';
import { FormResults } from './components/form-result';
import type { Form } from './types/form';

function App() {
  const [formResultList, setFormResultList] =  useState<Form[]>([]);

  return (
    <>
      {/* <Form 
        onSumit={ (result) => {
          setResultList([...resultList, result]);
        }}
      /> */}

      <FormValidator 
        onFormSubmit={ (form) => {
          setFormResultList([...formResultList, form]);
        }}
      />

      <FormResults results={formResultList}/>

    </> 
  )
}

export default App
