import { ROUTES } from "@/constants";
import { cn } from "@/lib/classnames";
import { Link, useLocation } from "wouter";

const navItems = [
  { path: ROUTES.HOME, label: "记录" },
  { path: ROUTES.STATS, label: "统计" },
];

export function Navigation() {
  const [location] = useLocation();

  return (
    <nav>
      {navItems.map((item) => (
        <Link
          key={item.path}
          href={item.path}
          className={cn(
            "rounded-md px-3 py-2 text-sm font-medium transition-colors",
            location === item.path
              ? "bg-blue-100 text-blue-700"
              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
