'use client';

import { useEffect } from 'react';

const DialogflowBot = () => {
    useEffect(() => {
        // Load Dialogflow Messenger script dynamically
        const script = document.createElement('script');
        script.src = 'https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/df-messenger.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <>
            <link
                rel="stylesheet"
                href="https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/themes/df-messenger-default.css"
            />

            {/*<df-messenger*/}
            {/*    location="us"*/}
            {/*    project-id="la-colaborativa"*/}
            {/*    agent-id="058c3c3a-ba98-4fb5-a4f8-cac0a97dbcb8"*/}
            {/*    language-code="en"*/}
            {/*    max-query-length="-1"*/}
            {/*>*/}
            {/*    <df-messenger-chat-bubble chat-title="Resume Planner Bot"></df-messenger-chat-bubble>*/}
            {/*</df-messenger>*/}

            <style jsx global>{`
        df-messenger {
          z-index: 999;
          position: fixed;
          bottom: 16px;
          right: 16px;
          --df-messenger-font-color: #000;
          --df-messenger-font-family: Google Sans;
          --df-messenger-chat-background: #f3f6fc;
          --df-messenger-message-user-background: #d3e3fd;
          --df-messenger-message-bot-background: #fff;
        }
      `}</style>
        </>
    );
};

export default DialogflowBot;
