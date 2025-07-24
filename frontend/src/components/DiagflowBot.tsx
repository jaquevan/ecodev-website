'use client';

import { useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function DialogflowBot({
  userId,
  onSessionEnd,
}: {
  userId: string;
  onSessionEnd: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { locale } = useLanguage();
  const isSpanish = locale === 'es';

  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/df-messenger.js';
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      if (!containerRef.current) return;

      // Clear existing content
      containerRef.current.innerHTML = '';

      // Create <df-messenger>
      const dfMessenger = document.createElement('df-messenger');
      dfMessenger.setAttribute('location', 'us');
      dfMessenger.setAttribute('project-id', 'la-colaborativa');
      dfMessenger.setAttribute('agent-id', '058c3c3a-ba98-4fb5-a4f8-cac0a97dbcb8');
      dfMessenger.setAttribute('language-code', isSpanish ? 'es' : 'en');
      dfMessenger.setAttribute('storage-option', 'none');
      dfMessenger.setAttribute('chat-title', isSpanish ? 'Asistente de Currículum' : 'Resume Assistant');

      // Style vars
      dfMessenger.style.setProperty('--df-messenger-primary-color', '#01666F');
      dfMessenger.style.setProperty('--df-messenger-focus-color', '#F37920');
      dfMessenger.style.setProperty('--df-messenger-font-color', '#333333');
      dfMessenger.style.setProperty('--df-messenger-font-family', 'system-ui, sans-serif');
      dfMessenger.style.setProperty('--df-messenger-chat-background', '#eff4f4ff');
      dfMessenger.style.setProperty('--df-messenger-chat-border-radius', '8px');
      dfMessenger.style.setProperty('--df-messenger-message-user-background', '#A3D3D4');
      dfMessenger.style.setProperty('--df-messenger-message-bot-background', '#fff');
      dfMessenger.style.setProperty('--df-messenger-input-box-border', '1px solid #E0E0E0');
      dfMessenger.style.setProperty('--df-messenger-input-box-border-radius', '16px');
      dfMessenger.style.setProperty('--df-messenger-input-box-padding', '14px 14px');
      dfMessenger.style.setProperty('--df-messenger-send-icon-offset-x', '15px');
      dfMessenger.style.setProperty('--df-messenger-message-stack-spacing', '20px');

      // Create <df-messenger-chat>
      const chat = document.createElement('df-messenger-chat');
      chat.setAttribute('chat-title', isSpanish ? 'Asistente de Currículum' : 'Resume Assistant');

      dfMessenger.appendChild(chat);
      containerRef.current.appendChild(dfMessenger);

      const interval = setInterval(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const dfMessengerEl = containerRef.current?.querySelector('df-messenger') as any;
        if (!dfMessengerEl) return;

        if (typeof dfMessengerEl.setQueryParameters === 'function') {
          dfMessengerEl.setQueryParameters({ parameters: { userID: userId } });
        }

        if (typeof dfMessengerEl.sendQuery === 'function') {
          dfMessengerEl.sendQuery('Hi');
        }

        dfMessengerEl.addEventListener('df-session-ended', () => {
          onSessionEnd?.();
        });

        clearInterval(interval);
      }, 200);
    };

    return () => {
      script.remove();
    };
  }, [userId, onSessionEnd, isSpanish]);

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: '500px', margin: '0 auto' }}
    />
  );
}
