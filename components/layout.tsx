import Link from "next/link"

import { PreviewAlert } from "components/preview-alert"
import LanguageSwitcher from "./LanguageSwitcher"
export function Layout({ children }) {
  return (
    <>
      <PreviewAlert />
      <div className="px-6 mx-auto">
        <header>
          <nav className="container flex items-center justify-between py-6 mx-auto bg-black py-2">
            <ul className="ml-2">
              <li className="px-2">
                <Link href="/" className="text-xl  no-underline text-white">
                  Contributions List
                </Link>
              </li>
              <li className="px-2">
                <Link href="/english-translate" className="text-xl  no-underline text-white">
                English Translate
                </Link>
              </li>
              <li className="px-2">
                <Link href="/french-translate" className="text-xl  no-underline text-white">
                French Translate
                </Link>
              </li>
              <li className="px-2">
                <Link href="/block-content" className="text-xl  no-underline text-white">
                Block Content
                </Link>
              </li>
              <li className="px-2">
                <Link href="/wishlist" className="text-xl  no-underline text-white">
                Wishlist
                </Link>
              </li>
            </ul>
         <LanguageSwitcher/>
          </nav>
              </header>
        <main className="container py-10 mx-auto">{children}</main>
      </div>
    </>
  )
}
