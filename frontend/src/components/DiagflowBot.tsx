'use client';

import { useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';

const DialogflowBot = () => {
    const { locale } = useLanguage();
    const language = locale === 'es' ? 'es' : 'en';
    const scriptLoaded = useRef(false);

    useEffect(() => {
        if (scriptLoaded.current) return;

        const script = document.createElement('script');
        script.src = 'https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/df-messenger.js';
        script.async = true;
        document.body.appendChild(script);

        scriptLoaded.current = true;

        return () => {
            // Cleanup handled by React
        };
    }, []);

    return (
        <div id="df-messenger-container">
            <link
                rel="stylesheet"
                href="https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/themes/df-messenger-default.css"
            />

            <div dangerouslySetInnerHTML={{
                __html: `
                    <df-messenger
                        location="us"
                        project-id="la-colaborativa"
                        agent-id="058c3c3a-ba98-4fb5-a4f8-cac0a97dbcb8"
                        language-code="${language}"
                        max-query-length="-1"
                        chat-title="${locale === 'es' ? 'Asistente de Currículum' : 'Resume Assistant'}"
                        intent="WELCOME">
                    </df-messenger>
                `
            }} />

            <style jsx global>{`
                df-messenger {
                    z-index: 999;
                    position: fixed;
                    bottom: 0;
                    right: 0;
                    top: auto;
                    width: 350px;

                    --df-messenger-primary-color: #00464D;
                    --df-messenger-focus-color: #FF7001;
                    --df-messenger-button-color: #FF7001;

                    /* Text colors */
                    --df-messenger-font-color: #333333;
                    --df-messenger-font-family: system-ui, sans-serif;

                    /* Background colors */
                    --df-messenger-chat-background: #f3f6fc;
                    --df-messenger-message-user-background: #d3e3fd;
                    --df-messenger-message-bot-background: #fff;

                    /* Input field */
                    --df-messenger-input-box-color: #00464D;
                    --df-messenger-input-padding: 12px;
                    --df-messenger-input-height: 50px;
                    --df-messenger-input-border-radius: 8px;

                    /* Chat button */
                    --df-messenger-chat-bubble-background: #FF7001;
                    --df-messenger-chat-bubble-active-background: #FF7001;
                }
            `}</style>
        </div>
    );
};

export default DialogflowBot;