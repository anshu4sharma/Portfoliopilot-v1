import clsx from 'clsx';
import Link from 'next/link';
import { PoppinsFont } from './(home)/_components/home-page-navbar';

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center space-y-4">
        {/* Gradient Spinner */}
        <div className="w-16 h-16 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>

        {/* Gradient Text */}
        <Link
          href="/"
          className={clsx(
            'text-3xl font-semibold white',
            PoppinsFont.className
          )}
        >
          Portfolio
          <span className="bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">
            pilot
          </span>
        </Link>
      </div>
    </div>
  );
}
