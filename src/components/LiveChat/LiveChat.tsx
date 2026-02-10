import { useCallback, useEffect, useState } from 'react';

import abstractSymbol from '../../assets/images/shapes/abstract/Projectory_AbstractSymbol_10.png';
import gradientSymbol from '../../assets/images/shapes/pMonograms/Projectory_GradientSymbol_Apricot_15.svg';

declare global {
  interface Window {
    __lc?: {
      license: number;
      integration_name?: string;
      product_name?: string;
      asyncInit?: boolean;
    };
    LiveChatWidget?: {
      on: (...args: unknown[]) => void;
      once: (...args: unknown[]) => void;
      off: (...args: unknown[]) => void;
      get: (...args: unknown[]) => void;
      call: (...args: unknown[]) => void;
      init: () => void;
    };
  }
}

const LIVECHAT_LICENSE = 19472413;

const liveChatBootstrap = `
(function(n,t,c){function i(n){return e._h?e._h.apply(null,n):e._q.push(n)}var e={_q:[],_h:null,_v:"2.0",on:function(){i(["on",c.call(arguments)])},once:function(){i(["once",c.call(arguments)])},off:function(){i(["off",c.call(arguments)])},get:function(){if(!e._h)throw new Error("[LiveChatWidget] You can't use getters before load.");return i(["get",c.call(arguments)])},call:function(){i(["call",c.call(arguments)])},init:function(){var n=t.createElement("script");n.async=!0,n.type="text/javascript",n.src="https://cdn.livechatinc.com/tracking.js",t.head.appendChild(n)}};!n.__lc.asyncInit&&e.init(),n.LiveChatWidget=n.LiveChatWidget||e}(window,document,[].slice));
`;

export default function LiveChat() {
  const [eyecatcherFaded, setEyecatcherFaded] = useState(false);

  /**
   * When the overlay is clicked:
   * 1. Fade out the eyecatcher
   * 2. Open the LiveChat window via the SDK (bypasses the iframe click problem)
   */
  const handleOverlayClick = useCallback(() => {
    setEyecatcherFaded(true);
    // Use the LiveChat JS API to maximize (open) the chat window
    window.LiveChatWidget?.call('maximize');
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    window.__lc = {
      ...window.__lc,
      license: LIVECHAT_LICENSE,
      integration_name: 'manual_onboarding',
      product_name: 'livechat',
    };

    /* Position chat icon 20px from right and bottom */
    const style = document.createElement('style');
    style.id = 'livechat-widget-position';
    style.textContent = `
      #chat-widget-container,
      #lc_v2_container,
      [id^="lc_script_container"] {
        right: 20px !important;
        bottom: 20px !important;
        z-index: 2147483001 !important;
      }
    `;
    document.head.appendChild(style);

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.textContent = liveChatBootstrap;
    script.async = true;
    document.head.appendChild(script);

    return () => {
      style.remove();
      script.remove();
    };
  }, []);

  /* Auto-fade eyecatcher after 7.5s so it doesn't stay distracting */
  useEffect(() => {
    const timer = setTimeout(() => setEyecatcherFaded(true), 15000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style>{`
        @keyframes livechat-float-behind {
          0%, 100% { transform: rotate(-25deg) translateY(0); }
          50% { transform: rotate(-25deg) translateY(-6px); }
        }
        @keyframes livechat-float-front {
          0%, 100% { transform: rotate(-15deg) translateY(0); }
          50% { transform: rotate(-15deg) translateY(4px); }
        }
        .livechat-float-behind {
          animation: livechat-float-behind 4s ease-in-out infinite;
        }
        .livechat-float-front {
          animation: livechat-float-front 3.5s ease-in-out infinite;
        }
      `}</style>
      {/* Decorative shape behind the eyecatcher — fixed position, fades with eyecatcher */}
      <img
        src={abstractSymbol}
        alt=""
        aria-hidden
        className="livechat-float-behind"
        style={{
          position: 'fixed',
          right: 275,
          bottom: 45,
          width: 64,
          transform: 'rotate(-25deg)',
          height: 'auto',
          zIndex: 99999,
          pointerEvents: 'none',
          opacity: eyecatcherFaded ? 0 : 1,
          transition: 'opacity 0.4s ease-out',
        }}
      />
      <div
        aria-hidden
        className="livechat-eyecatcher"
        style={{
          position: 'fixed',
          right: 70,
          bottom: 70,
          zIndex: 999999,
          padding: '15px 20px',
          background: 'rgba(0, 0, 0, 0.55)',
          backdropFilter: 'blur(8px)',
          border: '0.5px solid rgba(255, 255, 255, 0.1)',
          color: '#fff',
          borderRadius: 12,
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          maxWidth: 250,
          pointerEvents: 'none',
          opacity: eyecatcherFaded ? 0 : 1,
          transition: 'opacity 0.4s ease-out',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 4,
        }}
      >
        <div style={{ fontFamily: 'FounderGrotesk_Medium', fontSize: '18px', marginBottom: 4, color: '#E26D4F'}}>
          Need Help!
        </div>
        <div style={{ fontSize: '18px', opacity: 1}}>
          Click here to start chatting
          <br />
           with us!
        </div>
      </div>
      {/* Decorative shape in front of the eyecatcher — fixed position, fades with eyecatcher */}
      <img
        src={gradientSymbol}
        alt=""
        aria-hidden
        className="livechat-float-front"
        style={{
          position: 'fixed',
          right: 40,
          bottom: 140,
          transform: 'rotate(-15deg)',
          width: 60,
          height: 'auto',
          zIndex: 999999,
          pointerEvents: 'none',
          opacity: eyecatcherFaded ? 0 : 1,
          transition: 'opacity 0.4s ease-out',
        }}
      />
      {/* Overlay captures click to fade eyecatcher and open chat via SDK */}
      <div
        role="presentation"
        aria-hidden
        onClick={handleOverlayClick}
        style={{
          position: 'fixed',
          right: 25,
          bottom: 32,
          width: 65,
          height: 65,
          zIndex: 2147483002,
          pointerEvents: 'auto',
          cursor: 'pointer',
        }}
      />
      <noscript>
        <a
          href={`https://www.livechat.com/chat-with/${LIVECHAT_LICENSE}/`}
          rel="nofollow"
        >
          Chat with us
        </a>
        , powered by{' '}
        <a
          href="https://www.livechat.com/?welcome"
          rel="noopener nofollow"
          target="_blank"
        >
          LiveChat
        </a>
      </noscript>
    </>
  );
}
