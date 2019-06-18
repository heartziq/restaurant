import Head from 'next/head';

// import 'bootstrap/dist/css/bootstrap.min.css';
if (typeof window !== 'undefined') { require('materialize-css'); }
import 'materialize-css/dist/css/materialize.min.css';

// load icons
// import 'material-design-icons/iconfont/material-icons.css';

// load custom style
import '../../styles/myStyle.css';

export default ({title}) => (
  <div>
    <Head>
      <title>Restaurant - {title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {/* support for IE-8 and 9 */}
      <meta httpEquiv ="X-UA-Compatible" content="IE=edge" />

      <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet" /> 
    </Head>
  </div>
)