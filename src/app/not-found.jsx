import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center mt-20">
      <h1 className="text-4xl font-bold mb-4">404 – Page Not Found</h1>
      <p className="mb-4">
        আপনি যে পেজটি খুঁজছেন তা পাওয়া যায়নি।
      </p>
      <Link href="/" className="btn btn-primary">
        Go to Home
      </Link>
    </div>
  );
}