import React from 'react';
import {
  FormProvider,
  Resolver,
  useForm,
  type FieldValues,
  type SubmitHandler,
  type UseFormProps,
  type UseFormReturn,
} from 'react-hook-form';
import { z, ZodType } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

type FormProps<
  TFormValues extends FieldValues,
  TSchema extends ZodType<any, any, any>,
> = {
  onSubmit: SubmitHandler<TFormValues>;
  schema: TSchema;
  className?: string;
  children: (methods: UseFormReturn<TFormValues>) => React.ReactNode;
  options?: UseFormProps<TFormValues>;
  id?: string;
};

function Form<
  TSchema extends ZodType<any, any, any>,
  TFormValues extends FieldValues = z.infer<TSchema>,
>({
  onSubmit,
  schema,
  className,
  children,
  options,
  id,
}: FormProps<TFormValues, TSchema>) {
  const form = useForm<TFormValues>({
    ...options,
    resolver: zodResolver(schema) as unknown as Resolver<TFormValues>,
  });
  return (
    <FormProvider {...form}>
      <form
        id={id}
        className={className}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {children(form)}
      </form>
    </FormProvider>
  );
}

export default Form;
