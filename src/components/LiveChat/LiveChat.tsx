import { useEffect } from 'react';

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

const LIVECHAT_LICENSE = 19472305;

/**
 * Inline bootstrap script from LiveChat (same logic as their snippet).
 * Loads tracking.js and sets up the widget API.
 */
const liveChatBootstrap = `
(function(n,t,c){function i(n){return e._h?e._h.apply(null,n):e._q.push(n)}var e={_q:[],_h:null,_v:"2.0",on:function(){i(["on",c.call(arguments)])},once:function(){i(["once",c.call(arguments)])},off:function(){i(["off",c.call(arguments)])},get:function(){if(!e._h)throw new Error("[LiveChatWidget] You can't use getters before load.");return i(["get",c.call(arguments)])},call:function(){i(["call",c.call(arguments)])},init:function(){var n=t.createElement("script");n.async=!0,n.type="text/javascript",n.src="https://cdn.livechatinc.com/tracking.js",t.head.appendChild(n)}};!n.__lc.asyncInit&&e.init(),n.LiveChatWidget=n.LiveChatWidget||e}(window,document,[].slice));
`;

export default function LiveChat() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    window.__lc = window.__lc || {};
    window.__lc.license = LIVECHAT_LICENSE;
    window.__lc.integration_name = 'manual_onboarding';
    window.__lc.product_name = 'livechat';

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.textContent = liveChatBootstrap;
    script.async = true;
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return (
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
  );
}
