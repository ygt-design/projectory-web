import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

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

const MOBILE_BREAKPOINT_PX = 767;
const EYECATCHER_SCROLL_THRESHOLD = 0.5; // show after 50% of page scrolled
const EYECATCHER_SESSION_KEY = 'livechat-eyecatcher-shown';

export default function LiveChat() {
  const { pathname } = useLocation();
  const [eyecatcherFaded, setEyecatcherFaded] = useState(false);
  const [showEyecatcherAfterScroll, setShowEyecatcherAfterScroll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const eyecatcherEnabled = true; // set to true to show eyecatcher again
  const showEyecatcher =
    eyecatcherEnabled && !isMobile && showEyecatcherAfterScroll;

  /** Hide eyecatcher on mobile (matches chat widget breakpoint) */
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT_PX}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  /** Reset eyecatcher visibility when changing pages so 50% is required per page. */
  useEffect(() => {
    setShowEyecatcherAfterScroll(false);
  }, [pathname]);

  /**
   * Show eyecatcher after user has scrolled 50% of the page (once per session).
   */
  useEffect(() => {
    const checkScroll = () => {
      if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem(EYECATCHER_SESSION_KEY)) {
        return; // already shown this session
      }
      const { scrollY } = window;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0 || scrollY / maxScroll >= EYECATCHER_SCROLL_THRESHOLD) {
        setShowEyecatcherAfterScroll(true);
      }
    };
    checkScroll();
    window.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      window.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [pathname]);

  /** Mark session so eyecatcher is only shown once per session */
  useEffect(() => {
    if (showEyecatcher && typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem(EYECATCHER_SESSION_KEY, '1');
    }
  }, [showEyecatcher]);

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

    /* Position chat icon 20px from right and bottom; hide on mobile */
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
      @media (max-width: 767px) {
        #chat-widget-container,
        #lc_v2_container,
        [id^="lc_script_container"] {
          display: none !important;
        }
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

  return (
    <>
      {showEyecatcher && (
        <>
          <div
            className="livechat-eyecatcher"
            onClick={handleOverlayClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleOverlayClick(); }}
            style={{
              position: 'fixed',
              right: 100,
              bottom: 70,
              zIndex: 999999,
              padding: '15px 20px',
              background: '#2FD4B2',
              border: '0.5px solid rgba(255, 255, 255, 0.2)',
              color: '#fff',
              borderRadius: 12,
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              maxWidth: 250,
              cursor: 'pointer',
              pointerEvents: eyecatcherFaded ? 'none' : 'auto',
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
            <div style={{ fontFamily: 'FounderGrotesk_Medium', fontSize: '20px', marginBottom: 4, color: 'black'}}>
              Need Help?
            </div>
            <div style={{ fontSize: '18px', opacity: 1, color: 'black'}}>
              Click here to start chatting
              <br />
               with us!
            </div>
          </div>
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
              zIndex: 999999999,
              pointerEvents: 'auto',
              cursor: 'pointer',
            }}
          />
        </>
      )}
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
