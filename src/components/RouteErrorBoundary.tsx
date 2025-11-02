import React from 'react';

type Props = { children: React.ReactNode };
type State = { error: unknown | null; nonce: number };

export class RouteErrorBoundary extends React.Component<Props, State> {
  state: State = { error: null, nonce: 0 };
  static getDerivedStateFromError(error: unknown) {
    return { error };
  }
  handleRetry = () =>
    this.setState((s) => ({ error: null, nonce: s.nonce + 1 }));
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 16 }}>
          <h2>Gagal memuat halaman</h2>
          <p style={{ opacity: 0.8, marginBottom: 12 }}>
            Terjadi kesalahan saat memuat komponen.
          </p>
          <button onClick={this.handleRetry}>Coba lagi</button>
        </div>
      );
    }
    return <div key={this.state.nonce}>{this.props.children}</div>;
  }
}
