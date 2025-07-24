'use client';

import React, { Suspense } from 'react';
import Inner from './inner';

export default function Outer() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Inner />
    </Suspense>
  );
}
