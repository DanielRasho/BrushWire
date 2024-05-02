export default function Footer () {
  return (
    <footer>
      <div className="info">
        <div className="banner">
          <h2 className="font-display">
            Over 20,000 art stories and counting...
          </h2>
          <h3 className="font-subDisplay">begin yours today</h3>
        </div>
        <a
          href="https://github.com/DanielRasho/BrushWire"
          className="source-code"
        >
          <span>Read the source code</span>
          <i className="fa-brands fa-github"></i>
        </a>
      </div>
      <div className="gradient-container">
        <img src="./gradient-noise-purple.png" alt="" />
      </div>
    </footer>
  )
}
