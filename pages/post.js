function Post(props) {

  return (
    <h2>my {props.id}</h2>
  )
}

Post.getInitialProps = (context) => {
  const { id } = context.query;

  return {
    id
  }
}

export default Post;