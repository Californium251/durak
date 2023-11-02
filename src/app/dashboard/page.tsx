import Link from "next/link";

export default function Index() {
  return (
    <div>
      <Link href='/create-game'>Создать игру</Link>
      <Link href='/join-game'>Присоединиться к игре</Link>
      <Link href='/profile'>Профиль</Link>
    </div>
  )
}
