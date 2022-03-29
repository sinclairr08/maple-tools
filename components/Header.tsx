import Link from "next/link";
import { useRouter } from "next/router";
import { cls } from "../libs/utils";

export default function Header() {
  const router = useRouter();
  return (
    <div className="h-14 px-6 bg-gray-800 w-full grid fixed top-0 grid-cols-7">
      <Link href="/symbol">
        <a
          className={cls(
            "text-sm flex items-center justify-center",
            router.pathname === "/symbol" ? "text-orange-400" : "text-white"
          )}
        >
          Symbol
        </a>
      </Link>
      <Link href="/stat">
        <a
          className={cls(
            "text-sm flex items-center justify-center",
            router.pathname === "/stat" ? "text-orange-400" : "text-white"
          )}
        >
          Stat Transform
        </a>
      </Link>
      <Link href="/union">
        <a
          className={cls(
            "text-sm flex items-center justify-center",
            router.pathname === "/union" ? "text-orange-400" : "text-white"
          )}
        >
          Union
        </a>
      </Link>
      <Link href="/">
        <a className="text-white text-sm flex items-center justify-center">
          Home
        </a>
      </Link>
    </div>
  );
}
