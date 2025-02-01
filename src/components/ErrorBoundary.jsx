import { Link } from "@tanstack/react-router";
import { Component } from "react";

class ErrorBoundary extends Component {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // send to TrackJs / Sentry
    console.error("Error Boundary caught some error", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>There was an error with this listing.</h2> <br />
          <button onClick={() => this.setState({ hasError: false })}>
            Try again?
          </button>
          <p>
            Otherwise, <Link to="/">Click here</Link> to go back to the home
            page.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
