import {redirect} from "next/navigation";

/** Canonical locale URL for SEO */
export default function ResourcesRedirectPage() {
  redirect("/ko/resources");
}
