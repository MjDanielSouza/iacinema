import Link from "next/link";
import { SignOutButton } from "./sign-out-button";

export function AppHeader({
  backHref,
  backLabel,
  userName,
  avatarUrl,
  authed,
}: {
  backHref?: string;
  backLabel?: string;
  userName?: string | null;
  avatarUrl?: string | null;
  authed: boolean;
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-[#0a0a0c]/80 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <Link
            href={authed ? "/dashboard" : "/"}
            className="font-display font-semibold text-white text-base shrink-0"
          >
            Pipeline<span className="text-amber-400">.</span>
          </Link>
          {backHref && backLabel && (
            <>
              <span className="text-zinc-700 text-sm hidden sm:inline">/</span>
              <Link
                href={backHref}
                className="text-xs text-zinc-500 hover:text-zinc-300 truncate hidden sm:inline"
              >
                {backLabel}
              </Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {authed ? (
            <>
              {userName && (
                <span className="hidden sm:inline text-xs text-zinc-500 truncate max-w-[140px]">
                  {userName}
                </span>
              )}
              {avatarUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={avatarUrl}
                  alt=""
                  className="w-7 h-7 rounded-full border border-white/10"
                />
              )}
              <SignOutButton />
            </>
          ) : (
            <Link
              href="/login"
              className="text-xs font-semibold px-3 py-1.5 rounded-full bg-amber-500 text-[#0a0a0c] hover:bg-amber-400 transition-colors"
            >
              Entrar
            </Link>
          )}
        </div>
      </div>

      {backHref && backLabel && (
        <div className="sm:hidden max-w-5xl mx-auto px-4 pb-2 -mt-1">
          <Link href={backHref} className="text-xs text-zinc-500 hover:text-zinc-300">
            ← {backLabel}
          </Link>
        </div>
      )}
    </header>
  );
}
