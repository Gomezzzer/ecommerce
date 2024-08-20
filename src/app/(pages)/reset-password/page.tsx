import React from 'react';
import { Metadata } from 'next';
import { useRouter } from 'next/router';

import { Gutter } from '../../_components/Gutter';
import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph';
import { ResetPasswordForm } from './ResetPasswordForm';

import classes from './index.module.scss';

export default function ResetPassword() {
  const router = useRouter();

  if (router.isFallback) {
    return <h1>Loading...</h1>; // Display a loading state while the page is being generated
  }

  return (
    <Gutter className={classes.resetPassword}>
      <h1>Reset Password</h1>
      <p>Please enter a new password below.</p>
      <ResetPasswordForm />
    </Gutter>
  );
}

export const metadata: Metadata = {
  title: 'Reset Password',
  description: 'Enter a new password.',
  openGraph: mergeOpenGraph({
    title: 'Reset Password',
    url: '/reset-password',
  }),
};
