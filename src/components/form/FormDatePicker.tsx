"use client";

import React, { useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { format, parseISO, isValid } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

type FormDatePickerProps = {
  name: string;
  label?: string;
  placeholder?: string;
};

export const FormDatePicker = ({ name, label, placeholder }: FormDatePickerProps) => {
  const { control, formState: { errors } } = useFormContext();
  const [open, setOpen] = useState(false);
  const error = errors[name];

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const parsed = field.value ? parseISO(field.value) : undefined;
        const selected = parsed && isValid(parsed) ? parsed : undefined;

        return (
          <div className="flex flex-col gap-2">
            {label && (
              <Label
                htmlFor={name}
                className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-1"
              >
                {label}
              </Label>
            )}
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger
                render={
                  <Button
                    id={name}
                    variant="outline"
                    className={cn(
                      'px-5 h-auto py-3.5 rounded-2xl bg-slate-50/50 border-2 justify-start text-left font-bold tracking-wide transition-all',
                      selected ? 'text-slate-900' : 'text-slate-400',
                      error
                        ? 'border-rose-500'
                        : 'border-slate-100 hover:border-primary/30'
                    )}
                  />
                }
              >
                <CalendarIcon className="w-4 h-4 text-slate-400 shrink-0" />
                {selected ? format(selected, 'dd MMM yyyy') : <span>{placeholder || 'Pick a date'}</span>}
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selected}
                  onSelect={(date) => {
                    field.onChange(date ? format(date, 'yyyy-MM-dd') : '');
                    setOpen(false);
                  }}
                  captionLayout="dropdown"
                  defaultMonth={selected}
                  startMonth={new Date(1940, 0)}
                  endMonth={new Date()}
                  disabled={(date) => date > new Date()}
                />
              </PopoverContent>
            </Popover>
            {error && (
              <span className="text-[10px] font-bold text-rose-500 pl-1">
                {error.message as string}
              </span>
            )}
          </div>
        );
      }}
    />
  );
};

export default FormDatePicker;
