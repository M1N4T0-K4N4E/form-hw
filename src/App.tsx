import { useState } from 'react';

import './App.css'
import { FormInput } from './components/form';
import { FormResults } from './components/form-result';
import type { Form } from './types/form';

function App() {
  const [formResultList, setFormResultList] =  useState<Form[]>([]);
  const [deletedFormList, setDeletedFormList] = useState<Form[]>([]);

  return (
    <>

      <FormInput 
        onFormSubmit={ (form) => {
          setFormResultList([...formResultList, form]);
        }}
      />

      <FormResults 
        results={formResultList}
        onRemove={ (id) => {
          const removedForm = formResultList.find(form => form.id === id);
          setDeletedFormList([...deletedFormList, removedForm!]);
          setFormResultList(formResultList.filter(form => form.id !== id));
        }}
        buttonText="remove"
        result="Results"
      />

      <FormResults 
        results={deletedFormList}
        onRemove={ (id) => {
          const recoveredForm = deletedFormList.find(form => form.id === id);
          setFormResultList([...formResultList, recoveredForm!]);
          setDeletedFormList(deletedFormList.filter(form => form.id !== id));
        }}
        buttonText="recover"
        result="Deleted"
      />

    </> 
  )
}

export default App
