"use client";

import React from 'react';
import { Icon } from "@iconify/react";
import { useTranslations } from "next-intl";
import { z } from 'zod';
import Form from '@/components/form/Form';
import FormInput from '@/components/form/FormInput';
import FormDatePicker from '@/components/form/FormDatePicker';
import { Button } from '@/components/ui/button';
import { UserResponse } from '@/types';
import { useUpdateUser } from '@/features/auth/api/update-user';
import { toast } from 'sonner';
import { ImageUpload } from './ImageUpload';

type ProfileFormValues = {
  name: string;
  email: string;
  phone: string;
  birthday?: string;
};

type PersonalInfoProps = {
  user: UserResponse;
};

export const PersonalInfo = ({ user }: PersonalInfoProps) => {
  const t = useTranslations("Profile");
  const updateUserMutation = useUpdateUser();

  const profileSchema = z.object({
    name: z.string().min(2, t("personalInfo.errors.nameTooShort")),
    email: z.string().email(t("personalInfo.errors.invalidEmail")),
    phone: z.string().min(9, t("personalInfo.errors.invalidPhone")),
    birthday: z.string().optional(),
  });

  const onSubmit = async (values: ProfileFormValues) => {
    try {
      await updateUserMutation.mutateAsync(values);
      toast.success(t('messages.updateSuccess') || 'Profile updated successfully');
    } catch {
      toast.error(t('messages.updateError') || 'Failed to update profile');
    }
  };

  return (
    <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
      <div className="flex items-center justify-between mb-8 border-b-2 border-slate-50 pb-4">
        <h2 className="text-slate-900 text-xl font-black flex items-center gap-3 tracking-tight">
          <div className="w-10 h-10 bg-blue-50 rounded-xl text-blue-500 flex items-center justify-center">
            <Icon icon="material-symbols:badge-outline-rounded" className="w-5 h-5" />
          </div>
          {t('personalInfo.title')}
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="flex justify-center lg:justify-start lg:pt-1">
          <ImageUpload
            currentImage={user.image}
            onImageSelect={async (dataUrl) => {
              try {
                await updateUserMutation.mutateAsync({ image: dataUrl });
                toast.success(t('messages.updateSuccess') || 'Avatar updated successfully');
              } catch {
                toast.error(t('messages.updateError') || 'Failed to update avatar');
              }
            }}
          />
        </div>
        <div className="lg:col-span-2">
          <Form
            schema={profileSchema}
            onSubmit={onSubmit}
            options={{
              defaultValues: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                birthday: user.birthday || '',
              },
            }}
          >
            {({ formState }) => (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-8">
                  <FormInput
                    name="name"
                    label={t('personalInfo.name')}
                    placeholder={t('personalInfo.demoName')}
                  />
                  <FormInput
                    name="phone"
                    label={t('personalInfo.phone')}
                    placeholder={t('personalInfo.demoPhone')}
                  />
                  <FormInput
                    name="email"
                    label={t('personalInfo.email')}
                    placeholder={t('personalInfo.demoEmail')}
                  />
                  <FormDatePicker
                    name="birthday"
                    label={t('personalInfo.birthday')}
                    placeholder={t('personalInfo.demoBirthday')}
                  />
                </div>

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={updateUserMutation.isPending}
                    className="h-12 px-10 rounded-2xl bg-primary text-white font-black shadow-lg shadow-primary/20 hover:bg-primary/95 transition-all active:scale-[0.98]"
                  >
                    {updateUserMutation.isPending ? t("personalInfo.saving") : t("personalInfo.save")}
                  </Button>
                </div>
              </>
            )}
          </Form>
        </div>

      </div>
    </section>
  );
};
