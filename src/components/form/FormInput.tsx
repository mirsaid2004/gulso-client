import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type FormInputProps = {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const FormInput = ({
  name,
  label,
  type = 'text',
  placeholder,
  className,
  disabled,
  ...registration
}: FormInputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <Label 
          htmlFor={name}
          className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-1"
        >
          {label}
        </Label>
      )}
      <Input
        id={name}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className={`px-5 py-3.5 h-auto rounded-2xl bg-slate-50/50 border-2 transition-all font-bold tracking-wide ${
          error 
            ? 'border-rose-500 focus-visible:ring-rose-500' 
            : 'border-slate-100 focus-visible:border-primary/30 focus-visible:ring-primary/20'
        }`}
        {...register(name)}
        {...registration}
      />
      {error && (
        <span className="text-[10px] font-bold text-rose-500 pl-1">
          {error.message as string}
        </span>
      )}
    </div>
  );
};

export default FormInput;
