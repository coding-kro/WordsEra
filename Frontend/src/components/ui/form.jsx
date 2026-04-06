'use client';

import * as React from 'react';
import { Controller, FormProvider, useFormContext } from 'react-hook-form';

const Form = FormProvider;

const FormFieldContext = React.createContext({});

const FormField = ({ ...props }) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  return {
    name: fieldContext.name,
    ...fieldState,
  };
};

const FormItem = ({ className, ...props }) => {
  return <div className={`space-y-2 ${className || ''}`} {...props} />;
};

const FormLabel = ({ className, ...props }) => {
  return (
    <label className={`text-sm font-medium ${className || ''}`} {...props} />
  );
};

const FormControl = ({ ...props }) => {
  return <div {...props} />;
};

const FormMessage = ({ className, ...props }) => {
  const { error } = useFormField();

  if (!error) return null;

  return (
    <p className={`text-sm text-red-500 ${className || ''}`} {...props}>
      {error.message}
    </p>
  );
};

export { Form, FormField, FormItem, FormLabel, FormControl, FormMessage };
