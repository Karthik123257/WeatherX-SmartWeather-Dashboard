function Header() {
  return (
    <header className="header">
      <div className="brand">
        <div className="brand-mark" aria-hidden="true">
          <span />
          <span />
        </div>
        <div>
          <strong>WeatherX</strong>
          <small>Smart weather dashboard</small>
        </div>
      </div>

      <div className="header-meta">
        <span className="live-dot" />
        Live weather
      </div>
    </header>
  );
}

export default Header;
