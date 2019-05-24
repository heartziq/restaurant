import Link from 'next/link';

export default function Home() {
  const title = 'HELLLoooo GOTHAM'
  return (
    <div className="HomePage">
      <ul>
        <li><Link href={`/post?id=1`} as={`/p/${title}`}><a>post</a></Link></li>
      </ul>
      <h1>Welcome to restaurant app</h1>
    </div>
  )
}