import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const NAV = [
  { to: "/programma", label: "Курс" },
  { to: "/nulevoy-urok", label: "Нулевой урок" },
  { to: "/kak-eto-rabotaet", label: "Как это работает" },
  { to: "/ob-avtore", label: "Об авторе" },
  { to: "/nachat", label: "Начать" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  // Закрывать меню при смене страницы
  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 w-full max-w-3xl items-center justify-between px-5 md:h-[72px] md:max-w-5xl md:px-8">
          <Link
            to="/"
            className="font-serif text-xl font-bold tracking-tight text-ink md:text-[1.35rem]"
          >
            Тихий выход
          </Link>

          <nav className="hidden items-center gap-7 md:flex" aria-label="Основная навигация">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `text-[0.95rem] transition-colors duration-300 ${
                    isActive ? "text-brand" : "text-ink-muted hover:text-ink"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            {user && (
              <NavLink
                to="/kabinet"
                className={({ isActive }) =>
                  `rounded-lg border border-line px-4 py-2 text-[0.95rem] transition-colors duration-300 ${
                    isActive ? "border-brand text-brand" : "text-ink hover:border-ink-faint"
                  }`
                }
              >
                Кабинет
              </NavLink>
            )}
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={open}
            className="flex min-h-[44px] min-w-[44px] items-center justify-center text-ink md:hidden"
          >
            {open ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
          </button>
        </div>

        {open && (
          <nav
            className="border-t border-line bg-paper px-5 pb-6 pt-2 md:hidden"
            aria-label="Мобильная навигация"
          >
            {[...NAV, ...(user ? [{ to: "/kabinet", label: "Личный кабинет" }] : [])].map(
              (item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `block min-h-[48px] py-3 text-lg ${
                      isActive ? "text-brand" : "text-ink"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ),
            )}
          </nav>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-line">
        <div className="mx-auto w-full max-w-3xl px-5 py-10 md:max-w-5xl md:px-8 md:py-14">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-serif text-lg font-bold text-ink">Тихий выход</p>
              <p className="mt-2 max-w-sm text-[0.95rem] leading-relaxed text-ink-muted">
                Курс о выходе из петли. Без таймеров, без «успей», без давления.
              </p>
            </div>
            <Link
              to="/esli-sorvalsya"
              className="link-quiet min-h-[44px] text-[0.95rem] md:text-right"
            >
              Что делать, если сорвался →
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
