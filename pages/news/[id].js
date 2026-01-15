import { useEffect } from "react";
import { useRouter } from "next/router";

const ANDROID_STORE = "https://play.google.com/store/apps/details?id=com.swheeps.app";
const SCHEME = "swheeps";

export default function NewsOpen() {
  const { query, isReady } = useRouter();
  const id = String(query.id ?? "");

  useEffect(() => {
    if (!isReady || !id) return;

    // Try to open the app
    const deep = `${SCHEME}://news/${id}`;
    let hidden = false;
    const onHide = () => (hidden = true);
    document.addEventListener("visibilitychange", onHide, { once: true });

    const t0 = setTimeout(() => { window.location.href = deep; }, 0);
    const t1 = setTimeout(() => { if (!hidden) window.location.href = ANDROID_STORE; }, 1200);

    return () => {
      clearTimeout(t0); clearTimeout(t1);
      document.removeEventListener("visibilitychange", onHide);
    };
  }, [isReady, id]);

  return (
    <main style={{ fontFamily: "system-ui, sans-serif", padding: 24 }}>
      <h1>Opening in app…</h1>
      <p>If nothing happens, <a href={`${SCHEME}://news/${id}`}>tap here</a> or get the app:</p>
      <a href={ANDROID_STORE}>Get it on Google Play</a>
    </main>
  );
}
