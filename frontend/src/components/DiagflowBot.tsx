'use client';

import { useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function DialogflowBot({
  userId,
  onSessionEnd,
}: {
  userId: string;
  onSessionEnd: () => void;
}) {  
  const { locale } = useLanguage();
  const isSpanish = locale === 'es';

  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/df-messenger.js';
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      const interval = setInterval(() => {
        const dfMessenger = document.querySelector('df-messenger') as (HTMLElement & {
          setQueryParameters?: (params: Record<string, unknown>) => void;
          sendQuery?: (query: string) => void;
        }) | null;

        if (dfMessenger && typeof dfMessenger.sendQuery === 'function') {
          dfMessenger.sendQuery('Hi');
        }

        if (dfMessenger && typeof dfMessenger.setQueryParameters === 'function') {
          dfMessenger.setQueryParameters({
            parameters: {
              userID: userId,
            },
          });
        }

        if (dfMessenger && typeof dfMessenger.sendQuery === 'function') {
          dfMessenger.sendQuery('Hi');
        }

        if (dfMessenger) {
          clearInterval(interval);

          dfMessenger.addEventListener('df-session-ended', () => {
            if (onSessionEnd) {
              onSessionEnd();
            }
          });
        }
      }, 200);
    };

    return () => {
      script.remove();
    };
  }, [userId, onSessionEnd]);

  return (
    <div style={{ width: '100%', height: '500px', margin: '0 auto' }}>
      <div dangerouslySetInnerHTML={{ __html: `
        <df-messenger
              location="us"
              project-id="la-colaborativa"
              agent-id="058c3c3a-ba98-4fb5-a4f8-cac0a97dbcb8"
              language-code="en"
              max-query-length="-1"
              storage-option="none"
              chat-title="ResumeBot"
              style={{
                  '--df-messenger-primary-color': '#01666F',
                  '--df-messenger-focus-color': '#F37920',
                  '--df-messenger-font-color': '#333333',
                  '--df-messenger-font-family': 'system-ui, sans-serif',
                  '--df-messenger-chat-background': '#eff4f4ff',
                  '--df-messenger-chat-border-radius': '8px',
                  '--df-messenger-message-user-background': '#A3D3D4',
                  '--df-messenger-message-bot-background': '#fff',
                  '--df-messenger-input-box-border': '1px solid #E0E0E0',
                  '--df-messenger-input-box-border-radius': '16px',
                  '--df-messenger-input-box-padding': '14px 14px',
                  '--df-messenger-send-icon-offset-x': '15px',
                  '--df-messenger-message-stack-spacing': '20px'
                  } as React.CSSProperties}
          >
          <df-messenger-chat 
              chat-title="${isSpanish ? 'Asistente de Currículum' : 'Resume Assistant'}
              >
          </df-messenger-chat>
      </df-messenger>`
    }} />
    </div>
  );
}
