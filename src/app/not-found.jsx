import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link href="/" className="btn btn-primary">
        Go Home
      </Link>
    </div>
  );
}