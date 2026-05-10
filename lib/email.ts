// Gmail's web-compose URL works in every browser regardless of whether the
// user has a system `mailto:` handler configured (Windows without Mail set
// up, fresh macOS profiles, Linux without xdg-email, etc. all silently no-op
// on `mailto:`). Since the destination is a Gmail inbox anyway, we route all
// outbound CTAs through this URL.
//
// Format reference: https://developers.google.com/gmail/api (the unauthed web
// compose endpoint accepts `view=cm&fs=1&to=...&su=...&body=...`).

const SUPPORT_INBOX = "bioeng4youth@gmail.com";

export function composeEmail(subject: string, body?: string) {
  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    to: SUPPORT_INBOX,
    su: subject,
  });
  if (body) params.set("body", body);
  return `https://mail.google.com/mail/?${params.toString()}`;
}

export const SUPPORT_EMAIL = SUPPORT_INBOX;
