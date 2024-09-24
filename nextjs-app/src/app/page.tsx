import { redirect, RedirectType } from "next/navigation";

// Redirect the user to the default locale when `/` is requested

export default function RootPage() {
  redirect("/en/login", RedirectType.replace);
}
