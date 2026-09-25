import Link from "next/link";
import { SignOutButton } from "./sign-out-button";

export function AppHeader({
  backHref,
  backLabel,
  currentLabel,
  userName,
  avatarUrl,
  authed,
}: {
  backHref?: string;
  backLabel?: string;
  /** Rótulo da página atual (último item, não-clicável) na breadcrumb — opcional. */
  currentLabel?: string;
  userName?: string | null;
  avatarUrl?: string | null;
  authed: boolean;
}) {
  return (
    <header className="chrome-edge sticky top-0 z-40 bg-[#050507]/80 backdrop-blur-xl backdrop-saturate-150">
      <div className="max-w-5xl mx-auto flex divide-x divide-line border-x border-line">
        <Link href="/" className="px-5 h-12 flex items-center gap-2 shrink-0">
          <span className="font-semibold text-sm">Pipeline.</span>
          <span className="font-tech text-[10px] text-muted hidden sm:inline">[SYS v1.0]</span>
        </Link>

        {backHref && backLabel && (
          <nav
            aria-label="breadcrumb"
            className="hidden sm:flex items-center gap-1.5 px-5 font-tech text-[10px] uppercase tracking-widest text-muted truncate"
          >
            <Link href="/" className="hover:text-[#FAFAFA] transition-colors duration-100 shrink-0">
              Início
            </Link>
            <span className="shrink-0">/</span>
            <Link
              href={backHref}
              className="hover:text-[#FAFAFA] transition-colors duration-100 truncate max-w-[10rem]"
            >
              {backLabel}
            </Link>
            {currentLabel && (
              <>
                <span className="shrink-0">/</span>
                <span className="text-[#FAFAFA]/80 truncate max-w-[10rem]">{currentLabel}</span>
              </>
            )}
          </nav>
        )}

        <div className="flex-1" />

        {authed ? (
          <>
            {userName && (
              <span className="hidden md:flex items-center px-5 font-tech text-[10px] uppercase tracking-widest text-muted truncate max-w-[160px]">
                {userName}
              </span>
            )}
            {avatarUrl && (
              <span className="hidden sm:flex items-center px-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={avatarUrl} alt="" className="w-6 h-6 rounded-full border border-line" />
              </span>
            )}
            <span className="flex items-center px-4 shrink-0">
              <SignOutButton />
            </span>
          </>
        ) : (
          <Link
            href="/login"
            className="press flex items-center px-6 font-tech text-xs uppercase tracking-wider bg-[#D4FF00] text-[#050507] hover:bg-[#e2ff4d] transition duration-150 ease-out shrink-0"
          >
            Entrar
          </Link>
        )}
      </div>

      {backHref && backLabel && (
        <div className="sm:hidden max-w-5xl mx-auto px-5 py-2 border-t border-line flex items-center gap-1.5 font-tech text-[10px] uppercase tracking-widest text-muted overflow-x-auto">
          <Link href="/" className="shrink-0">
            &larr; Início
          </Link>
          <span className="shrink-0">/</span>
          <Link href={backHref} className="shrink-0 text-[#FAFAFA]/80">
            {backLabel}
          </Link>
        </div>
      )}
    </header>
  );
}
