import Link from 'next/link';

export default function Home() {
  return (
    <div className="HomePage">
      <ul>
        <li><Link href={'/post?id=1'} as={'/post'}><a>post</a></Link></li>
      </ul>
      <h1>Welcome to restaurant app</h1>
    </div>
  )
}