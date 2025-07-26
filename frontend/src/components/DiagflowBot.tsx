'use client';

import { useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface DfMessengerElement extends HTMLElement {
  setQueryParameters?: (params: { parameters: Record<string, unknown> }) => void;
  sendQuery?: (query: string) => void;
}

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
    const scriptId = 'df-messenger-script';

    // Only inject the script if it hasn't been added
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/df-messenger.js';
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
        initMessenger();
      };
    } else {
    }

    function initMessenger() {
      if (!containerRef.current) return;

      // Clear previous bot instance
      containerRef.current.innerHTML = '';

      // Create the df-messenger element
      const dfMessenger = document.createElement('df-messenger');
      dfMessenger.setAttribute('location', 'us');
      dfMessenger.setAttribute('project-id', 'la-colaborativa');
      dfMessenger.setAttribute('agent-id', '058c3c3a-ba98-4fb5-a4f8-cac0a97dbcb8');
      dfMessenger.setAttribute('language-code', 'en');
      dfMessenger.setAttribute('storage-option', 'none');
      dfMessenger.setAttribute('chat-title', isSpanish ? 'Asistente de Currículum' : 'Resume Assistant');
      dfMessenger.setAttribute('auto-open', 'false');
      dfMessenger.setAttribute('trigger-event-on-init', 'false');

      // Custom styles
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

      // Inner chat panel
      const chat = document.createElement('df-messenger-chat');
      chat.setAttribute('chat-title', isSpanish ? 'Asistente de Currículum' : 'Resume Assistant');
      dfMessenger.appendChild(chat);

      containerRef.current.appendChild(dfMessenger);

      const maxAttempts = 20;
      let attempts = 0;
      const interval = setInterval(() => {
        const el = containerRef.current?.querySelector('df-messenger') as DfMessengerElement | null;
        if (!el) return;

        try {
          if (typeof el.setQueryParameters === 'function') {
            el.setQueryParameters({ parameters: { userID: userId } });
          }

          if (typeof el.sendQuery === 'function') {
            el.sendQuery('Hi');
          }

          el.addEventListener('df-session-ended', () => {
            onSessionEnd?.();
            // DO NOT remove panel — just optionally log or show something
          });

          clearInterval(interval);
        } catch {
          if (++attempts > maxAttempts) clearInterval(interval);
        }
      }, 300);
    }

    return () => {
      // Don't remove script tag anymore to avoid redefinition errors
    };
  }, [userId, onSessionEnd, isSpanish]);

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: '500px', margin: '0 auto' }}
    />
  );
}
