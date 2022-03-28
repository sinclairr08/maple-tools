import Link from "next/link";

export default function Header() {
  return (
    <div className="h-14 px-6 bg-gray-800 w-full grid fixed top-0 grid-cols-7">
      <Link href="/symbol">
        <a className="text-white text-sm flex items-center justify-center ">
          Symbol
        </a>
      </Link>
      <Link href="/stat">
        <a className="text-white text-sm flex items-center justify-center">
          Stat Transform
        </a>
      </Link>
      <Link href="/union">
        <a className="text-white text-sm flex items-center justify-center">
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
