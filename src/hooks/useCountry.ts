import { useState, useEffect } from "react";

async function detectCountry(): Promise<string | null> {
  // Try primary source
  try {
    const res = await fetch("https://api.country.is/");
    if (res.ok) {
      const data = await res.json();
      if (data.country) return data.country as string;
    }
  } catch { /* fall through */ }

  // Fallback source
  try {
    const res = await fetch("https://ipwho.is/");
    if (res.ok) {
      const data = await res.json();
      if (data.country_code) return data.country_code as string;
    }
  } catch { /* fall through */ }

  return null;
}

export function useCountry() {
  const [country, setCountry] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    detectCountry()
      .then((code) => setCountry(code))
      .finally(() => setLoading(false));
  }, []);

  return { country, loading };
}
