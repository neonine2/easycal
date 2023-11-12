import { Link, routes } from '@redwoodjs/router'
import { Head } from '@redwoodjs/web'

export default () => (
  <div className="start-page">
    <Head>
      <title>Home</title>
    </Head>
    <div className="start-header">EasyCal.ai</div>
    <div className="feature-display-wrapper">
      <div className="feature-display">
        <div className="feature-display-header">Join for...</div>
        <ul>
          <li>Your day, week, month at a glance.</li>
          <li>Daily morning briefings over text.</li>
          <li>Your personal scheduling assistant.</li>
        </ul>
      </div>

      <div className="two-button-menu">
        <button>
          <Link to={routes.signup()}>Join</Link>
        </button>
        <button>
          <Link to={routes.login()}>Login</Link>
        </button>
      </div>
    </div>
  </div>
)
