import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4 py-12">
      <div className="w-full max-w-[480px] space-y-6">
        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Buat Akun Admin
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Daftar untuk mengakses sistem manajemen kelurahan
          </p>
        </div>

        {/* Clerk Sign Up Component */}
        <div className="flex justify-center">
          <SignUp 
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "shadow-xl border border-slate-200 rounded-2xl",
                formButtonPrimary: "bg-indigo-600 hover:bg-indigo-700 text-sm normal-case",
                footerActionLink: "text-indigo-600 hover:text-indigo-700",
                headerTitle: "hidden", // Sembunyikan title bawaan Clerk agar tidak double dengan title custom kita
                headerSubtitle: "hidden"
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}